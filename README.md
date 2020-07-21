# React Project Template

## Folder structure:

## FrontEnd:

```
├── /build/                                     # compiled output
├── /docs/                                      # Documentation files
├── /node_modules/                              # 3rd party lib
├── /public/                                    # Static files 
├── /src/                                       # The source code of the application
├───── /components/                             # React components
├──────├──────/admin                            # dashboard, admin
├──────├──────/common                           # shared components
├──────├──────├──────navbar.js                  # Navigation Bar
├──────├──────├──────footer                     # Footer
├──────├──────├──────vacationInspiration.js     # vacationInspiration
├──────├──────├──────Search.js                  # Searching for properties
├──────├──────├──────BreadCrumb.js              # Path to reach the property
├──────├──────├──────FAQ.js                     # Freq Asked question page
├──────├──────├──────resultCard.js              # Result Property to diplay
├──────├──────/Auth                             # Authentication part  
├──────├──────├──────Login.js                   # Login Page
├──────├──────├──────Register.js                # Register Page
├──────├──────/Home                             # Landing Page of the project
├──────├──────├──────Home.js                    # Home page
├──────├──────/Result                           # Results of the property
├──────├──────├──────resultPage.js              # Results of the property
├──────├──────/Property                         # Details about a particular property folder
├──────├──────├──────propertyDetails.js         # Details about a particular property
├──────├──────/shortList                        # Lists the properties which ever the user interested folder
├──────├──────├──────shortList.js               # Lists the properties which ever the user interested in.
├──────├──────/icons                            # icons
├──────├──────/news                             # news specific components
├──────├──────/static                           # static page
├────── redux/                                  # redux (Seperate into sub folders based on functions as well as complexity rises)
├──────├──────/Auth                             # Authentication part  
├──────├──────├──────actions.js                 # action types, action creators
├──────├──────├──────reducers.hs                # reducers
├──────├──────├──────store.js                   # store.js
├──────├──────/PropertyDetails                  # PropertyDetails 
├──────├──────├──────actions.js                 # action types, action creators
├──────├──────├──────reducers.hs                # reducers
├──────├──────├──────store.js                   # store.js
├──────├──────/Common                           # Common  
├──────├──────├──────actions.js                 # action types, action creators
├──────├──────├──────reducers.hs                # reducers
├──────├──────├──────store.js                   # store.js
├──────├──────/Search                           # Search
├──────├──────├──────actions.js                 # action types, action creators
├──────├──────├──────reducers.hs                # reducers
├──────├──────├──────store.js                   # store.js
├────── /utils/                                 # server schema and data models
├────── /routes/                                # Routes/Page files
├────── /clientScript.js                        # Client-side startup script
├────── /config.js                              # application settings
├──────  ...                                    
├── /test/                                      # Unit tests
├── package.json                
└── yarn.lock          
```


## Folder structure:

## Backend :

```

```

## Instructions

1. Install the necessary dependencies.

```
npm install
```

2. To start the development server, execute the following command.

```
npm start
```

3. To start the cypress test, execute the following command.

```
npm test
```

4. To start the production build, execute the following command.

```
npm run build
```

## Dependencies

- axios
- redux
- react
- react-router
- bootstrap
- redux-thunk     
- react-redux
- throttle     




