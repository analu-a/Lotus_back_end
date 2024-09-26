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

const controllerCadastro = require('./Controller/cadastroGestante_controller')
const controllerConteudo = require('./Controller/conteudoGestante_controller')
const { config } = require('process')
const { log } = require('console')

//************************************************************************************** 

/*************************************Cadastro gestante *******************************/

app.get('/v1/Lotus/cadastro/gestante', cors(), async function(request, response,next){

    let dadosCadastro = await controllerCadastro.getListarCadastro()

        response.status(dadosCadastro.status_code)
        response.json(dadosCadastro)
        
   
})

app.post('/v1/Lotus/cadastro/insertGestante', cors(), bodyParserJSON, async function(request, response, next){

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

app.delete('/v1/Lotus/cadastro/gestante/deletar/:id', cors(), async function(request, response, next){

    let id_gestante = request.params.id

    let deleteCadastro = await controllerCadastro.setExcluirCadastro(id_gestante)

    response.status(deleteCadastro.status_code)
    response.json(deleteCadastro)

})
/***************************************************************************************/

/************************************* Conteudo gestante *******************************/

app.get('/v1/Lotus/conteudo/gestante', cors(), async function(request, response,next){

    let dadosConteudo = await controllerConteudo.getListarConteudos()

        response.status(dadosConteudo.status_code)
        response.json(dadosConteudo)
        
   
})

app.post('/v1/Lotus/conteudo/insertConteudo', cors(), bodyParserJSON, async function(request, response, next){

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

app.delete('/v1/Lotus/conteudo/gestante/deletar/:id', cors(), async function(request, response, next){

    let id_conteudo = request.params.id

    let deleteConteudo = await controllerConteudo.setExcluirConteudo(id_conteudo)

    response.status(deleteConteudo.status_code)
    response.json(deleteConteudo)

})
/***************************************************************************************/

app.listen(8080, function(){
    console.log('API funcionando e aguardando requisições')
})

