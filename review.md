uncesseary path joins, use relatvie requires

- config
    use || b/c an empty string may test paustive for undefined.

turn of jshint, don't commit thing about your editors

none of your passwords should be chceked in
  install dotevn
  look at node_modules/dotevn/README.md

  new file: .env
    NODE_ENV=development
    database_URL=
    SESSION_SECRET=dev_who_cares

  Then `require('dotevn').config()`

  Now your loading in your things from that .env file.
    process.env.NODE_EVN = process.env.NODE_ENV || 'development'

    if (process.env.NODE_ENV == 'development'){
      require('dotenv').config()
    }

    if(!process.env.DATABASE_URL){
      throw 'No Database URL provided'
    }

  You can put this in a file in env.js

  And now you can require('env.js') at the start of the app and get all your env variables that are required for different instiations.

  You can also set the port

packag.json
  You can have a scrtipt that reads from your evneiorment variables

relative urls!!!

chain the database quieres to make them more clear

learn the async await

use pg promise .tx for sql transations so you don't need to use the SQL DO END thing. Or maybe do the way you are doing.

dont event catch(e => e), rather catch(e => {throw e})

You cabn pass the db object to a function so ti calls the object, so it helps to compartmentalize.

Dependency Injection - read about it

Javascript Design Patterns

Get Webpack working





