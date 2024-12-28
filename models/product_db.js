const schema = process.env.DBSCHEMA;
const db = require('./db')(schema);

module.exports = {
    top30Rating: async () => {
        const rs = await db.someByOrder('Products', 'ProID', 'DESC', 30);
        return rs;
    },

    one: async (table, field, id) => {
        const rs = await db.one(table, field, id);
        return rs;
    },
}