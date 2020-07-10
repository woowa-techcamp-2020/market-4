
const CREATE_TABLE_MEMBER_QUERY = `
CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY autoincrement,
    userid TEXT UNIQUE,
    password Text NOT NULL, 
    salt Text NOT NULL,
    name Text NOT NULL, 
    email Text, 
    phone Text, 
    postcode Text, 
    address1 Text, 
    address2 Text, 
    advcheck Text)`;

const INSERT_MEMBER_QUERY = `INSERT INTO members(userid, password, salt, name, email, phone, postcode, address1, address2, advcheck) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
const SELECT_MEMBER_QUERY = `SELECT * FROM members WHERE userid =`;

function getSelectMemberQuery (userid) {
    return SELECT_MEMBER_QUERY + `"${userid}";`;
}

module.exports = {
    CREATE_TABLE_MEMBER_QUERY,
    INSERT_MEMBER_QUERY,
    getSelectMemberQuery
}