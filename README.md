# weather-app

This is a weather app using openweathermap api to get the weather of any location using google places search

It can detect the location and automatically get the current weather and future data.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).







## Folder Structure 

/Components
----------------------------------------------------------------------------------
the main components used in the app 
----------------------------------------------------------------------------------

/Mixins 
----------------------------------------------------------------------------------
shared functions/classes/variables...etc across the vue application and its injected thorough the main.js file to access them everywhere whithout importing them.


----------------------------------------------------------------------------------
/Plugins
----------------------------------------------------------------------------------
Injected instants to be registered globally like the app axios instance with the api functions 

----------------------------------------------------------------------------------
/store 
----------------------------------------------------------------------------------
for storing data in Vuex  


----------------------------------------------------------------------------------
/api
----------------------------------------------------------------------------------
Api layer consists of modules for each type of requests to be in on file (made with factory design pattern)




