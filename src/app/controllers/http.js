// Require Packages
const axios = require('axios');

const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();

// Favicon
router.get('/favicon.ico', (req, res) => res.status(204));

// Read
router.get('/', async (req, res) => {
    return res.status(200).send({
        message: 'HTTP API is operational'
    });
})

router.get('/:domain?', async (req, res) => {
    try {
        const { domain } = req.params
        if (typeof domain === 'undefined')
            return res.status(400).send({
                error: '400',
                message: 'Domain is undefined'
            });
        console.log("Requesting: " + domain + " : HTTP")
        await axios.get('https://' + domain)
            .then((response) => {
                return res.status(200).send({
                    response: response.status
                });
            });
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: '500',
            message: 'Something went wrong'
        });
    }
});

// Export
module.exports = app => app.use('/http', router);