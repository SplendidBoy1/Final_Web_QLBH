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

    numberOrderPerYear: async (year) => {
        const rs = await db.numberOrderPerYear(year);
        return rs;
    }
}