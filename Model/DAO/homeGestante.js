const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

const selectAllHome = async function () {
    try {
        let sql = 'select * from home_gestante order by id_home desc'
        let rsHome = await prisma.$queryRawUnsafe(sql)
        return rsHome

    } catch (error) {
        return false
    }
}

const inserirHome = async function (dadosHome) {
    try {
        let sql = `insert into home_gestante(
        meses_gravidez,
        tamanho_feto,
        flores_home,
        id_home_user
        ) values (
        '${dadosHome.meses_gravidez}',
        '${dadosHome.tamanho_feto}',
        '${dadosHome.flores_home}',
        '${dadosHome.id_home_user}' 
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

const editarHome = async function (dadosHome, id_home) {
    try {
        let sql = `update home_gestante set
         meses_gravidez = '${dadosHome.meses_gravidez}',
         tamanho_feto = '${dadosHome.tamanho_feto}',
         flores_home = '${dadosHome.flores_home}',
         id_home_user = '${dadosHome.id_home_user}'
         where id_home = ${id_home}`

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

const deletarHome = async function (id_home) {
    try {
        let sql

        sql = `delete from home_gestante where id_home = ${id_home}`

        let rsHome = await prisma.$executeRawUnsafe(sql)
        return rsHome

    } catch (error) {
        return false
    }
}

const returnId = async function () {

    try {

        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from home_gestante limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)

        return rsId

    } catch (error) {

        return false
    }

}

const selectByIdHome= async function (id) {
    try {
        let sql = `select * from home_gestante where id_home = ${id}`

        let rsHome = await prisma.$queryRawUnsafe(sql)
        return rsHome

    } catch (error) {
        return false
    }


}

module.exports={
    selectAllHome,
    inserirHome,
    editarHome,
    deletarHome,
    returnId
}