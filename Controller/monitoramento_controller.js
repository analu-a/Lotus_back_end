const message = require('../Modulo/config')
const monitoramentoDAO = require('../Model/DAO/monitoramento')

const getListarMonitoramento = async function () {
    let monitoramentoJSON = {}

    let monitoramentoDados= await monitoramentoDAO.selectAllMonitoramento()

    if (monitoramentoDados) {

        if (monitoramentoDados.length) {
            monitoramentoJSON.monitoramentoDados= monitoramentoDados
            monitoramentoJSON.quantidade = monitoramentoDados.length
            monitoramentoJSON.status_code = 200
            return monitoramentoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    } else {
        monitoramentoJSON.error = monitoramentoDados
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const getListarMonitoramentoECategoria = async function () {
    let monitoramentoECategoriaJSON = {}

    let monitoramentoECategoriaDados = await monitoramentoDAO.selectCategoriaEMonitoramento()

    if (monitoramentoECategoriaDados) {
        
        if (monitoramentoECategoriaDados.length) {
            monitoramentoECategoriaJSON.monitoramentoECategoriaDados = monitoramentoECategoriaDados
            monitoramentoECategoriaJSON.quantidade = monitoramentoECategoriaDados.length
            monitoramentoECategoriaJSON.status_code = 200

            return monitoramentoECategoriaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setInserirMonitoramento = async function (monitoramentoDados, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultMonitoramentoDados = {}

            if (monitoramentoDados.titulo_monitoramento == "" || monitoramentoDados.titulo_monitoramento == undefined || monitoramentoDados.titulo_monitoramento.length > 50 ||
                monitoramentoDados.icone_monitoramento == "" || monitoramentoDados.icone_monitoramento == undefined || monitoramentoDados.icone_monitoramento.length > 300 ||
                monitoramentoDados.id_monitoramento_categoria == "" || monitoramentoDados.id_monitoramento_categoria == undefined ||isNaN(monitoramentoDados.id_monitoramento_categoria)) {

                return message.ERROR_REQUIRED_FIELDS

            } else {

                let novoMonitoramento = await monitoramentoDAO.inserirMonitoramento(monitoramentoDados)

                if (novoMonitoramento) {
                    let returnId = await monitoramentoDAO.returnId()

                    resultMonitoramentoDados.status = message.SUCESS_CREATED_ITEM.status
                    resultMonitoramentoDados.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultMonitoramentoDados.message = message.SUCESS_CREATED_ITEM.message
                    resultMonitoramentoDados.monitoramento = monitoramentoDados

                    resultMonitoramentoDados.monitoramento.id = returnId[0].id
                    return resultMonitoramentoDados

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

const setEditarMonitoramento = async function (id_monitoramentos, dadosMonitoramento, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosMonitoramento = {}
            let id_monitoramento = id_monitoramentos

            if (id_monitoramento == '' || id_monitoramento == undefined || isNaN(id_monitoramento)) {
                return message.ERROR_INVALID_ID
            } else {

                let validarId = await monitoramentoDAO.selectByIdMonitoramento(id_monitoramento)

                if (validarId == false) {

                    return message.ERROR_NOT_FOUND
                } else {

                    if (dadosMonitoramento.titulo_monitoramento == "" || dadosMonitoramento.titulo_monitoramento == undefined || dadosMonitoramento.titulo_monitoramento.length > 50 ||
                        dadosMonitoramento.icone_monitoramento == "" || dadosMonitoramento.icone_monitoramento == undefined || dadosMonitoramento.icone_monitoramento.length > 300 ||
                        dadosMonitoramento.id_monitoramento_categoria == "" || dadosMonitoramento.id_monitoramento_categoria == undefined || isNaN(dadosMonitoramento.id_monitoramento_categoria)) 
                        {

                        return message.ERROR_REQUIRED_FIELDS
                    } else {

                        let novoMonitoramento = await monitoramentoDAO.editarMonitoramento(dadosMonitoramento, id_monitoramento)

                        if (novoMonitoramento) {
                            resultDadosMonitoramento.status = message.SUCESS_EDITED_ITEM.status
                            resultDadosMonitoramento.status_code = message.SUCESS_EDITED_ITEM.status_code
                            resultDadosMonitoramento.message = message.SUCESS_EDITED_ITEM.message
                            resultDadosMonitoramento.monitoramento = dadosMonitoramento

                            return resultDadosMonitoramento
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

const setExcluirMonitoramento = async function (id_monitoramentos) {

    try {
        let id_monitoramento = id_monitoramentos

        if (id_monitoramento == '' || id_monitoramento == undefined || isNaN(id_monitoramento)) {

            return message.ERROR_INVALID_ID
        } else {
            let validarId = await monitoramentoDAO.selectByIdMonitoramento(id_monitoramento)

            if (validarId == false) {
                return message.ERROR_NOT_FOUND
            } else {

                let dadosMonitoramento = await monitoramentoDAO.deletarMonitoramento(id_monitoramento)

                if (dadosMonitoramento) {
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

const getBuscarMonitoramentoId = async function (id) {
    try {
        let id_monitoramento = id
        let monitoramentoJSON = {}

        if (id_monitoramento == '' || id_monitoramento == undefined || isNaN(id_monitoramento)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosMonitoramento = await monitoramentoDAO.selectByIdMonitoramento(id_monitoramento)

            if (dadosMonitoramento) {
                if (dadosMonitoramento.length) {
                    monitoramentoJSON.monitoramento = dadosMonitoramento
                    monitoramentoJSON.status_code = 200

                    return monitoramentoJSON

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

const getBuscarMonitoramentoECategoriaId = async function (id) {
    try {
        let id_monitoramento = id
        let monitoramentoJSON = {}

        if (id_monitoramento == '' || id_monitoramento == undefined || isNaN(id_monitoramento)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosMonitoramento = await monitoramentoDAO.selectByIdMonitoramentoECtegoria(id_monitoramento)

            if (dadosMonitoramento) {
                if (dadosMonitoramento.length) {
                    monitoramentoJSON.monitoramento = dadosMonitoramento
                    monitoramentoJSON.status_code = 200

                    return monitoramentoJSON

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
   getListarMonitoramento,
    setInserirMonitoramento,
    setEditarMonitoramento,
    setExcluirMonitoramento,
    getBuscarMonitoramentoId,
    getListarMonitoramentoECategoria,
    getBuscarMonitoramentoECategoriaId
}
