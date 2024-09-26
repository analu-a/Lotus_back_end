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

const setInserirConteudo = async function(dadosConteudo, contentType){
    try {
        
        if (String(contentType).toLocaleLowerCase() == 'application/json') {
            
            let resultDadosConteudo = {}

            if (dadosConteudo.foto_capa == "" || dadosConteudo.foto_capa == undefined || dadosConteudo.foto_capa.length > 300 ||
                dadosConteudo.titulo_conteudo == "" || dadosConteudo.titulo_conteudo == undefined || dadosConteudo.titulo_conteudo.length > 50 ||
                dadosConteudo.data_conteudo == "" || dadosConteudo.data_conteudo == undefined || dadosConteudo.data_conteudo.length > 10 ||
                dadosConteudo.conteudo == "" || dadosConteudo.conteudo == undefined ) 
                { 
                
                    return message.ERROR_REQUIRED_FIELDS

            } else {
                
                let novoConteudo = await conteudoDAO.inserirConteudo(dadosConteudo)

                if (novoConteudo) {
                    let returnId = await conteudoDAO.returnId()

                    resultDadosConteudo.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosConteudo.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosConteudo.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosConteudo.conteudo = dadosConteudo

                    resultDadosConteudo.conteudo.id = returnId[0].id
                    return resultDadosConteudo

                } else {
                    
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
            
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports={
    getListarConteudos,
    setInserirConteudo
}
