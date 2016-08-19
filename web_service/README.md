# Chicago Employees API Documentation

## Running the server

The server requires Python 2.7 and can be run using: 

    python server.py

It provides an API to access a local copy of the dataset of all current City of Chicago employees, as described at 
http://catalog.data.gov/dataset/current-employee-names-salaries-and-position-titles-840f7 .

## API Endpoints

All responses and inputs are JSON.

### List employees

#### Request

    GET /

##### Parameters

| Name     | Type    | Description        |
| -------- | ------- | ------------------ |
| page     | int     | Page number        |
| per_page | int     | Employees per page |

#### Response

    [
        {
            "department": "WATER MGMNT",
            "employee_annual_salary": "90744.00",
            "id": 1,
            "job_titles": "WATER RATE TAKER",
            "name": "AARON,  ELVIA J"
        },
        {
            "department": "POLICE",
            "employee_annual_salary": "84450.00",
            "id": 2,
            "job_titles": "POLICE OFFICER",
            "name": "AARON,  JEFFERY M"
        },
        {
            "department": "POLICE",
            "employee_annual_salary": "84450.00",
            "id": 3,
            "job_titles": "POLICE OFFICER",
            "name": "AARON,  KARINA"
        },
        {
            "department": "GENERAL SERVICES",
            "employee_annual_salary": "89880.00",
            "id": 4,
            "job_titles": "CHIEF CONTRACT EXPEDITER",
            "name": "AARON,  KIMBERLEI R"
        },
        {
            "department": "WATER MGMNT",
            "employee_annual_salary": "106836.00",
            "id": 5,
            "job_titles": "CIVIL ENGINEER IV",
            "name": "ABAD JR,  VICENTE M"
        }
    ]


### Get a single employee

#### Request

    GET /{id}

#### Response

    {
        "department": "WATER MGMNT",
        "employee_annual_salary": "90744.00",
        "id": 1,
        "job_titles": "WATER RATE TAKER",
        "name": "AARON,  ELVIA J"
    }

### Create a new employee

#### Request

    POST /

#### Response

    {
        "department": "COMPUTER",
        "employee_annual_salary": "10000000000.0",
        "id": 32064,
        "job_titles": "CODER",
        "name": "John Doe"
    }