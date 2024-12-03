const message = require('../Modulo/config')
const agendaDAO = require('../Model/DAO/agendaCalendario')

const getListarAgenda= async function () {
    let agendaJSON = {}

    let agendaDados = await agendaDAO.selectAllAgenda()

    if (agendaDados) {

        if (agendaDados.length) {
            agendaJSON.agendaDados = agendaDados
            agendaJSON.quantidade = agendaDados.length
            agendaJSON.status_code = 200
            return agendaJSON
        } else {
            return message.ERROR_NOT_FOUND
        }

    } else {
        agendaJSON.error = agendaDados
        return message.ERROR_INTERNAL_SERVER_DB
    }
}

const setInserirAgenda = async function (agendaDados, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultAgendaDados = {}

            if (agendaDados.descricao_calendario == "" || agendaDados.descricao_calendario == undefined || agendaDados.descricao_calendario.length > 100 ||
                agendaDados.data_calendario == "" || agendaDados.data_calendario == undefined || agendaDados.data_calendario.length !=10 ||
                agendaDados.horario_calendario == "" || agendaDados.horario_calendario == undefined || agendaDados.horario_calendario.length != 8 ||
                agendaDados.usuario_calendario_id == "" || agendaDados.usuario_calendario_id == undefined || isNaN(agendaDados.usuario_calendario_id)) {
                return message.ERROR_REQUIRED_FIELDS

            } else {

                let novaAgenda= await agendaDAO.inserirAgenda(agendaDados)

                if (novaAgenda) {
                    let returnId = await agendaDAO.returnId()

                    resultAgendaDados.status = message.SUCESS_CREATED_ITEM.status
                    resultAgendaDados.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultAgendaDados.message = message.SUCESS_CREATED_ITEM.message
                    resultAgendaDados.agenda = agendaDados

                    resultAgendaDados.agenda.id = returnId[0].id
                    return resultAgendaDados

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

const setEditarAgenda = async function (id_agenda_calendario, agendaDados, contentType) {

    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultAgendaDados = {}
            let id_agenda_calendario = id_agenda

            if (id_agenda_calendario == '' || id_agenda_calendario == undefined || isNaN(id_agenda_calendario)) {
                return message.ERROR_INVALID_ID
            } else {

                let validarId = await agendaDAO.selectByIdAgenda(id_agenda_calendario)

                if (validarId == false) {

                    return message.ERROR_NOT_FOUND
                } else {

                    if (agendaDados.descricao_calendario == "" || agendaDados.descricao_calendario == undefined || agendaDados.descricao_calendario.length > 100 ||
                        agendaDados.data_calendario == "" || agendaDados.data_calendario == undefined || isNaN(agendaDados.data_calendario) ||
                        agendaDados.horario_calendario == "" || agendaDados.horario_calendario == undefined || isNaN(agendaDados.horario_calendario) ||
                        agendaDados.usuario_calendario_id == "" || agendaDados.usuario_calendario_id == undefined || isNaN(agendaDados.usuario_calendario_id)) {

                        return message.ERROR_REQUIRED_FIELDS
                    } else {

                        let novoEnxoval = await agendaDAO.editarAgenda(agendaDados, id_agenda_calendario)

                        if (novoEnxoval) {
                            resultAgendaDados.status = message.SUCESS_EDITED_ITEM.status
                            resultAgendaDados.status_code = message.SUCESS_EDITED_ITEM.status_code
                            resultAgendaDados.message = message.SUCESS_EDITED_ITEM.message
                            resultAgendaDados.enxoval = agendaDados

                            return resultAgendaDados
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

const setExcluirAgenda = async function (id_agenda) {

    try {
        let id_agenda_calendario = id_agenda

        if (id_agenda_calendario == '' || id_agenda_calendario == undefined || isNaN(id_agenda_calendario)) {

            return message.ERROR_INVALID_ID
        } else {
            let validarId = await agendaDAO.selectByIdAgenda(id_agenda_calendario)

            if (validarId == false) {
                return message.ERROR_NOT_FOUND
            } else {

                let agendaDados = await agendaDAO.deletarAgenda(id_agenda_calendario)

                if (agendaDados) {
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
getListarAgenda,
setEditarAgenda,
setExcluirAgenda,
setInserirAgenda
}