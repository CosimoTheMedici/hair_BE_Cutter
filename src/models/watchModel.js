var db = require('../configs/db.config');

class Watch {

constructor(user) {
this.password = user.password;
this.uuid = user.uuid;
this.email = user.email;
this.user_category = user.user_category;
this.business_id = user.business_id;
this.status = user.status;
}

static async createCookie(data) {
    try {
        const result = await db.query('INSERT INTO watchmania_cookies SET ?', data);
        return result;
    } catch (error) {
        throw error;
    }
}
static async fetchProducts(callBack) {
    // try {
    //     const result = await db.query(`SELECT * FROM watchmaniaProducts`);
    //     console.log("req", result);

    //     return result;
    // } catch (error) {
    //     throw error;
    // }

    db.query(`SELECT * FROM watchmaniaProducts`,
    (error,results,field) => {
        if(error){
            return callBack(error);
        }
        return callBack(null, results)
    }

    )
}
static async likeProduct(data) {
    try {
        const result = await db.query('INSERT INTO watchmania_cookies SET ?', data);
        return result;
    } catch (error) {
        throw error;
    }
}
static async addToCart(data) {
    try {
        const result = await db.query('INSERT INTO watchmania_cookies SET ?', data);
        return result;
    } catch (error) {
        throw error;
    }
}
static async fetchCart(data) {
    try {
        const result = await db.query('SELECT FROM watchmania_cookies WHERE cookieValue = ?', data);
        return result;
    } catch (error) {
        throw error;
    }
}

static async getByEmail1(email) {
    try {
        const columnList = 'id, unit_property_name, unit_property_id';
        const conditionList = [1, id.join(',')];
        //You can also pass the array of ids as a single string joined by a comma, like this:
        const query = `SELECT ${columnList} FROM units WHERE unit_property_name = ? and unit_property_id IN (${id})`;

        const result = await db.query(query, conditionList);
        return result;
    } catch (error) {
        throw error;
    }
}
static async getByEmail(email) {
    try {
        const [result] = await db.query('SELECT * FROM app_users WHERE email = ?', [email]);
        return result;
    } catch (error) {
        throw error;
    }
}
}

module.exports = Watch;




