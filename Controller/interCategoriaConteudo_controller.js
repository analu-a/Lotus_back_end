const message = require('../Modulo/config')
const cateConteudoDAO = require('../Model/DAO/interCategoriaConteudo')

const getListarCategoriaConteudo = async function () {
    let categoriaConteudoJSON = {}

    let categoriaConteudoDados = await cateConteudoDAO.selectAllCategoriasConteudo()

    if (categoriaConteudoDados) {
        if (categoriaConteudoDados.length) {
            categoriaConteudoJSON.categoriaConteudoDados = categoriaConteudoDados
            categoriaConteudoJSON.quantidade = categoriaConteudoDados.length
            categoriaConteudoJSON.status_code = 200
            return categoriaConteudoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
     return message.ERROR_INTERNAL_SERVER_DB   
    }
}

const getBuscarcategoriaConteudoId = async function (id) {
    try {
        let id_conteudo = id
        let  categoriaConteudoJSON = {}

        if (id_conteudo == '' || id_conteudo == undefined || isNaN(id_conteudo)) {
            return message.ERROR_INVALID_ID
        } else {
            let categoriaConteudoDados = await cateConteudoDAO.selectCategoriaConteudoId(id_conteudo)

            if (categoriaConteudoDados) {
                if (categoriaConteudoDados.length > 0) {
                     categoriaConteudoJSON.categoriaConteudo = categoriaConteudoDados
                     categoriaConteudoJSON.status_code = 200
               
                    return  categoriaConteudoJSON

                } else {
                    
                    return message.ERROR_NOT_FOUND
                }

            } else {
              
                return message.ERROR_INTERNAL_SERVER_DB
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }


}

module.exports = {
    getBuscarcategoriaConteudoId,
    getListarCategoriaConteudo
}