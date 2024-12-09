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
        findEmail: async (tbName, type, username) => {
            console.log(type)
            console.log(username)
            const table = new pgp.helpers.TableName({table: tbName, schema: this.scheme})
            const rs = await db.any(`select * from "${schema}"."${tbName}" where "${type}" = '${username}'`)
            //const rs = await db.oneOrNone(`select * from $1 where ${type}='$2'`, [table, username])
            // console.log(type)
            // console.log("qqqqqqqqqq")
            // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
            return rs[0]
        },
        add: async (tbName, entity) => {
            console.log("QQQQQQ")
            console.log("adfaasdfas")
            const table = new pgp.helpers.TableName({
                table: tbName, schema: schema
            });
            let sql = pgp.helpers.insert(entity, null, table);
            const rs = await db.one(sql + `RETURNING *`);
            console.log(rs)
            return rs;
        },
        count: async (tbName) => {
            const rs = await db.any(`select count(*) from "${schema}"."${tbName}"`)
            return rs[0]
        }
    }
}

//console.log(cn)

// const db = pgp(cn);

// export function sbSQL(schema){
//     this.schema = schema
//     return {
//         all: async tbName => {
//             const rs = await db.any(`SELECT * FROM "${this.schema}"."${tbName}"`);
//             return rs;
//         },
//         one: async (tbName, idField, idValue) => {
//             const table = new pgp.helpers.TableName({
//                 table: tbName, schema: this.schema
//             });
//             const rs = await db.oneOrNone(`SELECT * FORM $1 WHERE "${idField}"=$2`, [table, idValue]);
//             return rs;
//         },
//         add: async (tbName, entity) => {
//             const table = new pgp.helpers.TableName({
//                 table: tbName, schema: this.schema
//             });
//             let sql = pgp.helpers.insert(entity, null, table);
//             const rs = await db.one(sql + `RETURNING *`);
//             return rs;
//         },
//         top_num: async(tbName, number_top, type) => {
//             const rs = await db.any(`SELECT * FROM "${this.schema}"."${tbName}" WHERE ${type} IS NOT NULL ORDER BY ${type} DESC LIMIT ${number_top}`);
//             return rs
//         },
//         top_num_join: async(tbName_1, tbName_2, number_top, primary_key, type) => {
//             console.log(type)
//             console.log("qqqqqqqqqq")
//             const rs = await db.any(`SELECT * FROM "${this.schema}"."${tbName_1}" INNER JOIN "${this.schema}"."${tbName_2}" ON "${this.schema}"."${tbName_2}".${primary_key} = "${this.schema}"."${tbName_1}".${primary_key} WHERE "${this.schema}"."${tbName_2}".${type} IS NOT NULL ORDER BY "${this.schema}"."${tbName_2}".${type} ASC LIMIT ${number_top}`);
//             return rs
//         },
//         count: async tbName => {
//             // console.log(type)
//             // console.log("qqqqqqqqqq")
//             const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
//             return rs
//         },
//         delete_and_update_rank:  async (tbName, data_match, type, compare_data) => {
//             const get_var = await db.any(`SELECT * from "${this.schema}"."${tbName}" where "${this.schema}"."${tbName}".${type} = '${data_match}'`)
//             console.log(get_var)
//             const rs = await db.any(`delete from "${this.schema}"."${tbName}" where "${this.schema}"."${tbName}".${type} = '${data_match}'`)
//             const rss = await db.any(`UPDATE "${this.schema}"."${tbName}" SET movie_rank = movie_rank - 1 WHERE "${this.schema}"."${tbName}".movie_rank > ${get_var[0].movie_rank};`)
//             // console.log(type)
//             // console.log("qqqqqqqqqq")
//             // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
//             return rs
//         }
//     }
// }

// const df = function(schema) {
//     //this.schema = schema;
//     return {
//         async addOne(tbName){

//         }
//         ,
//         async all(tbName){
//             const rs = await db.any(`SELECT * FROM "${schema}"."${tbName}"`);
//             return rs;
//         },
//         // async one(tbName, idField, idValue){
//         //     const table = new pgp.helpers.TableName({
//         //         table: tbName, schema: this.schema
//         //     });
//         //     const rs = await db.oneOrNone(`SELECT * FORM $1 WHERE "${idField}"=$2`, [table, idValue]);
//         //     return rs;
//         // },
//         async add(tbName, entity){
//             const table = new pgp.helpers.TableName({
//                 table: tbName, schema: schema
//             });
//             let sql = pgp.helpers.insert(entity, null, table);
//             const rs = await db.one(sql + `RETURNING *`);
//             return rs;
//         },
//         async top_num(tbName, number_top, type){
//             const rs = await db.any(`SELECT * FROM "${schema}"."${tbName}" WHERE ${type} IS NOT NULL ORDER BY ${type} DESC LIMIT ${number_top}`);
//             return rs
//         },
//         async top_num_join(tbName_1, tbName_2, number_top, primary_key, type){
//             console.log(type)
//             console.log("qqqqqqqqqq")
//             const rs = await db.any(`SELECT * FROM "${schema}"."${tbName_1}" INNER JOIN "${schema}"."${tbName_2}" ON "${schema}"."${tbName_2}".${primary_key} = "${schema}"."${tbName_1}".${primary_key} WHERE "${schema}"."${tbName_2}".${type} IS NOT NULL ORDER BY "${schema}"."${tbName_2}".${type} ASC LIMIT ${number_top}`);
//             return rs
//         },
//         async  count (tbName){
//             // console.log(type)
//             // console.log("qqqqqqqqqq")
//             const rs = await db.any(`SELECT count(*) from "${schema}"."${tbName}"`)
//             return rs
//         },
//         async delete_and_update_rank(tbName, data_match, type, compare_data){
//             const get_var = await db.any(`SELECT * from "${schema}"."${tbName}" where "${schema}"."${tbName}".${type} = '${data_match}'`)
//             console.log(get_var)
//             const rs = await db.any(`delete from "${schema}"."${tbName}" where "${schema}"."${tbName}".${type} = '${data_match}'`)
//             const rss = await db.any(`UPDATE "${schema}"."${tbName}" SET movie_rank = movie_rank - 1 WHERE "${schema}"."${tbName}".movie_rank > ${get_var[0].movie_rank};`)
//             // console.log(type)
//             // console.log("qqqqqqqqqq")
//             // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
//             return rs
//         },
//         async search_string(tbName, string_search, type){
//             // console.log(get_var)
//             string_search = string_search.toLowerCase();
//             const rs = await db.any(`select * from "${schema}"."${tbName}" where lower(${type}) like '%${string_search}%'`)
//             // console.log(type)
//             // console.log("qqqqqqqqqq")
//             // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
//             return rs
//         },
//     }
    
    // one: async (tbName, idField, idValue) => {
    //     const table = new pgp.helpers.TableName({
    //         table: tbName, schema: this.schema
    //     });
    //     const rs = await db.oneOrNone(`SELECT * FORM $1 WHERE "${idField}"=$2`, [table, idValue]);
    //     return rs;
    // },
    // add: async (tbName, entity) => {
    //     const table = new pgp.helpers.TableName({
    //         table: tbName, schema: this.schema
    //     });
    //     let sql = pgp.helpers.insert(entity, null, table);
    //     const rs = await db.one(sql + `RETURNING *`);
    //     return rs;
    // },
    // top_num: async(tbName, number_top, type) => {
    //     const rs = await db.any(`SELECT * FROM "${this.schema}"."${tbName}" WHERE ${type} IS NOT NULL ORDER BY ${type} DESC LIMIT ${number_top}`);
    //     return rs
    // },
    // top_num_join: async(tbName_1, tbName_2, number_top, primary_key, type) => {
    //     console.log(type)
    //     console.log("qqqqqqqqqq")
    //     const rs = await db.any(`SELECT * FROM "${this.schema}"."${tbName_1}" INNER JOIN "${this.schema}"."${tbName_2}" ON "${this.schema}"."${tbName_2}".${primary_key} = "${this.schema}"."${tbName_1}".${primary_key} WHERE "${this.schema}"."${tbName_2}".${type} IS NOT NULL ORDER BY "${this.schema}"."${tbName_2}".${type} ASC LIMIT ${number_top}`);
    //     return rs
    // },
    // count: async tbName => {
    //     // console.log(type)
    //     // console.log("qqqqqqqqqq")
    //     const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
    //     return rs
    // },
    // delete_and_update_rank:  async (tbName, data_match, type, compare_data) => {
    //     const get_var = await db.any(`SELECT * from "${this.schema}"."${tbName}" where "${this.schema}"."${tbName}".${type} = '${data_match}'`)
    //     console.log(get_var)
    //     const rs = await db.any(`delete from "${this.schema}"."${tbName}" where "${this.schema}"."${tbName}".${type} = '${data_match}'`)
    //     const rss = await db.any(`UPDATE "${this.schema}"."${tbName}" SET movie_rank = movie_rank - 1 WHERE "${this.schema}"."${tbName}".movie_rank > ${get_var[0].movie_rank};`)
    //     // console.log(type)
    //     // console.log("qqqqqqqqqq")
    //     // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
    //     return rs
    // }
//}

//let dbaaa = df(process.env.DBSCHEMA)

// export default df
//console.log(dbaaa)