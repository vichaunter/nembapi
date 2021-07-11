
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

There is a terminal client that you can use to generate Model/Routes/Controllers base crud.

You only need to run `yarn generate`, and it will ask you for some details, ex:
```
Model name: car

Schema:
    Value name: width
    Value type: Number
    Value default: 0
    Is required: n
```

You can give to the generator as many schema values as you need, when you want to stop giving values and generate the
files, just leave the next value empty and hit `enter`.

After files are generated will be placed in:

```
src/controllers/exampleController.ts, 
src/models/exampleModel.ts
src/routers/exampleRouter.ts 
```

Have in mind that the generator will check if the files already exists, in such case it will skip it so will not be
overriden. That means that is secure to have for example the CarModel.ts already created, and generate controller and
routes if any of it are missing.

Once you have them generated, just add the import and usage into `src/router.ts`, for example: `app.use('/product', productRouter)`

## Roadmap

For next updates the plan is implement:

- Add docker development instance
- Add docker builder

## License

Read license content in [LICENSE.md](https://github.com/vichaunter/nembapi/blob/main/LICENSE.md) file
