const message = require('../Modulo/config')
const homeDAO = require('../Model/DAO/homeGestante')

const getListarHome = async function () {
    let homeJSON = {}

    let homeDados = await homeDAO.selectAllHome()

    if (homeDados) {
        if (homeDados.length) {
            homeJSON.homeDados = homeDados
            homeJSON.quantidade = homeDados.length
            homeJSON.status_code = 200
            return homeJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
     return message.ERROR_INTERNAL_SERVER_DB   
    }
}