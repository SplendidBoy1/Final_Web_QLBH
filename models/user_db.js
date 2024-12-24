const initOptions = {capSQL : true}

const pgp = require('pg-promise')(initOptions)

// import pgpInit from 'pg-promise';

const cn = {
    host: process.env.DBHOST || "localhost",
    port: process.env.DBPORT || 5433,
    database: process.env.DBNAME || 'progres',
    user: process.env.DBUSER || 'progres',
    password: process.env.DBPASSWORD || "rootUser",
}

const db = pgp(cn);

const users = []

module.exports = (schema) => {
    return {
        findEmail: async (tbName, type, data) => {
            //const table = new pgp.helpers.TableName({table: tbName, schema: this.scheme})
            const rs = await db.any(`select * from "${schema}"."${tbName}" where "${type}" = '${data}'`)
            //const rs = await db.oneOrNone(`select * from $1 where ${type}='$2'`, [table, username])
            // console.log("qqqqqqqqqq")
            // console.log(rs)
            // console.log("qqqqqqqqqq")
            // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
            return rs[0]
        },
        add: async (tbName, entity) => {
            //console.log("QQQQQQ")
            //console.log("adfaasdfas")
            console.log(tbName)
            console.log(entity)
            try{
                const table = new pgp.helpers.TableName({
                    table: tbName, schema: schema
                });
                let sql = pgp.helpers.insert(entity, null, table);
                const rs = await db.one(sql + `RETURNING *`);
                //console.log(rs)
                return rs;
            }
            catch{
                return ''
            }
        },
        count: async (tbName) => {
            const rs = await db.any(`select count(*) from "${schema}"."${tbName}"`)
            return rs[0]
        },
        highest_id: async (tbName, type) => {
            const rs = await db.any(`select * from "${schema}"."${tbName}" order by "${type}" desc limit 1`)
            return rs[0]
        },
        find_join: async(tbName_1, tbName_2, join_1, join_2, where) => {
            //console.log("qqqqqqqqqq")
            const rs = await db.any(`SELECT * FROM "${schema}"."${tbName_1}" INNER JOIN "${schema}"."${tbName_2}" ON "${schema}"."${tbName_1}"."${join_1}" = "${schema}"."${tbName_2}"."${join_2}" WHERE "${join_1}" = ${where}`);
            return rs[0]
        },
        find_all: async(tbName, type_for_order, order) => {
            // console.log("qqqqqqqqqq")
            const rs = await db.any(`SELECT * FROM "${schema}"."${tbName}" ORDER BY "${type_for_order}" ${order}`);
            return rs;
        },
        update_User: async(tbName, entity) => {
            const rs = await db.any(`UPDATE "${schema}"."${tbName}"
            SET "Username" = '${entity.username}', "Name" = '${entity.name}', "Email" = '${entity.email}', "Permission" = ${entity.permision}, "Role_ID" = ${entity.role}
            WHERE "ID" = ${entity.id};`)
            return rs;
        },
        search_string_users: async(tbName, type, string_search) => {
            console.log(string_search)
            // console.log("Stringssss")
            string_search = string_search.toLowerCase();
            const rs = await db.any(`select "ID", "Email", "Name", "Username", "Permission", "Role_ID" from "${schema}"."${tbName}" where lower("${type}") like '%${string_search}%'`)
            // console.log("Stringssss")
            console.log(rs)
            // console.log("qqqqqqqqqq")
            // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
            return rs
        },
        delete: async(tbName, type, value) => {
            console.log(tbName, type, value)

            const rs = await db.any(`DELETE FROM "${schema}"."${tbName}" WHERE "${type}" = '${value}';`)
            console.log("Stringssss")
            console.log(rs)
            return rs
        },
        update_Cat: async(tbName, entity) => {
            const rs = await db.any(`UPDATE "${schema}"."${tbName}" SET "CatName" = '${entity.name}' WHERE "CatID" = ${entity.id};`)
                return rs;
        },
        search_name_cat: async(tbName, type, name_search) => {
            console.log(tbName)
            console.log(type)
            console.log(name_search)
            name_search = name_search.toLowerCase();
            const rs = await db.any(`select * from "${schema}"."${tbName}" where lower("${type}") like '%${name_search}%'`)
            // console.log("Stringssss")
            console.log(rs)
            // console.log("qqqqqqqqqq")
            // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
            return rs
        },
        update_pro: async(tbName, entity) => {
            const rs = await db.any(`UPDATE "${schema}"."${tbName}"
                SET "ProName" = '${entity.name}', "FullDes" = '${entity.des}', "Image_Src" = '${entity.img}', "Price" = ${entity.price}, "CatID" = ${entity.catid}, "ID_User" = ${entity.userid}
                WHERE "ProID" = ${entity.id};`)
                return rs;
        },
        search_pro: async(tbName, type, name_search) => {
            console.log(tbName)
            console.log(type)
            console.log(name_search)
            name_search = name_search.toLowerCase();
            const rs = await db.any(`select * from "${schema}"."${tbName}" where lower("${type}") like '%${name_search}%'`)
            // console.log("Stringssss")
            console.log(rs)
            // console.log("qqqqqqqqqq")
            // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
            return rs
        },

        //Use for editng profile
        update_User: async (tbName, entity) => {
            const updateFields = [`"Name" = '${entity.name}'`, `"Email" = '${entity.email}'`];
            if (entity.password) {
                updateFields.push(`"Password" = '${entity.password}'`);
            }
        
            const rs = await db.any(`
                UPDATE "${schema}"."${tbName}"
                SET ${updateFields.join(', ')}
                WHERE "ID" = ${entity.id};
            `);
            return rs;
        },
    }
}
