const MEMORY_DB = ':memory:';
const LOCAL_DB = './local.db';

// DB : MARTDB
// table name : members
// columns : userid, password, email, name, phone, postcode, address1, address2, advcheck

const sqlite3 = require('sqlite3').verbose();

const CREATE_TABLE_MEMBER_QUERY = `
    CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY autoincrement,
        userid TEXT UNIQUE,
        password Text NOT NULL, 
        name Text NOT NULL, 
        email Text, 
        phone Text, 
        postcode Text, 
        address1 Text, 
        address2 Text, 
        advcheck Text)`;

const INSERT_MEMBER_QUERY = `INSERT INTO members(userid, password, name, email, phone, postcode, address1, address2, advcheck) values(?, ?, ?, ?, ?, ?, ?, ?, ?)`;

class AppDAO {
    constructor(dbFilePath) {
        this.db = new sqlite3.Database(dbFilePath, sqlite3.OPEN_READWRITE, (err) => {
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
}


class MemberRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async createTable() {
        const CREATE_TABLE_MEMBER_QUERY = `
            CREATE TABLE IF NOT EXISTS members (
                id INTEGER PRIMARY KEY autoincrement,
                userid TEXT UNIQUE,
                password Text NOT NULL, 
                name Text NOT NULL, 
                email Text, 
                phone Text, 
                postcode Text, 
                address1 Text, 
                address2 Text, 
                advcheck Text)`;
        return await this.dao.run(CREATE_TABLE_MEMBER_QUERY);
    }

    // userInfo : arr
    // [userid, password, name, email, phone, postcode, address1, address2, advcheck]
    addUser(userInfo) {
        const INSERT_MEMBER_QUERY = `INSERT INTO members(userid, password, name, email, phone, postcode, address1, address2, advcheck) values(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        return new Promise((resolve, reject) => {
            try {
                this.dao.run(INSERT_MEMBER_QUERY, userInfo).then(res => {
                    console.log("[addUser] : " + res);
                    // return res;
                    resolve(res);
                });
            } catch (error) {
                reject(error);
            }
        }) 
        // return this.dao.run(INSERT_MEMBER_QUERY, userInfo).then(res => {
        //     console.log("[addUser] : " + res);
        //     return res;
        // });
    }

    deleteTable() {
        return this.dao.run("DELETE FROM members");
    }
    runQuery(query) {
        return new Promise((res, rej) => {
            this.dao.db.get(query, (err, row) => {
                if(err) rej(err);
                else res(row);
            })
        });
    }
    async getUserById(userid) {
        const SELECT_USER_QUERY = `SELECT * FROM members WHERE userid = "${userid}"`;
        return await this.runQuery(SELECT_USER_QUERY);
    }
    async confirmUser(userid, password) {
        const query = `SELECT * from members WHERE userid="${userid}" AND password="${password}"`;
        const result = await this.runQuery(query);
        return result;
    }
}

function init() {
    const db = new AppDAO(MEMORY_DB);
    const memberDAO = new MemberRepository(db);
    memberDAO.createTable().then(() => {
        memberDAO.addUser(["abc", "password", "james", "james@email.com", "123123123", "000-000", "주소1", "주소2", true]);
    });
    // userid, password, name, email, phone, postcode, address1, address2, advcheck
    // 기본 데이터 하나 추가 
    return {db, memberDAO};
}
const r = init();
module.exports = r;