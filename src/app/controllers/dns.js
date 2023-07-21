// Require Packages
const express = require('express');
const dig = require('../functions/dig');
const router = express.Router();

// Favicon
router.get('/favicon.ico', (req, res) => res.status(204));

// Read
router.get('/', async (req, res) => {
    return res.status(200).send({
        error: 'DNS API is operational'
    });
});

router.get('/:domain?/:type?', async (req, res) => {
        const { domain, type } = req.params
        let Answer = {}
        console.log("Requesting: " + domain + " : DNS")
        if (typeof type == 'undefined'){
            //If a type isn't specified, default to generic record types: A,AAAA,MX,NS
            const records = ["A", "AAAA", "MX", "NS"]

            for (const record of records) {
                Answer[record] = []
            }

            for (const record of records) {
                await dig (record, domain, (response) => {
                    for (const dns_record of response){
                        Answer[record].push(dns_record.data)
                    }

                })
            }

        } else {
            
            Answer[type.toUpperCase()] = []
            await dig (type, domain, (response) => {
                for (const dns_record of response){
                    Answer[type.toUpperCase()].push(dns_record.data)
                }
            })
            
        }

    
    return res.status(200).send({
        Answer
    })
});

// Export
module.exports = app => app.use('/dns', router)