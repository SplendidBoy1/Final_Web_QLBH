const schema = process.env.DBSCHEMA;
const db = require('./db')(schema);

module.exports = {
    add_account: async (tbName, entity) => {
        const rs = await db.add(tbName, entity);
        return rs;
    },
    find_acc: async (tbName, type, data) => {
        const rs = await db.find_one(tbName, type, data);
        return rs;
    }
}