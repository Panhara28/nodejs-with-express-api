const express = require('express');
const db = require('../db');
const router = express.Router();

router.get('/', async(req, res) => {
  try{
    let results = await db.all();
    res.json(results);
  }catch(e){
    console.log(e);
    res.status(500)
  }
})

router.get('/:id', async (req, res) => {
  try{
    let result = await db.findOne(req.params.id);
    res.json(result);
  }catch(e){
    console.log(e);
    res.status(500)
  }
})

router.post('/create', async(req, res) => {
  try{
    let result = await db.create(req.body);
    res.json(result);
  }catch(e){
    console.log(e);
    res.status(500)
  }
})

router.patch('/update/:id', async(req, res) => {
  try{
    let result = await db.update(req.params.id, req.body);
    res.json(result);
  }catch(e){
    console.log(e);
    res.status(500);
  }
})

module.exports = router;