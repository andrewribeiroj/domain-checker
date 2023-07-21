// Require Packages
const whois = require('whois-json');
const psl = require('psl');

const express = require('express');
const { send } = require('express/lib/response');
const router = express.Router();

// Favicon
router.get('/favicon.ico', (req, res) => res.status(204));

// Read
router.get('/', async (req, res) => {
    return res.status(200).send({
        message: 'Whois API is operational'
    });
});

router.get('/:domain?', async (req, res) => {
    try {
        const { domain } = req.params;
        if (typeof domain === 'undefined')
            return res.status(400).send({
                error: '400',
                message: 'Domain is undefined'
            });
        console.log("Requesting: " + domain + " : Whois")
        let resWhois = await whois(`${psl.get(domain)}`, { follow: 3, verbose: true });
        if (resWhois.length > 1) //Temporary solution before checking TLDs individually
            return res.status(200).send({
                response: resWhois[1]
            });
        else
            return res.status(200).send({
                response: resWhois
            });
    } catch (err) {
        console.log(err)
        return res.status(500).send({
            error: '500',
            message: 'Something went wrong'
        })
    }
});

// Export
module.exports = app => app.use('/whois', router);