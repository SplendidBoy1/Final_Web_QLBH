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
            const table = new pgp.helpers.TableName({
                table: tbName, schema: schema
            });
            let sql = pgp.helpers.insert(entity, null, table);
            const rs = await db.one(sql + `RETURNING *`);
            //console.log(rs)
            return rs;
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
        }
    }
}
