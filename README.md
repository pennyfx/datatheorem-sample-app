## Front-end Coding Exercise

I settled on React-static starter kit after diving through
a bunch of articles about the latest and greatest React tooling.
This kit saved me some time by setting up the basic layout and component hierarchy.
I still had to revisit the Redux and React docs, since this kit was a few releases higher than
the one I used months ago, plus it's using all of the ES6+ tricks.

After the boiler-plate was setup, wiring everything up wasn't that difficult.  I created a few new components..
  - Everything in frontend/components/Customer
  - frontend/components/DepartmentFilter
  - Pager

If you're not familiar with React+Redux, all actions and data fetching occur in
core/actions.js.  All data manipulations then occur in core/reducers.js.
Each page is connected to the datastore, by assigning its `props` to update each
 time the reducers are ran on the datastore.  These pages then pass all data down
 to the components. Data and events could be more localized, but for this project
 having the pages be the conductor seemed ok.

core/history.js and core/router.js were left untouched.

### Stack
  - nodejs 6.2
  - react-static starter kit
  - python 2.7 for server

## Setup


```
git clone https://github.com/pennyfx/datatheorem-sample-app.git datatheorem
cd datatheorem

#open new terminal window to run the py server
python web_service/server.py

#back to main terminal
cd frontend
npm install
# get coffee

npm start

# webpack will takeover, build and launch the site on port 3000
# Once page loads, if no data is shown in the grid, but the loading
# indicator is still running in the bottom left corner of the footer,
# then give it a few seconds.   The first request is slow for some reason.
# I'm not sure if it's the dispatcher, or `fetch` polyfill.

```



## TODO
  - tests!
  - reduce bundle size

