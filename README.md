# NodeJS crawler
This project is a RESTful API made with NodeJS and Typescript, using express-js

1. Crawls the official website of the Central Bank of Venezuela (https://www.bcv.org.ve) daily to retrieve the current Bs./USD exchange rate.
2. Stores the exchange rate in a database.
3. Provides endpoints to retrieve the current exchange rate, as well as historical rates.


## Installation

Clone the repository

```bash
git clone https://github.com/madfp/node-crawler.git
```
Install the dependencies
```bash
npm i 
```

## Configuration
1. Set the environment variables following the .env.example file
2. Set up the database using docker
```bash
docker compose up -d
```
3. Seed the database
```bash
npm run seed
```

## Running the project
You can see all the available scripts on the package.json file
```bash
npm run start