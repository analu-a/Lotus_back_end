const { PrismaClient } = require('@prisma/client')



const prisma = new PrismaClient()

const selectAllFotos = async function () {
    try {
        let sql = 'select * from galeria_gestante order by id_galeria_gestante desc'

        let rsCadastroFotos = await prisma.$queryRawUnsafe(sql)
        return rsCadastroFotos
    } catch (error) {
        console.log(error)

        return false
    }
}

const inserirFoto = async function (dadosFoto) {
    try{
        let sql

        sql = `insert into galeria_gestante(
        foto_galeria,
        titulo_galeria,
        descricao_galeria,
        data_foto,
        id_gestante_usuario_galeria
        ) values (
         '${dadosFoto.foto_galeria}',
         '${dadosFoto.titulo_galeria}',
         '${dadosFoto.descricao_galeria}',
         '${dadosFoto.data_foto}',
         '${dadosFoto.id_gestante_usuario_galeria}'
         )`

         let result = await prisma.$executeRawUnsafe(sql)

         if(result) {
            return true
         } else {
            return false
         }
    } catch (error) {
        false
    }
}

const deletarFoto = async function(id_foto){
    try {
        let sql 
       
        sql = `delete from galeria_gestante where id_galeria_gestante = ${id_foto}`

        let rsFoto = await prisma.$queryRawUnsafe(sql)
        return rsFoto
    } catch (error) {
   
        return false
    }
}

const editarFoto = async function(dadosFoto, id_galeria_gestante) {
    try {
        let sql 

        sql = `update galeria_gestante set
        foto_galeria = '${dadosFoto.foto_galeria}',
        titulo_galeria = '${dadosFoto.titulo_galeria}',
        descricao_galeria = '${dadosFoto.descricao_galeria}',
        data_foto = '${dadosFoto.data_foto}',
        id_gestante_usuario_galeria = '${dadosFoto.id_gestante_usuario_galeria}'
        where id_galeria_gestante = ${id_galeria_gestante}`

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

const returnId = async function(){
    try{
        let sql = 'select CAST(last_insert_id() AS DECIMAL) as id from galeria_gestante limit 1'
        let rsId = await prisma.$queryRawUnsafe(sql)
console.log(rsId);
        return rsId
    }catch(error) {
        console.log(error);
        return false
    }
}

const selectByIdFoto = async function(id) {
    try {
        let sql = `select * from galeria_gestante where id_galeria_gestante = ${id}`

        let rsFoto = await prisma.$queryRawUnsafe(sql)
        return rsFoto
    }catch (error) {
        return false
    }
}

module.exports = {
    selectAllFotos,
    selectByIdFoto,
    returnId,
    deletarFoto,
   inserirFoto,
   editarFoto
}
