var express = require('express');
const prisma = require('../db');
var router = express.Router();


router.get('/',async function(req, res, next) {
  const result= await prisma.province.findMany();
  res.json(result)
});



router.post('/', async function(req, res){
  const{provinceId, name} =req.body
  const result = await prisma.province.create({
    data: {
      provinceId,
      name
    }
  })
  res.json(result)
})


module.exports = router;
