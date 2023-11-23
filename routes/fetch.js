var express = require('express');
const fetch = require('node-fetch');
var router = express.Router();

const API_KEY ='2ca5b453b28dde9492447338ccffaea2';

async function fetchProvince(url, apiKey, options = {}){
    if(apiKey){
        options.headers = {
            ...options.headers,
            'key' : apiKey
        };
    }

    try{
        const result = await fetch (url, options);
        if(!result.ok){
            throw new Error(`Error : ${result.status}`);
        }
        return await result.json(result);
    }catch(error){
        res.send('Fetch error', error);
        throw error;
    }
}

router.get('/', async (req, res) => {
    try{
        const data = await fetchProvince('https://pro.rajaongkir.com/api/province', API_KEY);
        res.json(data);
    }catch (error){
        res.status(500).json({error : error.message});
    }
})

module.exports = router;