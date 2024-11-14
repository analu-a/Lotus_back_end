const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllCategoriaMonitoramento = async function () {
    try {
        let sql = 'select * from categoria_monitoramento order by id_categoria_monitoramento  desc'
        let  rsCategoriaMoni = await prisma.$queryRawUnsafe(sql)
        return rsCategoriaMoni

    } catch (error) {
       return false
    }
}


const inserirCategoriaMonitoramento = async function(dadosMonitoramento) {
    try {
        let sql

        sql = `insert into categoria_monitoramento(
        titulo_categoria_monitoramento      
        ) values (
        '${dadosMonitoramento.titulo_categoria_monitoramento}'
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



const editarCategoriaMonitoramento = async function (dadosMonitoramento, id_categoria_monitoramento) {
    
    try {

        let sql

        sql = `update categoria_monitoramento set 
        titulo_categoria_monitoramento = '${dadosMonitoramento.titulo_categoria_monitoramento}'
        where id_categoria_monitoramento = ${id_categoria_monitoramento}`

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

const deletarCategoriaMonitoramento = async function (id_categoria_monitoramento) {
    
    try {
        
        let sql
        sql = `delete from categoria_monitoramento where id_categoria_monitoramento = ${id_categoria_monitoramento}`

        let rsCategoriaMoni = await prisma.$executeRawUnsafe(sql)
        return rsCategoriaMoni

    } catch (error) {
        
        return false
    }
}

const returnId = async function () {

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from categoria_monitoramento limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)

        return rsId

    } catch (error) {

        return false
    }

}

const selectByIdCategoriaMonitoramento = async function (id) {
    try {
        let sql = `select * from categoria_monitoramento where id_categoria_monitoramento = ${id}`

        let rsCategoriaMoni = await prisma.$queryRawUnsafe(sql)
        return rsCategoriaMoni

    } catch (error) {
        return false
    }


}

module.exports={
    selectAllCategoriaMonitoramento,
    inserirCategoriaMonitoramento,
    editarCategoriaMonitoramento,
    deletarCategoriaMonitoramento,
    returnId,
    selectByIdCategoriaMonitoramento
}

