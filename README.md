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

## Architecture
The architecture of the client-side part is based on this model. It contains :
- a component folder who contains all of the differents components to display
- a lib folder who contais all of the fetch data to external API and server-side required by the components
- a main module App who display the components and manage routes

The main module use Lazy imports to fetch the data needed and then display the components. Most of them only returns a render but the Map and Graph component need some compute to do with the data before the render so they have their own behaviour. They are based on the same architecture : they both display a main component (for exemple the dropdowns for Graph), filter the data they need and finally display their childs components (Graph Column and Curve).

## Contributions

- Anthony Choquard:
  - Map visualisation in the front-end folder

- Théo Fafet:
  - Routes and filtering on back-end

- Barthélemy Passin-Cauneau:
  - Live-data table
  - Dark mode + Responsive App + Lazy imports + Detect user location
  - Initial setup on back-end
  - Setup MongoDB
  
- Florent Robert:
  - Graph and curves visualisation
