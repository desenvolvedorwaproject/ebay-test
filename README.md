# Ebay Search Test

## Technologies

* Server
  * NestJs (Framework): 
      We decided to use this framework because of the support of typescript, a completed documentation, support to
      auto-generate swagger and support for depency injection.
  * Typescript
  * Mongo (mongoose)
  * Jest (Test)
  * Workers: 
      - Producer: A microservice to proccess the searchs and send to the queue according with the interval.
      - Consumer: A microservice to consume the queue and proccess the email. 
* Front
  * React
  * RxJs: 
        We decided to use RxJs instead of Redux because Redux can grow fast in complexity on the other hand
        RxJs provide a simple way to manage the data of the application, but if we need something like Redux 
        we can use the ContextAPI to provide this specific functionality.
  * Typescript
  * Material-UI (UI Framework)

## Run and Test

You can see all emails at the folder **output-emails**

```bash
yarn start 
# Don't worry about yarn install
# Wait until http://localhost:3000 (front) 
# and http://localhost:3001 (server) to be accessible

yarn test # Run all tests
yarn test:cov # show test coverage of server
```

## Dev 

We suggest VSCode as code editor, We also set up all extensions recommendations as well.

```bash
yarn dev
# During the development we only run the mongo inside docker 
# because of the performance of the hot-reload.
```
