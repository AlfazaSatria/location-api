var express = require('express');
const fetch = require('node-fetch');
const prisma = require('../db');
var router = express.Router();

const API_KEY = '2ca5b453b28dde9492447338ccffaea2';

async function fetchLocation(url, apiKey, options = {}) {
    if (apiKey) {
        options.headers = {
            ...options.headers,
            'key': apiKey
        };
    }

    try {
        const result = await fetch(url, options);
        if (!result.ok) {
            throw new Error(`Error : ${result.status}`);
        }
        return await result.json(result);
    } catch (error) {
        res.send('Fetch error', error);
        throw error;
    }
}

async function saveProvincesToDb(provinces) {
    for (const province of provinces) {
        await prisma.province.create({
            data: {
                provinceId: province.province_id, 
                name: province.province
            }
        });
    }
}

router.get('/province', async (req, res) => {
    try {
        const data = await fetchLocation('https://pro.rajaongkir.com/api/province', API_KEY);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/city', async (req, res) => {
    try {
        const { id, province } = req.query;
        let url = 'https://pro.rajaongkir.com/api/city';
        const queryParams = new URLSearchParams();
        if (id) queryParams.append('id', id);
        if (province) queryParams.append('province', province);
        if ([...queryParams].length) url += `?${queryParams}`;
        
        const data = await fetchLocation(url, API_KEY);

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.get('/subdistrict', async (req,res) => {
    try{
        const {id, city} = req.query;
        let url ='https://pro.rajaongkir.com/api/subdistrict';
        const queryParams = new URLSearchParams();
        if (id) queryParams.append('id', id);
        if (city) queryParams.append('city', city);
        if ([...queryParams].length) url += `?${queryParams}`;

        const data = await fetchLocation(url, API_KEY);

        res.json(data);
    }catch(error) {
        res.status(500).json({ error: error.message});
    }
})

router.get('/store/province', async (req, res) => {
    try {
        const apiResponse = await fetchLocation('https://pro.rajaongkir.com/api/province', API_KEY);
        const provincesData = apiResponse.rajaongkir.results; 

        await saveProvincesToDb(provincesData); 

        res.json(provincesData); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;