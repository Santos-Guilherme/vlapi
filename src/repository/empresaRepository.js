import connection from "../config/connection.js";

export async function salvarEmpresa(empresa) {
    const comando = `
        INSERT INTO empresas (nome, setor, cnpj, aparecer_home) VALUES (?, ?, ?, ?)
    `;
    const [resp] = await connection.query(comando, [empresa.nome, empresa.setor, empresa.cnpj, empresa.aparecer_home]);
    empresa.id = resp.insertId;
    return empresa;
}

export async function listarEmpresas() {
    const comando = `
        SELECT empresas.id, empresas.nome, empresas.setor, empresas.cnpj, empresas.logo, empresas.aparecer_home, tags.nome AS nome_tag
        FROM empresas
        LEFT JOIN tags ON empresas.setor = tags.id
    `;
    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function buscarEmpresasVisiveis() {
    const comando = `
        SELECT empresas.id, empresas.nome, empresas.setor, empresas.cnpj, empresas.logo, empresas.aparecer_home
        FROM empresas where empresas.aparecer_home = true
    `;
    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function buscarEmpresaPorId(id) {
    const comando = `
        SELECT empresas.id, empresas.nome, empresas.setor, empresas.cnpj, empresas.logo, empresas.aparecer_home, tags.nome AS nome_tag
        FROM empresas
        LEFT JOIN tags ON empresas.setor = tags.id Where empresas.id = ?
    `;
    const [linhas] = await connection.query(comando, [id]);
    return linhas[0];
}

export async function atualizarEmpresa(id, empresa) {
    const comando = `
        UPDATE empresas SET nome = ?, setor = ?, cnpj = ?, aparecer_home = ? WHERE id = ?
    `;
    const [res] = await connection.query(comando, [empresa.nome, empresa.setor, empresa.cnpj, empresa.aparecer_home, id]);
    return res.affectedRows;
}

export async function removerEmpresa(id) {
    const comando = `
        DELETE FROM empresas WHERE id = ?
    `;
    const [res] = await connection.query(comando, [id]);
    return res.affectedRows;
}

export async function atualizarLogoEmpresa(idEmpresa, caminhoLogo) {
    const comando = `
        UPDATE empresas SET logo = ? WHERE id = ?
    `;
    const [res] = await connection.query(comando, [caminhoLogo, idEmpresa]);
    return res.affectedRows;
}

export async function buscarEmpresaPorNome(nome) {
    const comando = `
        SELECT empresas.id, empresas.nome, empresas.setor, empresas.cnpj, empresas.logo, empresas.aparecer_home, tags.nome AS nome_tag
        FROM empresas
        LEFT JOIN tags ON empresas.setor = tags.id WHERE empresas.nome LIKE ?
    `;
    const [linhas] = await connection.query(comando, [`%${nome}%`]);
    return linhas;
}

export async function buscarEmpresaPorTagId(tagId) {
    const comando = `
        SELECT empresas.id, empresas.nome, empresas.setor, empresas.cnpj, empresas.logo, empresas.aparecer_home, tags.nome AS nome_tag
        FROM empresas
        LEFT JOIN tags ON empresas.setor = tags.id WHERE empresas.setor = ?
    `;
    const [linhas] = await connection.query(comando, [tagId]);
    return linhas;
}
