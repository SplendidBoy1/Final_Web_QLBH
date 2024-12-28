const schema = process.env.DBSCHEMA;
const db = require('./db.js')(schema);

module.exports = {
    all: async () => {
        const rs = await db.all('Categories');
        return rs;
    },
    // top_30: async () => {
    //     const rs = await db.someByOrder('Categories')
    //     return rs;
    // },
}