import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import empresaController from './controller/empresaController.js';
import servidorController from './controller/servidorController.js';
import tagController from './controller/tagController.js';
import authController from './controller/authController.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/login', authController);
app.use('/empresas', empresaController);
app.use('/servidores', servidorController);
app.use('/tags', tagController);

app.use('/storage/logo', express.static('storage/logo'));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`API SUBIU na porta ${port}!`));
