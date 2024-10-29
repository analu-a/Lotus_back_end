const message = require('../Modulo/config')
const galeriaGestante = require('../Model/DAO/galeriaGestante')

const getListarFotoGaleria = async function () {

    let listarFotoJSON = {}

    let listarfoto = await galeriaGestante.selectAllFotos()

    if (listarfoto) {
        if (listarfoto.length) {
            listarFotoJSON.listarfoto = listarfoto
            listarFotoJSON.quantidade = listarfoto.length
            listarFotoJSON.status_code = 200
            return listarFotoJSON
        } else {
            return message.ERROR_NOT_FOUND
        }
    } else {
        return message.ERROR_INTERNAL_SERVER_DB
    }
}
//colocar validação de id: fazer um get do id de usuarios e fazer a validacao, vou ter que pegar de outra tabela.
const setInserirFoto = async function (dadosFoto, contentType) {
    try {

        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosGaleria = {}

            if (dadosFoto.foto_galeria == "" || dadosFoto.foto_galeria == undefined || dadosFoto.foto_galeria.length > 300 ||
                dadosFoto.titulo_galeria == "" || dadosFoto.titulo_galeria == undefined || dadosFoto.titulo_galeria.length > 60 ||
                dadosFoto.descricao_galeria == "" || dadosFoto.descricao_galeria == undefined || dadosFoto.descricao_galeria.length > 254 ||
                dadosFoto.data_foto == "" || dadosFoto.data_foto == undefined || dadosFoto.data_foto.length > 10) {

                    return message.ERROR_REQUIRED_FIELDS

            } else {
                let novaFoto
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {

    }
}

const setExcluirFoto = async function (id) {

    try {
        let id_foto = id

        if (id_foto == '' || id_foto == undefined || isNaN(id_foto)) {
            return message.ERROR_INVALID_ID
        } else {
            let validarId = await galeriaDAO.selectByIdFoto(id_foto)

            if (validarId == false) {
                return message.ERROR_NOT_FOUND
            } else {
                let dadosFoto = await galeriaDAO.deletarFoto(id)

                if (dadosFoto) {
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

//FAZER O DAO DESTA FUNÇÃO
const setEditarFoto = async function (id_foto, dadosGaleria, contentType) {

    try {
        if (String(contentType).toLowerCase() == 'application/json') {

            let resultDadosGaleria = {}
            let id_foto = id_foto

            if (id_foto == '' || id_foto == undefined || isNaN(id_foto)) {
                return message.ERROR_INVALID_ID
            } else {

                let validarId = await galeriaGestanteDAO.selectByIdFoto(id_foto)

                if (validarId == false) {
                    return message.ERROR_NOT_FOUND
                } else {
                    if (dadosGaleria == false) {
                        return message.ERROR_NOT_FOUND
                    } else {
                        if (dadosGaleria.foto_galeria == "" || dadosGaleria.foto_galeria == undefined || dadosGaleria.foto_galeria.lenght > 300 ||
                            dadosGaleria.titulo_galeria == "" || dadosGaleria.titulo_galeria == undefined || dadosGaleria.titulo_galeria.lenght > 60 ||
                            dadosGaleria.data_foto == "" || dadosGaleria.data_foto == undefined || dadosGaleria.data_foto.lenght > 10 ||
                            dadosGaleria.descricao_galeria == "" || dadosGaleria.descricao_galeria == undefined || dadosGaleria.descricao_galeria.lenght > 254
                        ) {
                            return message.ERROR_REQUIRED_FIELDS
                        } else {
                            let novaFoto = await galeriaGestante.editarFoto(dadosGaleria, id_foto)

                            if (novaFoto) {
                                resultDadosGaleria.status = message.SUCESS_EDITED_ITEM.status
                                resultDadosGaleria.status_code = message.SUCESS_EDITED_ITEM.status_code
                                resultDadosGaleria.message = message.SUCESS_EDITED_ITEM.message
                                resultDadosGaleria.conteudo = dadosGaleria

                                return resultDadosGaleria
                            } else {
                                return message.ERROR_INTERNAL_SERVER_DB
                            }
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

const getBuscarFotoId = async function (id) {

    try {
        let id_foto = id
        let conteudoJSON = {}

        if (id_foto == '' || id_foto == undefined || isNaN(id_foto)) {
            return message.ERROR_INVALID_ID
        } else {
            let dadosFoto = await galeriaGestante.selectByIdFoto(id_foto)

            if (dadosFoto) {
                if (dadosFoto.length) {
                    conteudoJSON.foto = dadosFoto
                    conteudoJSON.status_code = 200

                    return conteudoJSON
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
    getListarFotoGaleria,
    setExcluirFoto,
    setEditarFoto,
    setInserirFoto,
    getBuscarFotoId
}