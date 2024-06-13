import { Router } from "express";
import {
    salvarTag,
    listarTags,
    buscarTagPorId,
    atualizarTag,
    removerTag
} from "../repository/tagRepository.js";

const router = Router();

router.post('/', async (req, res) => {
    const tag = req.body;
    const tagInserida = await salvarTag(tag);
    res.send(tagInserida);
});

router.get('/', async (req, res) => {
    const listaTags = await listarTags();
    res.send(listaTags);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const tag = await buscarTagPorId(id);
    res.send(tag);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const tag = req.body;
    const resultado = await atualizarTag(id, tag);
    if (resultado === 0) {
        res.status(404).send();
    } else {
        res.status(202).send();
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const resultado = await removerTag(id);
    if (resultado === 0) {
        res.status(404).send();
    } else {
        res.status(202).send();
    }
});

export default router;
