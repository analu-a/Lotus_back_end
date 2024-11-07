const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllCategoriasConteudo = async function () {
    try {
        let sql = 'select * from conteudo_categoria'
        let rsCategoriaConteudo = await prisma.$queryRawUnsafe(sql)
        return rsCategoriaConteudo
    } catch (error) {
        return false
    }
}

const selectCategoriaConteudoId = async function (id) {
    
    try {
        let sql = `select * from conteudo_categoria where id_conteudos = ${id}`

        let rsCategoriaConteudo = await prisma.$queryRawUnsafe(sql)

        

        return rsCategoriaConteudo
        
    } catch (error) {

        console.log(error);
        return false
    }
}

module.exports = {
    selectAllCategoriasConteudo,
    selectCategoriaConteudoId
}