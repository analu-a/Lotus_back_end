const message = require('../Modulo/config')
const categoriaMoniDAO = require('../Model/DAO/categoriaMonitoramento')

const getListarCategoriaMonitoramento = async function () {
    let categoriaMoniJSON = {}

    let categoriaMoniDados = await categoriaMoniDAO.selectAllCategoriaMonitoramento()

    if (categoriaMoniDados) {

        if (categoriaMoniDados.length) {
            categoriaMoniJSON.categoriaMoniDados = categoriaMoniDados
            categoriaMoniJSON.quantidade = categoriaMoniDados.length
            categoriaMoniJSON.status_code = 200
            return categoriaMoniJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    } else {
        categoriaMoniJSON.error = categoriaMoniDados
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setInserirCategoriaMonitoramento = async function (dadosCategoriaMonitoramento, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosCategoriaMonitoramento = {}

            if (dadosCategoriaMonitoramento.foto_capa == "" || dadosCategoriaMonitoramento.foto_capa == undefined || dadosCategoriaMonitoramento.foto_capa.length > 300 ||
                dadosCategoriaMonitoramento.titulo_conteudo == "" || dadosCategoriaMonitoramento.titulo_conteudo == undefined || dadosCategoriaMonitoramento.titulo_conteudo.length > 50 ||
                dadosCategoriaMonitoramento.data_conteudo == "" || dadosCategoriaMonitoramento.data_conteudo == undefined || dadosCategoriaMonitoramento.data_conteudo.length > 10 ||
                dadosCategoriaMonitoramento.conteudo == "" || dadosCategoriaMonitoramento.conteudo == undefined) {

                return message.ERROR_REQUIRED_FIELDS

            } else {

                let novoConteudo = await conteudoDAO.inserirConteudo(dadosCategoriaMonitoramento)

                if (novoConteudo) {
                    let returnId = await conteudoDAO.returnId()

                    resultdadosCategoriaMonitoramento.status = message.SUCESS_CREATED_ITEM.status
                    resultdadosCategoriaMonitoramento.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultdadosCategoriaMonitoramento.message = message.SUCESS_CREATED_ITEM.message
                    resultdadosCategoriaMonitoramento.conteudo = dadosCategoriaMonitoramento

                    resultdadosCategoriaMonitoramento.conteudo.id = returnId[0].id
                    return resultdadosCategoriaMonitoramento

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

const setEditarConteudo = async function (id_conteudos, dadosCategoriaMonitoramento, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultdadosCategoriaMonitoramento = {}
            let id_conteudo = id_conteudos

            if (id_conteudo == '' || id_conteudo == undefined || isNaN(id_conteudo)) {
                return message.ERROR_INVALID_ID
            } else {

                let validarId = await conteudoDAO.selectByIdConteudo(id_conteudo)

                if (validarId == false) {

                    return message.ERROR_NOT_FOUND
                } else {

                    if (dadosCategoriaMonitoramento.foto_capa == "" || dadosCategoriaMonitoramento.foto_capa == undefined || dadosCategoriaMonitoramento.foto_capa.length > 300 ||
                        dadosCategoriaMonitoramento.titulo_conteudo == "" || dadosCategoriaMonitoramento.titulo_conteudo == undefined || dadosCategoriaMonitoramento.titulo_conteudo.length > 50 ||
                        dadosCategoriaMonitoramento.data_conteudo == "" || dadosCategoriaMonitoramento.data_conteudo == undefined || dadosCategoriaMonitoramento.data_conteudo.length > 10 ||
                        dadosCategoriaMonitoramento.conteudo == "" || dadosCategoriaMonitoramento.conteudo == undefined) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {

                        let novoConteudo = await conteudoDAO.editarConteudo(dadosCategoriaMonitoramento, id_conteudo)

                        if (novoConteudo) {
                            resultdadosCategoriaMonitoramento.status = message.SUCESS_EDITED_ITEM.status
                            resultdadosCategoriaMonitoramento.status_code = message.SUCESS_EDITED_ITEM.status_code
                            resultdadosCategoriaMonitoramento.message = message.SUCESS_EDITED_ITEM.message
                            resultdadosCategoriaMonitoramento.conteudo = dadosCategoriaMonitoramento

                            return resultdadosCategoriaMonitoramento
                        } else {
                            return message.ERROR_INTERNAL_SERVER_DB
                        }
                    }
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirConteudo = async function (id_conteudos) {

    try {
        let id_conteudo = id_conteudos

        if (id_conteudo == '' || id_conteudo == undefined || isNaN(id_conteudo)) {

            return message.ERROR_INVALID_ID
        } else {
            let validarId = await conteudoDAO.selectByIdConteudo(id_conteudo)

            if (validarId == false) {
                return message.ERROR_NOT_FOUND
            } else {

                let dadosCategoriaMonitoramento = await conteudoDAO.deletarConteudo(id_conteudo)

                if (dadosCategoriaMonitoramento) {
                    return message.SUCESS_DELETED_ITEM
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarConteudoId = async function (id) {
    try {
        let id_conteudo = id
        let categoriaMoniJSON = {}

        if (id_conteudo == '' || id_conteudo == undefined || isNaN(id_conteudo)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosCategoriaMonitoramento = await conteudoDAO.selectByIdConteudo(id_conteudo)

            if (dadosCategoriaMonitoramento) {
                if (dadosCategoriaMonitoramento.length) {
                    categoriaMoniJSON.conteudo = dadosCategoriaMonitoramento
                    categoriaMoniJSON.status_code = 200

                    return categoriaMoniJSON

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
    getListarConteudos,
    setInserirConteudo,
    setEditarConteudo,
    setExcluirConteudo,
    getBuscarConteudoId
}
