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

module.exports = (schema) => {
    return {
        findEmail: async (tbName, type, username) => {
            console.log(type)
            console.log(username)
            const table = new pgp.helpers.TableName({table: tbName, schema: this.scheme})
            const rs = await db.any(`select * from "${schema}"."${tbName}" where "${type}" = '${username}'`)
            //const rs = await db.oneOrNone(`select * from $1 where ${type}='$2'`, [table, username])
            // console.log(type)
            // console.log("qqqqqqqqqq")
            // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
            // console.log(rs.length)
            return rs[0]
        },
        add: async (tbName, entity) => {
            
            const table = new pgp.helpers.TableName({
                table: tbName, schema: schema
            });
            let sql = pgp.helpers.insert(entity, null, table);
            const rs = await db.one(sql + `RETURNING *`);
            console.log(rs)
            return rs;
        },
        count: async (tbName) => {
            // console.log("QQQQQQ")
            // console.log("adfaasdfas")
            const rs = await db.any(`select count(*) from "${schema}"."${tbName}"`)
            // console.log(rs)
            return rs[0]
        },
        highest_id: async (tbName, type) => {
            const rs = await db.any(`select * from "${schema}"."${tbName}" order by "${type}" desc limit 1`)
            return rs[0]
        }
    }
}