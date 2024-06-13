import connection from "../config/connection.js";

export async function salvarTag(tag) {
    const comando = `
        INSERT INTO tags (nome) VALUES (?)
    `;
    const [resp] = await connection.query(comando, [tag.nome]);
    tag.id = resp.insertId;
    return tag;
}

export async function listarTags() {
    const comando = `
        SELECT id, nome FROM tags order by id Desc
    `;
    const [linhas] = await connection.query(comando);
    return linhas;
}

export async function buscarTagPorId(id) {
    const comando = `
        SELECT id, nome FROM tags WHERE id = ?
    `;
    const [linhas] = await connection.query(comando, [id]);
    return linhas[0];
}

export async function atualizarTag(id, tag) {
    const comando = `
        UPDATE tags SET nome = ? WHERE id = ?
    `;
    const [res] = await connection.query(comando, [tag.nome, id]);
    return res.affectedRows;
}

export async function removerTag(id) {
    const comando = `
        DELETE FROM tags WHERE id = ?
    `;
    const [res] = await connection.query(comando, [id]);
    return res.affectedRows;
}
