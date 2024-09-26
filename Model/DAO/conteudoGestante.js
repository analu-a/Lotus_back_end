const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllConteudos = async function () {
    try {
        let sql = 'select * from conteudos_gestante order by id_conteudos desc'

        let rsConteudo = await prisma.$queryRawUnsafe(sql)
        return rsConteudo

    } catch (error) {

        return false
    }
}

module.exports={
    selectAllConteudos
}