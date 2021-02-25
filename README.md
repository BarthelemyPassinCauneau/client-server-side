# client-server-side

This repo is an application to visualize data about COVID-19 in France.
It features a front-end written with ReactJS and a back-end server using ExpressJS and MongoDB.

## Server

### Setup

The server-side folder contains all the source code to run the back-end of the application.
To install the server all you need is to make sure you have npm installed, and run these commands.

```
cd /path/to/client-server-side/server-side
npm install
```

Then to run the server simply execute

```
cd /path/to/client-server-side/server-side
npm start
```

### Informations

The server connects to a remote mongodb server hosted on mongodb.net. As this is a private
database we did'nt put it on this repo. If you want to run it simply ask us and we will prodive you the URL.
Once you have the URL put in `/path/to/client-server-side/server-side/mongodb.config`


## Client

### Setup

The client-side folder contains all the source code to run the front-end of the application.

To install and start a developper version run :
```
cd /path/to/client-server-side/client-side
npm install
npm start
```

To build it for production run :
```
cd /path/to/client-server-side/client-side
npm run-script build
```

To run the production build :
```
cd /path/to/client-server-side/client-side
npm install -g serve
serve -s build
```

### Known issues

A common issue with ReactJS on linux might prevent you from running in developper mode.
React is watching on all the files in the project folder for changes, including node_modules.
As a consequence on a project with even small number of dependencies the number of files watched
can be much higher than the system's limit. To solve this issue you can try to increase the limit
with the following command, but it might not solve the issue... Though, this issue only affects the
developper mode, not the build version.

```
echo fs.inotify.max_user_watches=32768 | sudo tee -a /etc/sysctl.conf
```

## Contributions

- Anthony Choquard:
  - The map visualisation in the front-end folder

- Théo Fafet:
  - Routes and filtering on back-end

- Barthélemy Passin-Cauneau:
  - Live-data table
  - Dark mode + Lazy imports + Detect user location
  - Initial setup on back-end
  - Setup MongoDB
  
- Florent David:
  - Graph and curves visualisation
