## Overview

This is a project from the [Senior Web Developer Nanodegree](https://www.udacity.com/course/senior-web-developer-nanodegree-by-google--nd802) from [Udacity](https://www.udacity.com/). The application is a **Public Transportation App** that allows users to find a connection between two train stations. The user can specify a departure and arrival train stations and gets a list of available trains. The train connections are fetched from the [Navitia.io API](http://www.navitia.io/). 

The **Public Transportation App** uses Service Workers, LocalStorage and IndexedDB to enable **offline functionality**. Initially a list of stations is loaded. When a user finds a connection, the connections are saved in an IndexedDB. When the user is offline, she still is able to look up previous cached connections. 

## Project specifications

You must build an application that allows users to select a departure and arrival train station, and see a list of trains, times, and durations. Initially, the application should load a default train schedule - many public transportation agencies offer this information via an API or as a GTFS file (for example, CalTrain or the My511.org transit data feed). If the application is online, your schedule should reflect real-time transit data, informing the user of any delays they may encounter.

## Evaluation

Your project will be evaluated by a Udacity reviewer according to the rubric below. Be sure to review it thoroughly before you submit. All criteria must "meet specifications" in order to pass.

- Completion - App includes all requirements, including departure and arrival times of trains.

- Responsiveness - App is equally functional on mobile and desktop, using responsive design to ensure its displayed in a usable state.

- Offline Functionality - Application defaults to offline-first functionality, functioning if a network connection doesn't exist.

- App Delivery - App includes a build process. Assets are minimized and concatenated as appropriate.


## How to run locally

Install node.js, gulp and bower

```
$ npm install
$ bower install
$ npm install -g gulp
```

Serve the application with gulp:

```
$ gulp serve
```

A new tab in your browser should be opened with the following url:

```
http://localhost:3000
```

For production run:

```
$ gulp serve:dist
```

A new tab in your browser should be opened with the following url:

```
http://localhost:3002
```


## Photo rights

<div>Icons made by <a href="http://www.flaticon.com/authors/scott-de-jonge" title="Scott de Jonge">Scott de Jonge</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>