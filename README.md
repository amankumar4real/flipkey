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
├──────├──────├──────action.js                  # action types, action creators
├──────├──────├──────reducers.hs                # reducers
├──────├──────├──────actionTypes.js             # store.js
├──────├──────/PropertyDetails                  # PropertyDetails 
├──────├──────├──────action.js                  # action types, action creators
├──────├──────├──────reducers.hs                # reducers
├──────├──────├──────actionTypes.js             # actionTypes.js 
├──────├──────/Common                           # Common  
├──────├──────├──────action.js                  # action types, action creators
├──────├──────├──────reducers.hs                # reducers
├──────├──────├──────actionTypes.js             # actionTypes.js 
├──────├──────/Search                           # Search
├──────├──────├──────action.js                  # action types, action creators
├──────├──────├──────reducers.hs                # reducers
├──────├──────├──────actionTypes.js             # actionTypes.js 
├──────├──────store.js                          # store.js
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
├── /app/        
├──────├─────/main/                              
├──────├──────├──────/models/               # All the tables(multiple files) 
├──────├──────├──────├────── __init.py__    # works like cors, blueprint creation inside
├──────├──────├──────/routes/               # All the Flask Routes(multiple files)
├──────├──────├──────├────── __init.py__
├──────├──────├──────/services/             # All the alchemy queries(multiple files)
├──────├──────├──────├────── __init.py__
├──────├──────├──────/util/                 # reoccuring services like token(multiple files)
├──────├──────├──────├────── __init.py__
├──────├─────/test/                         # all the tests for the the api(multiple files)
├──────├──────├────── __init.py__
├──────├───── __init.py__
├── /instance/
├──────├─────config.py                      # Details about the mysql DB.
├── /migrations/                            # multiple folders and file (Will generate automatically after git db migrate)
├── /vir/                                   # virtual environment details with all the dependencies installed
├── .gitignore                              # will ignore  /instance & /migrations
├── config.py                               # Create DevelopementConfig(Config)
├── requirements.txt                        # Info all the dependencies
├── run.py
├── test.py                                 # Import all the tests here and run individally

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




