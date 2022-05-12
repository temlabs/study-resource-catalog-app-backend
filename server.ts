import { Client } from "pg";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import filePath from "./src/filePath";


//trying to run the get endpoints with them being a separate file
import getResource from './requests/getResource';
import getStudyList from './requests/getStudyList';
//import getComments from './requests/getComments';
 import getContentType from './requests/getContentType';
// import getReactions from './requests/getReactions';
// import getUsers from './requests/getUsers'
//import postComment from "./requests/postComment";
// import postReactionsWritten from './requests/postReactionsWritten'
// import postResource from './requests/postResource'
// import postStudyList from './requests/postStudyList'




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


//trying to import endpoints 
app.use('/', getResource);
app.use('/', getStudyList);
//app.use('/', getComments);
app.use('/', getContentType);
// app.use('/', getReactions);
// app.use('/', getUsers);
// //app.use('/', postComment);
// app.use('/', postReactionsWritten);
// app.use('/', postResource);
// app.use('/', postStudyList);




app.use(express.json()); //add body parser to each following route handler
app.use(cors()) //add CORS support to each following route handler

const client = new Client(dbConfig);
client.connect();

//getResource(app,client);
app.get("/", async (req, res) => {
  const pathToFile = filePath("../public/index.html");
  res.sendFile(pathToFile);
});


// app.get<{ resourceId: number }, {}, {}>("/comments/:resourceId", async (req, res) => {
//   const resourceId = req.params.resourceId;
//   if (!resourceId) {
//     res.sendStatus(400)
//     return;
//   }

//   try {
//     const comments: Comment[] = await getComments(client, resourceId);
//     if (comments.length == 0) {
//       res.sendStatus(404);
//       return;
//     }
//     res.status(200).json(comments);

//   } catch (error) {
//     res.sendStatus(500);
//     return;
//   }
// });

// app.post<{}, {}, CommentPost>("/comments", async (req, res) => {
//   const { resource_id, comment_text, user_id }: { resource_id: number, comment_text: string, user_id: number } = req.body
//   const commentIsEmpty = comment_text === "";
//   if (commentIsEmpty || !resource_id || !user_id || !comment_text) {
//     res.sendStatus(400)
//     return;
//   }

//   try {
//     const postedComment: Comment[] = await postComment(client, comment_text, resource_id, user_id);
//     res.status(201).json(postedComment);
//   } catch (error) {
//     if ((error.detail as string).includes("not present")) {
//       res.status(500).json("A resource id or user id was not present in the database");
//       return;
//     }
//     res.sendStatus(500);
//     return;
//   }
// });



//Start the server on the given port
const port = process.env.PORT;
if (!port) {
  throw 'Missing PORT environment variable.  Set it in .env file.';
}
app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
