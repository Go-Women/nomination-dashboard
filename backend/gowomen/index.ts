import express, { Express, Request, Response } from 'express';
require('dotenv').config();

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express & Typescript Server');
});

app.get('/nominations/:id', (req: Request, res: Response) => {
  let nominationId = req.params['id'];
  res.json({
    id: nominationId,
    firstName: 'Alexandria',
    lastName: 'Ocasio-Cortez',
    category: 'Politician'
  });
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});