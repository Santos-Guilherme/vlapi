import { Router } from "express";
import {
    salvarServidor,
    listarServidores,
    buscarServidorPorId,
    atualizarServidor,
    removerServidor,
    listarServidoresPorEmpresa,
    listarServidoresDesativados,
    listarServidoresPorStatus,
    listarServidoresAtivados,
    listarServidoresAtivadosPorStatus
} from "../repository/servidorRepository.js";

const router = Router();

router.post('/', async (req, res) => {
    const servidor = req.body;
    const servidorInserido = await salvarServidor(servidor);
    res.send(servidorInserido);
});

router.get('/', async (req, res) => {
    const listaServidores = await listarServidores();
    res.send(listaServidores);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const servidor = await buscarServidorPorId(id);
    res.send(servidor);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const servidor = req.body;
    const resultado = await atualizarServidor(id, servidor);
    if (resultado === 0) {
        res.status(404).send();
    } else {
        res.status(202).send();
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const resultado = await removerServidor(id);
    if (resultado === 0) {
        res.status(404).send();
    } else {
        res.status(202).send();
    }
});

router.get('/empresa/:empresaId', async (req, res) => {
    const empresaId = req.params.empresaId;
    const servidores = await listarServidoresPorEmpresa(empresaId);
    res.send(servidores);
});

router.get('/status/desativado', async (req, res) => {
    const servidores = await listarServidoresDesativados();
    res.send(servidores);
});

router.get('/status/ativado', async (req, res) => {
    const servidores = await listarServidoresAtivados();
    res.send(servidores);
});

router.get('/ativado/:status', async (req, res) => {
    const status = req.params.status;
    const servidores = await listarServidoresAtivadosPorStatus(status);
    res.send(servidores);
});

router.get('/status/:status', async (req, res) => {
    const status = req.params.status;
    const servidores = await listarServidoresPorStatus(status);
    res.send(servidores);
});

export default router;
