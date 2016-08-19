# -*- coding: utf-8 -*-
"""Web server for the Chicago's "employee"s coding exercise."""

from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
import json
import urlparse

DATABASE = {}

EMPLOYEE_PER_PAGE = 100
REQUIRED_FIELDS = ['name', 'job_titles', 'department', 'employee_annual_salary']

# Fields name
# [u':sid',
#  u':id',
#  u':position',
#  u':created_at',
#  u':created_meta',
#  u':updated_at',
#  u':updated_meta',
#  u':meta',
#  u'name',
#  u'job_titles',
#  u'department',
#  u'employee_annual_salary']

# Sample row:
# [3712,
#  "5E5BC8D9-DFCB-4D1C-B02A-CCFC3B08D7C0",
#  3712,
#  1457916889,
#  "700397",
#  1457916889,
#  "700397",
#  null,
#  "CALLICO,  PAMELA F",
#  "CROSSING GUARD - PER CBA",
#  "OEMC",
#  "17586.40"]


class Server(BaseHTTPRequestHandler):

    def _set_headers(self, status_code=200, headers={}):
        """Set the common response headers."""
        # Set the status code
        self.send_response(status_code)

        # Output custom headers
        for key, value in headers.iteritems():
            self.send_header(key, value)

        # We always output JSON
        self.send_header('Content-type', 'application/json')

        # Add the CORS header
        self.send_header('Access-Control-Allow-Origin', '*')

        self.end_headers()

    def do_OPTIONS(self):
        self._set_headers(headers={
            'Access-Control-Request-Method': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, Accept, Content-Type',
        })

    def do_GET(self):
        # Manual URL parsing
        url = urlparse.urlparse(self.path)
        path = url.path
        query = dict(urlparse.parse_qsl(url.query))

        # Define the paging
        per_page = int(query.get('per_page', EMPLOYEE_PER_PAGE))
        page = int(query.get('page', 1))
        offset = (page-1)*per_page

        # Check for department filters
        filter = query.get('filter','')
        filter = filter.split(',') if len(filter)>0 else []

        if path == '/':
            self._set_headers()
            # filter if department is given
            if len(filter)>0:
                filtered = [cust for cust in DATABASE.items() if filter.count(cust[1]['department']) == 1]
            else:
                filtered = DATABASE.items()

            # `zip` the result and output the DB
            self.wfile.write(json.dumps([data for sid, data in filtered[offset:offset+per_page]]))
            return

        # Assume it's /<sid>
        if int(path[1:]) in DATABASE:
            self._set_headers()
            self.wfile.write(json.dumps(DATABASE[int(path[1:])]))
        else:
            self._set_headers(404)

    def do_POST(self):
        url = urlparse.urlparse(self.path)

        if url.path == '/':
            print self.headers.getheader('content-length')
            data = json.loads(self.rfile.read(int(self.headers.getheader('content-length'))))

            # Check the required fields
            missing_fields = []
            for field in REQUIRED_FIELDS:
                if field not in data:
                    missing_fields.append(field)

            # Returns a 422 on missing fields
            if missing_fields:
                self._set_headers(422)
                self.wfile.write(json.dumps(dict(error='missing fields: {}'.format(', '.join(missing_fields)))))
                return

            # Ensures the salary is in a correct format
            try:
                data['employee_annual_salary'] = str(float(data['employee_annual_salary']))
            except ValueError:
                # The salary is not a float, returns a 422 Unprocessable Entity
                self._set_headers(422)
                self.wfile.write(json.dumps(dict(error='"employee_annual_salary" must be a float')))
                return

            new_sid = max(DATABASE.keys()) + 1
            data['id'] = new_sid
            DATABASE[new_sid] = data
            self._set_headers()
            self.wfile.write(json.dumps(data))
            return

        # Unknown path, returns a 404 Not Found
        self._set_headers(404)


def run(server_class=HTTPServer, handler_class=Server, port=8080):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print 'Starting server on port {}'.format(port)
    httpd.serve_forever()


if __name__ == "__main__":
    from sys import argv

    # Load the database
    with open('employee.json', 'rb') as f:
        raw_data = json.load(f)

    fields_name = [c['fieldName'] for c in raw_data['meta']['view']['columns']]
    employees = {}
    for data in raw_data['data']:
        employee = {}
        for field_name, value in zip(fields_name, data):
            # Convert the field `:sid` to `id` (for simplicity)
            if field_name == ':sid':
                field_name = 'id'

            # Skip the special fields
            if not field_name.startswith(':'):
                employee[field_name] = value

        # Add the employee in the DB
        employees[employee['id']] = employee

    DATABASE = employees

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
