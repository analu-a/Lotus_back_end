const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllMonitoramento = async function () {
    try {
        let sql = 'select * from monitoramento_gestante order by id_monitoramento desc'
        let rsMonitoramento = await prisma.$queryRawUnsafe(sql)
        return rsMonitoramento

    } catch (error) {
       return false
    }
}

const selectCategoriaEMonitoramento = async function () {

    try {
        let sql = 'select * from monitoramento_categoria'
        
        let rsMonitoramento = await prisma.$queryRawUnsafe(sql)
        return rsMonitoramento

    } catch (error) {
        return false
    }
}


const inserirMonitoramento = async function(dadosMonitoramento) {
    try {
        let sql

        sql = `insert into monitoramento_gestante(
        titulo_monitoramento,
        icone_monitoramento,
        id_monitoramento_categoria   
        ) values (
        '${dadosMonitoramento.titulo_monitoramento}',
        '${dadosMonitoramento.icone_monitoramento}',
        '${dadosMonitoramento. id_monitoramento_categoria}'
        )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}



const editarMonitoramento = async function (dadosMonitoramento, id_monitoramento) {
    
    try {

        let sql

        sql = `update monitoramento_gestante set 
        titulo_monitoramento = '${dadosMonitoramento.titulo_monitoramento}',
        icone_monitoramento = '${dadosMonitoramento.icone_monitoramento}',
         id_monitoramento_categoria = '${dadosMonitoramento. id_monitoramento_categoria}'
        where id_monitoramento = ${id_monitoramento}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

const deletarMonitoramento = async function (id_monitoramento) {
    
    try {
        
        let sql
        sql = `delete from monitoramento_gestante where id_monitoramento = ${id_monitoramento}`

        let rsMonitoramento = await prisma.$executeRawUnsafe(sql)
        return rsMonitoramento

    } catch (error) {
        
        return false
    }
}

const returnId = async function () {

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from monitoramento_gestante limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)

        return rsId

    } catch (error) {

        return false
    }

}

const selectByIdMonitoramento = async function (id) {
    try {
        let sql = `select * from monitoramento_gestante where id_monitoramento = ${id}`

        let rsMonitoramento = await prisma.$queryRawUnsafe(sql)
        return rsMonitoramento

    } catch (error) {
        return false
    }


}

const selectByIdMonitoramentoECtegoria = async function (id) {
    try {
        let sql = `select * from monitoramento_categoria where id_monitoramento = ${id}`

        let rsMonitoramento = await prisma.$queryRawUnsafe(sql)
        return rsMonitoramento

    } catch (error) {
        return false
    }


}

module.exports = {
    selectAllMonitoramento,
    inserirMonitoramento,
    editarMonitoramento,
    deletarMonitoramento,
    returnId,
    selectByIdMonitoramento,
    selectCategoriaEMonitoramento,
    selectByIdMonitoramentoECtegoria
}