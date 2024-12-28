const initOptions = { capSQL: true };
const pgp = require('pg-promise')(initOptions);
const cn = {
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBNAME,
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    max: 30
};

const db = pgp(cn);

module.exports = schema => {
    this.schema = schema;

    return {
        all: async tableName => {
            const rs = await db.any(`SELECT * FROM "${this.schema}"."${tableName}"`);
            return rs;
        },

        allByOrder: async (tableName, order) => {
            const table = new pgp.helpers.TableName({ table: tableName, schema: this.schema });
            const rs = await db.any(`SELECT * FROM $1 ORDER BY "${order}" DESC`, [table]);
            return rs;
        },

        someByOrder: async (tableName, order_field, order, limit) => {
            const table = new pgp.helpers.TableName({ table: tableName, schema: this.schema });
            const rs = await db.any(`SELECT * FROM $1 ORDER BY "${order_field}" ${order} LIMIT $2`, [table, limit]);
            return rs;
        },

        one: async (tableName, field, value) => {
            const table = new pgp.helpers.TableName({ table: tableName, schema: this.schema });
            const rs = await db.oneOrNone(`SELECT * FROM $1 WHERE "${field}"=$2`, [table, value]);            
            return rs;
        },

        add: async (tableName, entity) => {
            const table = new pgp.helpers.TableName({ table: tableName, schema: this.schema });
            let sql = pgp.helpers.insert(entity, null, table);
            return db.none(sql);
        },

        update: async (tableName, field, fieldValue, entity) => {
            const table = new pgp.helpers.TableName({ table: tableName, schema: this.schema });
            let sql = pgp.helpers.update(entity, null, table) + ` WHERE "${field}"=$1`;
            return db.none(sql, fieldValue);
        },

        delete: async (tableName, field, value) => {
            const table = new pgp.helpers.TableName({ table: tableName, schema: this.schema });
            return db.none(`DELETE FROM $1 WHERE "${field}"=$2`, [table, value]);
        },

        allBy: async (tableName, field, value) => {
            const table = new pgp.helpers.TableName({ table: tableName, schema: this.schema });                        
            const rs = await db.any(`SELECT * FROM $1 WHERE "${field}"=$2`, [table, value]);
            return rs;
        },
        any: async(statement) => {
            const rs = await db.any(statement);
            return rs;
        },
        find_one: async (tbName, type, data) => {
            //const table = new pgp.helpers.TableName({table: tbName, schema: this.scheme})
            const rs = await db.any(`select * from "${schema}"."${tbName}" where "${type}" = '${data}'`)
            
            return rs[0]
        },
        count: async (tbName) => {
            const rs = await db.any(`select count(*) from "${schema}"."${tbName}"`)
            return rs[0]
        },
        highest_id: async (tbName, type) => {
            const rs = await db.any(`select * from "${schema}"."${tbName}" order by "${type}" desc limit 1`)
            // console.log("IDIDID")
            // console.log(rs);
            if(rs.length == 0){
                return {ProID : 0};
            }
            return rs[0]
        },
    };
}