# Job Application Tracker API

A REST API to track job applications built with Node.js, Express and MongoDB.

## Features
- Add, update, delete job applications
- Track status — applied, interview, offer, reject
- Stats dashboard — count per status

## Tech Stack
- Node.js
- Express.js
- MongoDB + Mongoose

## API Routes
| Method | Route | Description |
|--------|-------|-------------|
| POST | /jobs | Add a new job |
| GET | /jobs | Get all jobs |
| GET | /jobs/:id | Get one job |
| PUT | /jobs/:id | Update a job |
| DELETE | /jobs/:id | Delete a job |
| GET | /jobs/stats/summary | Get stats |

## Setup
1. Clone the repo
2. Run `npm install`
3. Create `.env` file with `MONGO_URI` and `PORT`
4. Run `nodemon app.js`