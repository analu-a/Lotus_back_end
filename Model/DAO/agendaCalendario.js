const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllAgenda = async function () {
    try {
        let sql = 'select * from data_horario_agenda order by id_agenda_calendario desc'
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
        usuario_calendario_id 
        ) values (
        '${dadosAgenda.descricao_calendario}',
        '${dadosAgenda.data_calendario}',
        '${dadosAgenda.horario_calendario}',
        '${dadosAgenda.usuario_calendario_id}'
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



const editarAgenda = async function (dadosAgenda, id_agenda_calendario) {
    
    try {

        let sql

        sql = `update agenda_calendario set 
        descricao_calendario = '${dadosAgenda.descricao_calendario}',
        data_calendario = '${dadosAgenda.data_calendario}',
        horario_calendario = '${dadosAgenda.horario_calendario}',
        usuario_calendario_id = '${dadosAgenda. id_agenda_calendario}'
        where id_agenda_calendario = ${id_agenda_calendario}`

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

const deletarAgenda = async function (id_agenda_calendario) {
    
    try {
        
        let sql
        sql = `delete from agenda_calendario where id_agenda_calendario = ${id_agenda_calendario}`

        let rsAgenda = await prisma.$executeRawUnsafe(sql)
        return rsAgenda

    } catch (error) {
        
        return false
    }
}

const returnId = async function () {

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from agenda_calendario limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)

        return rsId

    } catch (error) {

        return false
    }

}

const selectByIdAgenda = async function (id) {
    try {
        let sql = `select * from data_horario_agenda where id_agenda_calendario = ${id}`

        let rsAgenda = await prisma.$queryRawUnsafe(sql)
        return rsAgenda

    } catch (error) {
        return false
    }


}

module.exports = {
    selectAllAgenda,
    selectByIdAgenda,
    inserirAgenda,
    editarAgenda,
    deletarAgenda,
    returnId
}