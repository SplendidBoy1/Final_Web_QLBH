const schema = process.env.DBSCHEMA;
const db = require('./db')(schema);

module.exports = {
    top30Rating: async () => {
        const rs = await db.someByOrder('Products', 'Rating', 'DESC', 30);
        return rs;
    },
}