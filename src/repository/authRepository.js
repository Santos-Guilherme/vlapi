import con from "../config/connection.js";

export async function salvarLogin(login) {
    let comando = `
    insert into tb_login (nomeUsuario, senha)
    values (?, ?);
    `;

    let resp = await con.query(comando, [login.nome, login.senha])
    let info = resp[0];

    login.id = info.inserId;
    return login;
}

export async function buscarUsuario(login) {
    let comando = `
        SELECT * FROM usuarios WHERE usuario = ? AND senha = ?;
    `;

    let [linhas] = await con.query(comando, [login.nome, login.senha]);
    return linhas[0];
}