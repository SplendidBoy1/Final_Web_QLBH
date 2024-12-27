const schema = process.env.DBSCHEMA;
const db = require('./db')(schema);

module.exports = {
    all: async () => {
        const rs = await db.all('Categories');
        return rs;
    },

}
    
