var express = require('express');
const { fetchLocation } = require('../routes/fetch');
const prisma = require('../db');
var router = express.Router();

const API_KEY = '2ca5b453b28dde9492447338ccffaea2';

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
        const apiResponse = await fetchLocation('https://pro.rajaongkir.com/api/province', API_KEY);
        const provincesData = apiResponse.rajaongkir.results; 

        await saveProvincesToDb(provincesData); 

        res.json(provincesData); 
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

