
# NEMBAPI (Node + Express + Mongoose Boilerplate API)

I've made this boilerplate for easily creating APIs due lot of times you just need the minimal stuff
out of complex management systems or services to create your backend. This one will give you exactly what it promises, 
plus some tool to help you grow your project fast:

**Ready with:**

- Clear file structure
- Express service with cors and bodyParser
- User registration and management endpoints
- Bearer (jwt) user authentication middleware
- Database connection
- .env file configuration
- docker-compose for database and optional also for development environment
- All script commands you need, from development to build
- As less as possible dependencies required
- Typescript
- Eslint

## Environment setup and requirements

If you are not going to use docker as development environment you will need to install some packages globally in your system:

```
npm install -g concurrently nodemon typescript
```

### Initial setup

Once you have system requirements met, you can go to project folder and install all dependencies:

`yarn`
or
`npm install`

## Running the project

### Run database
This API rest boilerplate is working with mongodb throug mongoose. Because of this you will need to have running
a mongodb database in your local.

If you have docker and you want to use it, just go to the root path of the project and run:

```
yarn docker:start
```

This will run a docker instance with mongodb and another with mongo-express to be able to manage it.

Web interface of mongo-express will be in default port 8081, as mongo in 27017. In both cases are open
and you can access directly from localhost.

### Run development backend

With database running you can start the project as any other node project:

```
yarn start
```

As is typescript, yarn start will do several things in background. It will run typescript compiler with watcher for when
you will modify files, and in the another hand will run nodemon to serve the api and refresh after new compilations
of code, this way you have real time refresh.

## Creating new models

For the moment you should make a copy of this three files and give your own names:

```
controllers/exampleController.ts, 
models/exampleModel.ts
routers/exampleRouter.ts 
```

> TODO: is planned in future to make that base with crud from terminal with a simple command.

Once you have them copied, just add the import and usage into `/router.ts`, for example: `app.use('/product', productRouter)`

## License

Read license content in [LICENSE.md](https://github.com/vichaunter/nembapi/blob/main/LICENSE.md) file
