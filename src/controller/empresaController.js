import multer from "multer";
import { Router } from "express";
import {
    salvarEmpresa,
    listarEmpresas,
    buscarEmpresaPorId,
    atualizarEmpresa,
    removerEmpresa,
    atualizarLogoEmpresa,
    buscarEmpresaPorNome,
    buscarEmpresaPorTagId,
    buscarEmpresasVisiveis
} from "../repository/empresaRepository.js";

const router = Router();
const upload = multer({ dest: 'storage/logo' });

router.post('/', async (req, res) => {
    const empresa = req.body;
    const empresaInserida = await salvarEmpresa(empresa);
    res.send(empresaInserida);
});

router.get('/', async (req, res) => {
    const listaEmpresas = await listarEmpresas();
    res.send(listaEmpresas);
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    const empresa = await buscarEmpresaPorId(id);
    res.send(empresa);
});

router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const empresa = req.body;
    const resultado = await atualizarEmpresa(id, empresa);
    if (resultado === 0) {
        res.status(404).send();
    } else {
        res.status(202).send();
    }
});

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const resultado = await removerEmpresa(id);
    if (resultado === 0) {
        res.status(404).send();
    } else {
        res.status(202).send();
    }
});

router.put('/logo/:id', upload.single('logo'), async (req, res) => {
    const idEmpresa = req.params.id;
    let caminhoLogo = req.file.path;
    const resultado = await atualizarLogoEmpresa(idEmpresa, caminhoLogo);
    if (resultado === 0) {
        res.status(404).send();
    } else {
        res.status(200).send({ caminhoLogo });
    }
});

router.get('/visivel/true', async (req, res) => {
    const empresa = await buscarEmpresasVisiveis();
    if (empresa) {
        res.send(empresa);
    } else {
        res.status(404).send();
    }
});

router.get('/nome/:nome', async (req, res) => {
    const nome = req.params.nome;
    const empresas = await buscarEmpresaPorNome(nome);
    if (empresas.length > 0) {
        res.send(empresas);
    } else {
        res.status(404).send();
    }
});

router.get('/tag/:tagId', async (req, res) => {
    const tagId = req.params.tagId;
    const empresas = await buscarEmpresaPorTagId(tagId);
    if (empresas.length > 0) {
        res.send(empresas);
    } else {
        res.send(null);
    }
});

export default router;
