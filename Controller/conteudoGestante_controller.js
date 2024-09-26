const message = require('../Modulo/config')
const conteudoDAO = require('../Model/DAO/conteudoGestante')

const getListarConteudos = async function(){
let conteudoJSON= {}

let conteudosDados = await conteudoDAO.selectAllConteudos()

if (conteudosDados) {

    if (conteudosDados.length) {
       conteudoJSON.conteudosDados = conteudosDados
        conteudoJSON.quantidade = conteudosDados.length
        conteudoJSON.status_code = 200
        return conteudoJSON
    } else {
        return message.ERROR_NOT_FOUND
    }
    
} else {
    return message.ERROR_INTERNAL_SERVER_DB
}
}

module.exports={
    getListarConteudos
}
