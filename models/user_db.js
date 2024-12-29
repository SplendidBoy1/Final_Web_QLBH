const pgp = require('pg-promise')({
    capSQL: true, // Enable Capitalized SQL
});

const cn = {
    host: process.env.DBHOST || "localhost",
    port: process.env.DBPORT || 5432,
    database: process.env.DBNAME || "postgres",
    user: process.env.DBUSER || "postgres",
    password: process.env.DBPASSWORD || "password",
};

const db = pgp(cn);

module.exports = (schema) => {
    const getTableName = (table) => `"${schema}"."${table}"`; // Generates schema-qualified table name

    return {
        findEmail: async (tbName, type, data) => {
            const query = `SELECT * FROM ${getTableName(tbName)} WHERE "${type}" = $1`;
            // console.log(query)
            return await db.oneOrNone(query, [data]);
        },

        add: async (tbName, entity) => {
            const table = new pgp.helpers.TableName({ table: tbName, schema: this.schema });
            const query = pgp.helpers.insert(entity, null, table) + ` RETURNING *`;
            return await db.one(query);
        },

        count: async (tbName) => {
            const query = `SELECT COUNT(*) FROM ${getTableName(tbName)}`;
            const result = await db.one(query);
            return parseInt(result.count, 10);
        },

        highest_id: async (tbName, type) => {
            const query = `
                SELECT MAX("${type}") AS max_id
                FROM ${getTableName(tbName)}
            `;
            console.log(query)
            const result = await db.one(query);
            console.log(result)
            return result.max_id || 0;
        },
        find_join: async (tbName_1, tbName_2, join_1, join_2, where) => {
            //console.log("qqqqqqqqqq")
            const rs = await db.any(`SELECT * FROM "${schema}"."${tbName_1}" INNER JOIN "${schema}"."${tbName_2}" ON "${schema}"."${tbName_1}"."${join_1}" = "${schema}"."${tbName_2}"."${join_2}" WHERE "${join_1}" = ${where}`);
            return rs[0]
        },

        find_all: async (tbName, type_for_order, order) => {
            const query = `SELECT * FROM ${getTableName(tbName)} ORDER BY "${type_for_order}" ${order}`;
            return await db.any(query);
        },
        findAll_with_where: async (tbName, type, data) => {
            const rs = await db.any(`select * from "${schema}"."${tbName}" where "${type}" = '${data}'`)
            return rs;
        },

        update_User: async (tbName, entity) => {
            const updateFields = [
                `"Username" = $[username]`,
                `"Name" = $[name]`,
                `"Email" = $[email]`,
                `"Permission" = $[permission]`,
                `"Role_ID" = $[role]`,
            ];
            const query = `
                UPDATE ${getTableName(tbName)}
                SET ${updateFields.join(", ")}
                WHERE "ID" = $[id]
            `;
            return await db.none(query, entity);
        },
        search_string_users: async (tbName, type, string_search) => {
            // console.log(string_search)
            // console.log("Stringssss")
            string_search = string_search.toLowerCase();
            const rs = await db.any(`select "ID", "Email", "Name", "Username", "Permission", "Role_ID" from "${schema}"."${tbName}" where lower("${type}") like '%${string_search}%'`)
            // console.log("Stringssss")
            // console.log(rs)
            // console.log("qqqqqqqqqq")
            // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
            return rs
        },
        delete: async (tbName, type, value) => {
            // console.log(tbName, type, value)

            const rs = await db.any(`DELETE FROM "${schema}"."${tbName}" WHERE "${type}" = '${value}';`)
            // console.log("Stringssss")
            // console.log(rs)
            return rs
        },
        update_Cat: async (tbName, entity) => {
            const rs = await db.any(`UPDATE "${schema}"."${tbName}" SET "CatName" = '${entity.name}' WHERE "CatID" = ${entity.id};`)
            return rs;
        },
        search_name_cat: async (tbName, type, name_search) => {
            // console.log(tbName)
            // console.log(type)
            // console.log(name_search)
            name_search = name_search.toLowerCase();
            const rs = await db.any(`select * from "${schema}"."${tbName}" where lower("${type}") like '%${name_search}%'`)
            // console.log("Stringssss")
            console.log(rs)
            // console.log("qqqqqqqqqq")
            // const rs = await db.any(`SELECT count(*) from "${this.schema}"."${tbName}"`)
            return rs
        },
        update_pro: async (tbName, entity) => {
            const rs = await db.any(`UPDATE "${schema}"."${tbName}"
                SET "ProName" = '${entity.name}', "FullDes" = '${entity.des}', "Image_Src" = '${entity.img}', "Price" = ${entity.price}, "CatID" = ${entity.catid}, "ID_User" = ${entity.userid}
                WHERE "ProID" = ${entity.id};`)
            return rs;
        },
        search_pro: async (tbName, type, search) => {
            const query = `
                SELECT * FROM ${getTableName(tbName)}
                WHERE LOWER("${type}") LIKE $1
            `;
            return await db.any(query, [`%${search.toLowerCase()}%`]);
        },

        //Use for editng profile
        update_User: async (tbName, entity) => {
            const updateFields = [`"Name" = '${entity.name}'`, `"Email" = '${entity.email}'`];
            if (entity.password) {
                updateFields.push(`"Password" = '${entity.password}'`);
            }

            const rs = await db.any(`
                        UPDATE "${schema}"."${tbName}"
                        SET ${updateFields.join(', ')}
                        WHERE "ID" = ${entity.id};
                    `);
            return rs;
        },

        //Use for products listing
        find_products: async (filter = {}, search = "", page = 1, limit = 10) => {
            const offset = (page - 1) * limit;
            const whereClause = [];

            if (filter.category) {
                whereClause.push(`"CatID" = $[category]`);
            }
            if (search) {
                whereClause.push(
                    `LOWER("ProName") LIKE $[search] OR LOWER("FullDes") LIKE $[search]`
                );
            }

            const whereString = whereClause.length ? `WHERE ${whereClause.join(" AND ")}` : "";
            const productsTable = getTableName("Products");

            const query = `
                SELECT * FROM ${productsTable}
                ${whereString}
                ORDER BY "ProID" ASC
                LIMIT $[limit] OFFSET $[offset]
            `;
            const countQuery = `
                SELECT COUNT(*) AS total
                FROM ${productsTable}
                ${whereString}
            `;

            const params = {
                category: filter.category,
                search: `%${search.toLowerCase()}%`,
                limit,
                offset,
            };

            const products = await db.any(query, params);
            const total = await db.one(countQuery, params);
            return { products, total: parseInt(total.total, 10) };
        },

        find_all_categories: async () => {
            const query = `SELECT * FROM ${getTableName("Categories")} ORDER BY "CatName" ASC`;
            return await db.any(query);
        },

        find_product_by_id: async (productId) => {
            const query = `
                SELECT * FROM ${getTableName("Products")}
                WHERE "ProID" = $1
            `;
            return await db.oneOrNone(query, [productId]);
        },
        find_products_detail: async (filter = {}, search = "", page = 1, limit = 10) => {
            const offset = (page - 1) * limit;
            const whereClause = [];

            if (filter.category) {
                whereClause.push(`"CatID" = ${filter.category}`);
            }

            const whereString = whereClause.length > 0 ? `WHERE ${whereClause.join(" AND ")}` : "";
            const query = `
                SELECT * FROM "${schema}"."Products"
                ${whereString}
                ORDER BY "ProID" ASC
                LIMIT ${limit} OFFSET ${offset}
            `;
            return await db.any(query);
        },

        find_category_by_id: async (categoryId) => {
            const query = `
                SELECT * FROM "${schema}"."Categories"
                WHERE "CatID" = $1
            `;
            return await db.oneOrNone(query, [categoryId]);
        },

        addToCart: async (productId, userId, quantity) => {
            const query = `
                INSERT INTO "${schema}"."Cart" ("ProID", "ID_User", "Quantity")
                VALUES ($1, $2, $3)
                RETURNING *
            `;
            return await db.one(query, [productId, userId, quantity]);
        },        

        updateQuantityCart: async (productId, userId, quantity) => {
            const query = `
                UPDATE "${schema}"."Cart"
                SET "Quantity" = $1
                WHERE "ProID" = $2 AND "ID_User" = $3
                RETURNING *
            `;
            return await db.one(query, [quantity, productId, userId]);
        },

        takeCart: async (userId) => {
            const query = `
                SELECT * FROM "${schema}"."Cart"
                WHERE "ID_User" = $1
            `;
            return await db.any(query, [userId]);
        }
    };
};
