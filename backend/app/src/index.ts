import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import nominations from './dummydb';
import judges from './dummyJudgeDB';
import codes from './codes';
const nominees = require("./dummyNomineeDB");

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.get('/keys', (req: Request, res: Response) => {
  res.json((codes as any));
});

app.get('/home', (req: Request, res: Response) => {
  res.json(nominations);
});

app.get('/nominations', (req: Request, res: Response) => {
  res.json(nominations);
});

app.get('/nominations/:id', (req: Request, res: Response) => {
  let id = req.params['id'];
  res.json((nominations as any)[id]);
});

app.post('/nominations', (req: Request, res: Response) => {
  console.log(req.body.data);
  res.sendStatus(200);
});

app.get('/judges', (req: Request, res: Response) => {
  res.json(judges);
});

app.get('/judges/:id', (req: Request, res: Response) => {
  let id = req.params['id'];
  res.json((judges as any)[id]);
});

app.get('/nominees/:id', (req: Request, res: Response) => {
  let id = req.params['id'];
  res.json((nominees as any)[id]);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});