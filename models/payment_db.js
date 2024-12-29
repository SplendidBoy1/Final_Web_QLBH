const schema = process.env.DBSCHEMA;
const db = require('./db')(schema);

module.exports = {
    add_account: async (tbName, entity) => {
        const rs = await db.add(tbName, entity);
        return rs;
    },
}