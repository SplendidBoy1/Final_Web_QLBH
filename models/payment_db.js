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
    },
    find_all: async(tbName) => {
        const rs = await db.all(tbName);
        return rs;
    },
    update_balance: async(tbName, Id, balance) => {
        const rs = await db.any(`UPDATE "${schema}"."${tbName}" SET "Account_Balance" = ${balance} WHERE "AccountID" = ${Id}`)
        return rs
    },
    find_idhighest: async(tbName, type) => {
        const query = `
                SELECT MAX("${type}") AS max_id
                FROM "${schema}"."${tbName}"
            `;
        console.log(query)
        const result = await db.any(query);
        console.log(result)
        return result[0].max_id || 0;
    }
}