import connection from "../config/connection.js";

export async function salvarServidor(servidor) {
    const comando = `
        INSERT INTO servidores (especificacoes, localizacao, status, empresa_id, historico_manutencao) VALUES (?, ?, ?, ?, ?)
    `;
    const [resp] = await connection.query(comando, [servidor.especificacoes, servidor.localizacao, servidor.status, servidor.empresa_id, servidor.historico_manutencao]);
    servidor.id = resp.insertId;
    return servidor;
}

export async function listarServidores() {
    const comando = `
        SELECT s.id, s.especificacoes, s.localizacao, s.status, s.empresa_id, e.nome AS empresa_nome, s.historico_manutencao 
        FROM servidores s
        LEFT JOIN empresas e ON s.empresa_id = e.id
    `;
    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function buscarServidorPorId(id) {
    const comando = `
        SELECT s.id, s.especificacoes, s.localizacao, s.status, s.empresa_id, e.nome AS empresa_nome, s.historico_manutencao 
        FROM servidores s
        LEFT JOIN empresas e ON s.empresa_id = e.id
        WHERE s.id = ?
    `;
    const [linhas] = await connection.query(comando, [id]);
    return linhas[0];
}

export async function atualizarServidor(id, servidor) {
    const comando = `
        UPDATE servidores SET especificacoes = ?, localizacao = ?, status = ?, empresa_id = ?, historico_manutencao = ? WHERE id = ?
    `;
    const [res] = await connection.query(comando, [servidor.especificacoes, servidor.localizacao, servidor.status, servidor.empresa_id, servidor.historico_manutencao, id]);
    return res.affectedRows;
}

export async function removerServidor(id) {
    const comando = `
        DELETE FROM servidores WHERE id = ?
    `;
    const [res] = await connection.query(comando, [id]);
    return res.affectedRows;
}

export async function listarServidoresPorEmpresa(empresaId) {
    const comando = `
        SELECT s.id, s.especificacoes, s.localizacao, s.status, s.empresa_id, e.nome AS empresa_nome, s.historico_manutencao 
        FROM servidores s
        LEFT JOIN empresas e ON s.empresa_id = e.id
        WHERE s.empresa_id = ?
    `;
    const [linhas] = await connection.query(comando, [empresaId]);
    return linhas;
}

export async function listarServidoresDesativados() {
    const comando = `
        SELECT s.id, s.especificacoes, s.localizacao, s.status, s.empresa_id, e.nome AS empresa_nome, s.historico_manutencao 
        FROM servidores s
        LEFT JOIN empresas e ON s.empresa_id = e.id
        WHERE s.empresa_id IS NULL
    `;
    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function listarServidoresAtivados() {
    const comando = `
        SELECT s.id, s.especificacoes, s.localizacao, s.status, s.empresa_id, e.nome AS empresa_nome, s.historico_manutencao 
        FROM servidores s
        LEFT JOIN empresas e ON s.empresa_id = e.id
        WHERE s.empresa_id IS NOT NULL
    `;
    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function listarServidoresAtivadosPorStatus(status) {
    const comando = `
        SELECT s.id, s.especificacoes, s.localizacao, s.status, s.empresa_id, e.nome AS empresa_nome, s.historico_manutencao 
        FROM servidores s
        LEFT JOIN empresas e ON s.empresa_id = e.id
        WHERE s.empresa_id IS NOT NULL AND s.status = ?
    `;
    const [linhas] = await connection.query(comando, [status]);
    return linhas;
}

export async function listarServidoresPorStatus(status) {
    const comando = `
        SELECT s.id, s.especificacoes, s.localizacao, s.status, s.empresa_id, e.nome AS empresa_nome, s.historico_manutencao 
        FROM servidores s
        LEFT JOIN empresas e ON s.empresa_id = e.id
        WHERE s.status = ?
    `;
    const [linhas] = await connection.query(comando, [status]);
    return linhas;
}
