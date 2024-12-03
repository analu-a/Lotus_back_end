const message = require('../Modulo/config')
const enxovalDAO = require('../Model/DAO/enxoval')

const getListarEnxoval = async function () {
    let enxovalJSON = {}

    let enxovalDados = await enxovalDAO.selectAllEnxoval()

    if (enxovalDados) {

        if (enxovalDados.length) {
            enxovalJSON.enxovalDados = enxovalDados
            enxovalJSON.quantidade = enxovalDados.length
            enxovalJSON.status_code = 200
            return enxovalJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    } else {
        enxovalJSON.error = enxovalDados
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setInserirEnxoval = async function (enxovalDados, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultEnxovalDados = {}

            if (enxovalDados.produtos_enxoval == "" || enxovalDados.produtos_enxoval == undefined || enxovalDados.produtos_enxoval.length > 300 ||
                enxovalDados.id_gestante_usuario_enxoval == "" || enxovalDados.id_gestante_usuario_enxoval == undefined || isNaN(enxovalDados.id_gestante_usuario_enxoval) ) {

                return message.ERROR_REQUIRED_FIELDS

            } else {

                let novoEnxoval = await enxovalDAO.inserirEnxoval(enxovalDados)

                if (novoEnxoval) {
                    let returnId = await enxovalDAO.returnId()

                    resultEnxovalDados.status = message.SUCESS_CREATED_ITEM.status
                    resultEnxovalDados.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultEnxovalDados.message = message.SUCESS_CREATED_ITEM.message
                    resultEnxovalDados.enxoval = enxovalDados

                    resultEnxovalDados.enxoval.id = returnId[0].id
                    return resultEnxovalDados

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

const setEditarEnxoval = async function (id_enxoval, enxovalDados, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultEnxovalDados = {}
            let id_enxovais = id_enxoval

            if (id_enxovais == '' || id_enxovais == undefined || isNaN(id_enxovais)) {
                return message.ERROR_INVALID_ID
            } else {

                let validarId = await enxovalDAO.selectByIdEnxoval(id_enxovais)

                if (validarId == false) {

                    return message.ERROR_NOT_FOUND
                } else {

                    if (enxovalDados.produtos_enxoval == "" || enxovalDados.produtos_enxoval == undefined || enxovalDados.produtos_enxoval.length > 30 ||
                        enxovalDados.id_gestante_usuario_enxoval == "" || enxovalDados.id_gestante_usuario_enxoval == undefined || isNaN(enxovalDados.id_gestante_usuario_enxoval)) {
                        return message.ERROR_REQUIRED_FIELDS
                    } else {

                        let novoEnxoval = await enxovalDAO.editarEnxoval(enxovalDados, id_enxovais)

                        if (novoEnxoval) {
                            resultEnxovalDados.status = message.SUCESS_EDITED_ITEM.status
                            resultEnxovalDados.status_code = message.SUCESS_EDITED_ITEM.status_code
                            resultEnxovalDados.message = message.SUCESS_EDITED_ITEM.message
                            resultEnxovalDados.enxoval = enxovalDados

                            return resultEnxovalDados
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

const setExcluirEnxoval = async function (id_enxoval) {

    try {
        let id_enxovais = id_enxoval

        if (id_enxovais == '' || id_enxovais == undefined || isNaN(id_enxovais)) {

            return message.ERROR_INVALID_ID
        } else {
            let validarId = await enxovalDAO.selectByIdEnxoval(id_enxovais)

            if (validarId == false) {
                return message.ERROR_NOT_FOUND
            } else {

                let enxovalDados = await enxovalDAO.deletarEnxoval(id_enxovais)

                if (enxovalDados) {
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

module.exports = {
getListarEnxoval,
setEditarEnxoval,
setExcluirEnxoval,
setInserirEnxoval
}