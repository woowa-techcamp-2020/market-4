const crypto = require('crypto');

/**
 * @returns {Promise<{salt:string, password:string}>}
 * @param {string} password 
 */
const convertPasswordWithSalt = (password, salt) => {
    console.log(`input ====> ${password}, ${salt}`);
    return new Promise((res, rej) => {
        crypto.pbkdf2(password, salt, 14243, 64, 'sha512', (err, key) => {
            if(err) return rej(err);
            const convertedPassword = key.toString('base64');
            res(convertedPassword);
        });
    });
}

const makeSalt = () => {
    return new Promise((res, rej) => {
        crypto.randomBytes(64, (err, buf) => {
            if(err) return rej(err);
            const salt = buf.toString('base64');
            res(salt);
        });
    });
}


const convertPassword = async password => {
    const salt = await makeSalt();
    const convertedPassword = await convertPasswordWithSalt(password, salt);
    return {password : convertedPassword, salt};
}

// convertPassword("password");
module.exports = {convertPasswordWithSalt, makeSalt, convertPassword};