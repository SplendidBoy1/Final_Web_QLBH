const { all } = require('./categoires_db.js');

const schema = process.env.DBSCHEMA;
const db = require('./db.js')(schema);

module.exports = {
    allByUser: async (table, userId) => {
        const rs = await db.allBy(table, 'ID_User', userId);
        return rs;
    },

    allBy: async (table, field, id) => {
        const rs = await db.allBy(table, field, id);
        return rs;
    },

    one: async (table, field, id) => {
        const rs = await db.one(table, field, id);
        return rs;
    },

    numberOrderPerYear: async (year, userId) => {
        const rs = await db.numberOrderPerYear(year, userId);
        return rs;
    },
    add_order: async (table, entity) => {
        // console.log("HAHAHA")
        const rs = await db.add(table, entity);
        return rs;
    },
    find_highestID: async (tbName, type) => {
        const query = `
                SELECT MAX("${type}") AS max_id
                FROM "${schema}"."${tbName}"
            `;
            console.log(query)
            const result = await db.any(query);
            console.log(result)
            return result[0].max_id || 0;
    },
    delete_cart_where: async (tbName, type, data) => {
        const rs = await db.delete(tbName, type, data);
        return rs;
    }
}