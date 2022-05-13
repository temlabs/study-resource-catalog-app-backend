import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import filePath from "./src/filePath";


//trying to run the get endpoints with them being a separate file
import getResource from './requests/getResource';
import getStudyList from './requests/getStudyList';
import getComments from './requests/getComments';
import getContentType from './requests/getContentType';
import getReactions from './requests/getReactions';
import getUsers from './requests/getUsers'
import postComment from "./requests/postComment";
import postReactionsWritten from './requests/postReactionsWritten'
import postResource from './requests/postResource'
import postStudyList from './requests/postStudyList'




config(); //Read .env file lines as though they were env vars.

//Call this script with the environment variable LOCAL set if you want to connect to a local db (i.e. without SSL)
//Do not set the environment variable LOCAL if you want to connect to a heroku DB.

//For the ssl property of the DB connection config, use a value of...
// false - when connecting to a local DB
// { rejectUnauthorized: false } - when connecting to a heroku DB
const herokuSSLSetting = { rejectUnauthorized: false }
const sslSetting = process.env.LOCAL ? false : herokuSSLSetting
const dbConfig = {
  connectionString: process.env.DATABASE_URL,
  ssl: sslSetting,
};
const app = express();

export const client = new Client(dbConfig);
client.connect();

app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler


//trying to import endpoints 
app.use('/', getResource);
app.use('/', getStudyList);
app.use('/', getComments);
app.use('/', getContentType);
app.use('/', getReactions);
app.use('/', getUsers);
app.use('/', postComment);
app.use('/', postReactionsWritten);
app.use('/', postResource);
app.use('/', postStudyList);








//getResource(app,client);
app.get("/", async (req, res) => {
  const pathToFile = filePath("../public/index.html");
  res.sendFile(pathToFile);
});


//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
