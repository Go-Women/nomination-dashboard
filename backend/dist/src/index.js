"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const dummydb_1 = __importDefault(require("./dummydb"));
const dummyJudgeDB_1 = __importDefault(require("./dummyJudgeDB"));
const codes_1 = __importDefault(require("./codes"));
const nominees = require("./dummyNomineeDB");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.get('/keys', (req, res) => {
    res.json(codes_1.default);
});
app.get('/home', (req, res) => {
    res.json(dummydb_1.default);
});
app.get('/nominations', (req, res) => {
    res.json(dummydb_1.default);
});
app.get('/nominations/:id', (req, res) => {
    let id = req.params['id'];
    res.json(dummydb_1.default[id]);
});
app.post('/nominations', (req, res) => {
    console.log(req.body.data);
    res.sendStatus(200);
});
app.get('/judges', (req, res) => {
    res.json(dummyJudgeDB_1.default);
});
app.get('/judges/:id', (req, res) => {
    let id = req.params['id'];
    res.json(dummyJudgeDB_1.default[id]);
});
app.get('/nominees/:id', (req, res) => {
    let id = req.params['id'];
    res.json(nominees[id]);
});
app.get('/matching', (req, res) => {
    res.json();
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
