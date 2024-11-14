const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllAgenda = async function () {
    try {
        let sql = 'select * from agenda_calendario order by id_agenda_calendario desc'
        let rsAgenda = await prisma.$queryRawUnsafe(sql)
        return rsAgenda

    } catch (error) {
       return false
    }
}


const inserirAgenda = async function(dadosAgenda) {
    try {
        let sql

        sql = `insert into agenda_calenario(
        descricao_calendario,
        data_calendario,
        horario_calendario,
        usuario_calendario_id,
        id_monitoramento_categoria   
        ) values (
        '${dadosAgenda.descricao_calendario}',
        '${dadosAgenda.data_calendario}',
        '${dadosAgenda. id_monitoramento_categoria}'
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



const editarMonitoramento = async function (dadosAgenda, id_monitoramento) {
    
    try {

        let sql

        sql = `update monitoramento_gestante set 
        descricao_calendario = '${dadosAgenda.descricao_calendario}',
        data_calendario = '${dadosAgenda.data_calendario}',
         id_monitoramento_categoria = '${dadosAgenda. id_monitoramento_categoria}'
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

        let rsAgenda = await prisma.$executeRawUnsafe(sql)
        return rsAgenda

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

        let rsAgenda = await prisma.$queryRawUnsafe(sql)
        return rsAgenda

    } catch (error) {
        return false
    }


}

