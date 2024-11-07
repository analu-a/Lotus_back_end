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

setInserirHome = async function (dadosHome, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            
            let resultDadosHome = {}

            if (dadosHome.meses_gravidez == "" || dadosHome.meses_gravidez == undefined || isNaN(dadosHome.meses_gravidez) ||
                dadosHome.tamanho_feto == "" || dadosHome.tamanho_feto == undefined || isNaN(dadosHome.tamanho_feto) ||
                dadosHome.flores_home == "" || dadosHome.flores_home == undefined || dadosHome.flores_home.length > 300 ||
                dadosHome.id_home_user == "" || dadosHome.id_home_user == undefined || isNaN(dadosHome.id_home_user)
            ) {
                return message.ERROR_REQUIRED_FIELDS   
            } else {
            
                let novaHome = await homeDAO.inserirHome(dadosHome)

                if (novaHome) {
                    let returnId = await homeDAO.returnId()

                    resultDadosHome.status = message.SUCESS_CREATED_ITEM.status
                    resultDadosHome.status_code = message.SUCESS_CREATED_ITEM.status_code
                    resultDadosHome.message = message.SUCESS_CREATED_ITEM.message
                    resultDadosHome.home = dadosHome

                    resultDadosHome.home.id = returnId[0].id
                    return resultDadosHome
                } else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarFlorHomeId = async function (id) {
    try {
        let id_home = id
        let homeJSON = {}

        if (id_home == '' || id_home == undefined || isNaN(id_home)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosHome = await homeDAO.selectFlorIdHome(id_home)

            if (dadosHome) {
                if (dadosHome.length) {
                    homeJSON.home = dadosHome
                    homeJSON.status_code = 200

                    return homeJSON

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
    getListarHome,
    getBuscarFlorHomeId
}