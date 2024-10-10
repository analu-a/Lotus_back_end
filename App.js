const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use((request, response, next)=> {

    response.header('Access-Control-allow-Origin', '*')

    response.header('Access-Control-allow-Methods', 'GET, POST, PUT, DELETE,OPTIONS')

    app.use(cors())

    next()

})

const bodyParserJSON = bodyParser.json()

/* **************************** Imports de arquivos e bibliotecas do projeto **********/
const { config } = require('process')
const { log } = require('console')
const controllerCadastro = require('./Controller/cadastroGestante_controller')
const controllerConteudo = require('./Controller/conteudoGestante_controller')
const controllerDoula = require('./Controller/cadastroDoula_controller')
const { request } = require('http')


//************************************************************************************** 

/*************************************Cadastro gestante *******************************/

app.get('/v1/Lotus/cadastro/gestante', cors(), async function(request, response,next){

    let dadosCadastro = await controllerCadastro.getListarCadastro()

        response.status(dadosCadastro.status_code)
        response.json(dadosCadastro)
        
   
})

app.post('/v1/Lotus/cadastro/Gestante', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type']

    let dadosBody = request.body
   

    let resultDados = await controllerCadastro.setInserirNovoCadastro(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v1/Lotus/cadastro/gestante/:id', cors(), bodyParserJSON, async function(request, response,next){
    let contentType = request.headers['content-type']

    const id_gestante = request.params.id
    let dadosBody = request.body
    let resultDados = await controllerCadastro.setEditarCadastro(id_gestante,dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v1/Lotus/cadastro/gestante/:id', cors(), async function(request, response, next){

    let id_gestante = request.params.id

    let deleteCadastro = await controllerCadastro.setExcluirCadastro(id_gestante)

    response.status(deleteCadastro.status_code)
    response.json(deleteCadastro)

})

app.post('/v1/Lotus/cadastro/gestante/login', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type']
    let dadosBody = request.body
    console.log(dadosBody);
    let dadosUsuario = await controllerCadastro.getValidarLogin(dadosBody.email_gestante, dadosBody.senha_gestante, contentType)

    response.status(dadosUsuario.status_code)
    response.json(dadosUsuario)
})
/***************************************************************************************/

/************************************* Conteudo gestante *******************************/

app.get('/v1/Lotus/conteudos/gestante', cors(), async function(request, response,next){

    let dadosConteudo = await controllerConteudo.getListarConteudos()

        response.status(dadosConteudo.status_code)
        response.json(dadosConteudo)
        
   
})

app.post('/v1/Lotus/conteudo/gestante', cors(), bodyParserJSON, async function(request, response, next){

    let contentType = request.headers['content-type']

    let dadosBody = request.body
   

    let resultDados = await controllerConteudo.setInserirConteudo(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v1/Lotus/conteudo/gestante/:id', cors(), bodyParserJSON, async function(request, response,next){
    let contentType = request.headers['content-type']

    const id_conteudo = request.params.id
    let dadosBody = request.body
    let resultDados = await controllerConteudo.setEditarConteudo(id_conteudo,dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v1/Lotus/conteudo/gestante/:id', cors(), async function(request, response, next){

    let id_conteudo = request.params.id

    let deleteConteudo = await controllerConteudo.setExcluirConteudo(id_conteudo)

    response.status(deleteConteudo.status_code)
    response.json(deleteConteudo)

})

app.get('/v1/Lotus/conteudo/gestante/:id', cors(), async function(request, response, next){
    let id_gestante = request.params.id

    let dadosConteudo= await controllerConteudo.getBuscarConteudoId(id_gestante)

    response.status(dadosConteudo.status_code)
    response.json(dadosConteudo)
})
/***************************************************************************************/


/************************************* Cadastro doula *********************************/

app.get('/v1/Lotus/cadastro/doula', cors(), async function(request,response,next){
    let dadosCadastroDoula = await controllerDoula.getListarDoula()

    response.status(dadosCadastroDoula.status_code)
    response.json(dadosCadastroDoula)
})

app.post('/v1/Lotus/cadastro/doula', cors(), bodyParserJSON, async function(request,response,next){
    let contentType = request.headers['content-type']
    let dadosBody = request.body

    let resultDados = await controllerDoula.setInserirNovaDoula(dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.put('/v1/Lotus/cadastro/doula/:id', cors(), bodyParserJSON, async function(request, response,next){
    let contentType = request.headers['content-type']

    const id_doula = request.params.id
    let dadosBody = request.body
    let resultDados = await controllerDoula.setEditarDoula(id_doula,dadosBody, contentType)

    response.status(resultDados.status_code)
    response.json(resultDados)
})

app.delete('/v1/Lotus/cadastro/doula/:id', cors(), async function(request, response, next){

    let id_doula = request.params.id

    let deleteCadastro = await controllerDoula.setExcluirDoula(id_doula)

    response.status(deleteCadastro.status_code)
    response.json(deleteCadastro)

})
/***************************************************************************************/

app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições')
})
