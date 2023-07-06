// Require Packages
const express = require('express');
const dns = require('dns');
const dig = require('../functions/dig');
const router = express.Router();

// Favicon
router.get('/favicon.ico', (req, res) => res.status(204));

// Read
router.get('/', async (req, res) => {
    return res.status(200).send({
        message: 'dns'
    });
});

router.get('/:domain/:type?', async (req, res) => {
    try {
        const { domain } = req.params
        const { type } = req.params
        let types = [];
        let answers = [];

        if (typeof domain === 'undefined')
            return res.status(400).send({
                error: '400',
                message: 'Domain is undefined'
            });

        if (typeof type === 'undefined') {
            types = ['A', 'AAAA', 'NS', 'MX', 'TXT'];
        }
        else {
            types = [type];
        }

        let digArray = async () => {
            for (const type of types) {
                dig(type, domain, (response) => {
                    answers.push(response.Answer);
                });
                console.log(type)
            }
        }
        await digArray();

        console.log(answers);

        return res.status(200).send({
            answers
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
module.exports = app => app.use('/dns', router)