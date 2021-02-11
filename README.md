# Indego-Backend-Assignment
Indego Backend Assignment

## Development Setup
### Prereqs

There are steps to run the API locally:

1. To install dependencies `npm install` .
2. To run node server `npm start` .

You can now run `npm test`, you should see a bunch of tests run (all of which will certainly pass).

A cron feature is also implemented to trigger this endpoint every hour to fetch the data and insert it in the mongo database
POST `https://indego-backend-project.herokuapp.com/v1/indego-data-fetch-and-store-it-db`.
Cron is implemented using AWS Cloudwatch scheduler and AWS lambda function.