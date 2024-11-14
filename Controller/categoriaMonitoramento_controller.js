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

            if (dadosCategoriaMonitoramento.titulo_categoria_monitoramento == "" || dadosCategoriaMonitoramento.titulo_categoria_monitoramento == undefined || dadosCategoriaMonitoramento.titulo_categoria_monitoramento.length > 50 ) {

                return message.ERROR_REQUIRED_FIELDS

            } else {

                let novaCategoriaMoni = await categoriaMoniDAO.inserirCategoriaMonitoramento(dadosCategoriaMonitoramento)

                if (novaCategoriaMoni) {
                    let returnId = await categoriaMoniDAO.returnId()

                    resultDadosCategoriaMonitoramento.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosCategoriaMonitoramento.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosCategoriaMonitoramento.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosCategoriaMonitoramento.categoriaMonitoramento = dadosCategoriaMonitoramento

                    resultDadosCategoriaMonitoramento.categoriaMonitoramento.id = returnId[0].id
                    return resultDadosCategoriaMonitoramento

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

const setEditarCategoriaMonitoramento = async function (id_categoria_monitoramentos, dadosCategoriaMonitoramento, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultdadosCategoriaMonitoramento = {}
            let id_categoria_monitoramento = id_categoria_monitoramentos

            if (id_categoria_monitoramento == '' || id_categoria_monitoramento == undefined || isNaN(id_categoria_monitoramento)) {
                return message.ERROR_INVALID_ID
            } else {

                let validarId = await categoriaMoniDAO.selectByIdCategoriaMonitoramento(id_categoria_monitoramento)

                if (validarId == false) {

                    return message.ERROR_NOT_FOUND
                } else {

                    if (dadosCategoriaMonitoramento.titulo_categoria_monitoramento == "" || dadosCategoriaMonitoramento.titulo_categoria_monitoramento == undefined || dadosCategoriaMonitoramento.titulo_categoria_monitoramento.length > 50) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {

                        let novaCategoriaMoni = await categoriaMoniDAO.editarCategoriaMonitoramento(dadosCategoriaMonitoramento, id_categoria_monitoramento)

                        if (novaCategoriaMoni) {
                            resultdadosCategoriaMonitoramento.status = message.SUCESS_EDITED_ITEM.status
                            resultdadosCategoriaMonitoramento.status_code = message.SUCESS_EDITED_ITEM.status_code
                            resultdadosCategoriaMonitoramento.message = message.SUCESS_EDITED_ITEM.message
                            resultdadosCategoriaMonitoramento.categoriaMonitoramento = dadosCategoriaMonitoramento

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

const setExcluirCategoriaMonitoramento = async function (id_categoria_monitoramentos) {

    try {
        let id_categoria_monitoramento = id_categoria_monitoramentos

        if (id_categoria_monitoramento == '' || id_categoria_monitoramento == undefined || isNaN(id_categoria_monitoramento)) {

            return message.ERROR_INVALID_ID
        } else {
            let validarId = await categoriaMoniDAO.selectByIdCategoriaMonitoramento(id_categoria_monitoramento)

            if (validarId == false) {
                return message.ERROR_NOT_FOUND
            } else {

                let dadosCategoriaMonitoramento = await categoriaMoniDAO.deletarCategoriaMonitoramento(id_categoria_monitoramento)

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

const getBuscarCategoriaMoniId = async function (id) {
    try {
        let id_categoria_monitoramento = id
        let categoriaMoniJSON = {}

        if (id_categoria_monitoramento == '' || id_categoria_monitoramento == undefined || isNaN(id_categoria_monitoramento)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosCategoriaMonitoramento = await categoriaMoniDAO.selectByIdCategoriaMonitoramento(id_categoria_monitoramento)

            if (dadosCategoriaMonitoramento) {
                if (dadosCategoriaMonitoramento.length) {
                    categoriaMoniJSON.categoriaMonitoramento = dadosCategoriaMonitoramento
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
    getListarCategoriaMonitoramento,
    setInserirCategoriaMonitoramento,
    setEditarCategoriaMonitoramento,
    setExcluirCategoriaMonitoramento,
    getBuscarCategoriaMoniId
}
