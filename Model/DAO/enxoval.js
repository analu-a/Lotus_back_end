const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllEnxoval = async function () {
    try {
        let sql = 'select * from enxoval_gestante order by id_enxoval desc'
        let rsEnxoval= await prisma.$queryRawUnsafe(sql)
        return rsEnxoval

    } catch (error) {
       return false
    }
}


const inserirEnxoval = async function(dadosEnxoval) {
    try {
        let sql

        sql = `insert into enxoval_gestante(
        produtos_enxoval,
        id_gestante_usuario_enxoval   
        ) values (
        '${dadosEnxoval.produtos_enxoval}',
        '${dadosEnxoval. id_gestante_usuario_enxoval }'
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



const editarEnxoval = async function (dadosEnxoval, id_enxoval) {
    
    try {

        let sql

        sql = `update enxoval_gestante set 
        produtos_enxoval = '${dadosEnxoval.produtos_enxoval}',
       id_gestante_usuario_enxoval = '${dadosEnxoval.id_gestante_usuario_enxoval}'
        where id_enxoval = ${id_enxoval}`


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

const deletarEnxoval = async function (id_enxoval) {
    
    try {
        
        let sql
        sql = `delete from enxoval_gestante where id_enxoval = ${id_enxoval}`

        let rsEnxoval= await prisma.$executeRawUnsafe(sql)
        return rsEnxoval

    } catch (error) {
        
        return false
    }
}

const returnId = async function () {

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from enxoval_gestante limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)

        return rsId

    } catch (error) {

        return false
    }

}

const selectByIdEnxoval= async function (id) {
    try {
        let sql = `select * from enxoval_gestante where id_enxoval = ${id}`

        let rsEnxoval= await prisma.$queryRawUnsafe(sql)
        return rsEnxoval

    } catch (error) {
        return false
    }


}

module.exports = {
    selectAllEnxoval,
    inserirEnxoval,
    editarEnxoval,
    deletarEnxoval,
    returnId,
    selectByIdEnxoval
}