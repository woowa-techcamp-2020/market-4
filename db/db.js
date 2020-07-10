const {convertPasswordWithSalt, makeSalt, convertPassword} = require('../pwCrypto.js')
const {
    CREATE_TABLE_MEMBER_QUERY,
    INSERT_MEMBER_QUERY,
    SELECT_MEMBER_QUERY
} = require('./query.js');
const MEMORY_DB = ':memory:';
const LOCAL_DB = './local.db';

// DB : MARTDB
// table name : members
// columns : userid, password, salt, email, name, phone, postcode, address1, address2, advcheck

const sqlite3 = require('sqlite3').verbose();




class DB {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, (err) => {
            if (err) {
                console.log('Could not connect to database', err)
            } else {
                console.log('[[Connected to database]]')
            }
        });
    }
    run(sql, params = []) {
        return new Promise((resolve, reject) => {
            this.db.run(sql, params, function (err) {
                if (err) {
                    console.log('Error running sql ' + sql)
                    console.log(err)
                    reject(err)
                } else {
                    resolve({ id: this.lastID })
                }
            });
        });
    }
    close() {
        this.db.close(err => {
            if (err) console.log(err);
            console.log("[[DB CLOSE]]");
        })
    }
    get(query, params) {
        return new Promise((resolve, reject) => {
            this.db.get(query, params, (err, row) => {
                if(err) rej(err);
                else res(row);
            })
        })
    }
}


class MemberDAO {
    constructor(db) {
        this.db = db;
    }

    async createTable() {
        return await this.db.run(CREATE_TABLE_MEMBER_QUERY);
    }

    // userInfo : arr
    // [userid, password, name, email, phone, postcode, address1, address2, advcheck]
    addUser(userInfo) {
        return new Promise((resolve, reject) => {
            try {
                this.db.run(INSERT_MEMBER_QUERY, userInfo).then(res => {
                    resolve(res);
                });
            } catch (error) {
                reject(error);
            }
        })
    }

    deleteTable() {
        return this.db.run("DELETE FROM members");
    }
    async runQuery(query, params) {
        const result = await this.db.get(query, params);
        return result;
        // return new Promise((res, rej) => {
        //     const result = await this.db.get(query, params);
        //     this.dao.db.get(query, (err, row) => {
        //         if(err) rej(err);
        //         else res(row);
        //     })
        // });
    }
    async getUserById(userid) {
        const escapedUserId = escape(userid);
        return this.runQuery(SELECT_MEMBER_QUERY, [escapedUserId]);
        // const SELECT_USER_QUERY = `SELECT * FROM members WHERE userid = "${userid}"`;
        // return await this.runQuery(SELECT_USER_QUERY);
    }
    async confirmUser(userid, password) {
        const result = this.getUserById(userid);
        // const query = `SELECT * from members WHERE userid="${userid}"`;
        // const result = await this.runQuery(query);
        if(!result) return false;
        
        const comparisonPwd = await convertPasswordWithSalt(password, result.salt);
        
        if(result.password === comparisonPwd) return result;
        else return false;
    }
}

function init() {
    // const db = new DB(LOCAL_DB);
    const db = new DB(MEMORY_DB);
    const memberDAO = new MemberDAO(db);
    memberDAO.createTable().then(async () => {
        const {password, salt} = await convertPassword("helloWorld");
        memberDAO.addUser(["park", password, salt, "james", "james@email.com", "123123123", "000-000", "주소1", "주소2", true]);
    });
    return {db, memberDAO};
}

module.exports = init();