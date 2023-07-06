const axios = require('axios');

async function dig(type, domain, callback) {
    try{

        const response = await axios.get(`https://dns.google/resolve?name=${domain}&type=${type}`)
        
        callback(response.data.Answer)
    } catch (err) {
        console.log(err);
    }

}

module.exports = dig