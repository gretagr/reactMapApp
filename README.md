# React Map App

* [About](#about)
* [Instructions](#instructions)
* [Dependencies](#dependencies)
* [Atributions](#atributions)

## About

* This repository contains Neighborhood Map project app made for Udacity's Front-End Developer Scholarship by Google.

* Assignment: To develop a single page map application using React framework. Map should display any selected area of interest.

### App requirements:

* All application components render on-screen in a responsive manner.
* Filter: Includes a text input field or dropdown menu that filters the map markers and list items to locations matching the text input or selection. Filter function runs error-free.
* At least 5 locations is provided.
* A list-view of locations is provided which displays all locations by default, and displays the filtered subset of locations when a filter is applied.
* Clicking a location on the list displays unique information about the location, and animates its associated map marker (e.g. bouncing, color change.)
* Map displays all location markers by default, and displays the filtered subset of location markers when a filter is applied.
* Application utilizes the Google Maps API or another mapping system and at least one non-Google third-party API.
* Data requests that fail are handled gracefully using common fallback techniques (i.e. AJAX error or fail methods).
* Functionality providing additional data about a location is provided and sourced from a 3rd party API.
* When available in the browser, the site uses a service worker to cache responses to requests for site assets.
* Accessibility.


## Instructions

**IMPORTANT NOTE:** *Service worker in this app is caching only in build mode*

* The application uses [create-react-app](https://github.com/facebook/create-react-app).

### Steps to run the project in development mode

* Clone/Download repository to your computer.
* in project directory run `npm install` and `npm start` to install and launch the application.

### Steps to run the project in build mode

* Clone/Download repository to your computer.
* if needed install serve `npm install -g serve`
* Run `npm run build` `serve -s build` to build and serve production-ready code.
* Navigate to `http://localhost:5000`

### View project live:

[Vilnius Old Town Museums](https://gretagr.github.io/reactMapApp/)

## Dependencies

* [React.js](https://reactjs.org/)
* [create-react-app](https://github.com/facebook/create-react-app)
* [React-google-maps](https://tomchentw.github.io/react-google-maps/)
* [recompose](https://github.com/acdlite/recompose)
* [PropTypes](https://www.npmjs.com/package/prop-types)
* [escape-string-regexp](https://www.npmjs.com/package/escape-string-regexp)
* [Open Sans, Google fonts](https://fonts.google.com/specimen/Open+Sans)

## Atributions

* Locations Details: [Foursquare](https://foursquare.com/)
* Images used: [Image Sources attributions](https://github.com/gretagr/reactMapApp/blob/master/image-sources.md)
* How to deploy app to gh-pages tutorial: [react-gh-pages](https://github.com/gitname/react-gh-pages)
