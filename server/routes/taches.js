const router = require('express').Router();
const tache = require('../models/tache');
const phase = require('../models/phase');

router.post('/updateTache/:idTache', async (req, res) => {
  const tacheResult = await tache.update({ "_id": req.params.idTache }, { $set: req.body }).exec();
  res.send({ data: tacheResult })
})

router.get('/allTaches', async (req, res) => {
  const result = await tache.find().populate({ path: 'phase'}).exec();
  res.send({ data: result })
})

router.get('/phases', async (req, res) => {
  const result = await phase.find().exec();
  res.send({ data: result })
})
router.get('/phase/:id', async (req, res) => {
  const result = await phase.find({"_id": req.params.id}).exec();
  res.send({ data: result })
})

router.get('/byPhase/:idPhase', async (req, res) => {
  const result = await tache.find({ "phase": req.params.idPhase }).exec();
  res.send({ data: result })
})

router.post('/addTache/:idPhase', async (req, res) => {
  req.body.phase = req.params.idPhase;
  const tacheResult = await tache.create(req.body).catch(err => err);
  const phaseResult = await phase.updateOne({ "_id": req.params.idPhase }, { $push: { taches: tacheResult._id } }).exec();
  res.send({ data: phaseResult })
})

router.post('/addPhase', async (req, res) => {
  const phaseResult = await phase.create(req.body).catch(err => err);
  res.send({ data: phaseResult })
})

router.post('/deleteTache/:idTache/', async (req, res) => {
  // const result = await tache.deleteOne({ "_id": req.params.idTache }).exec();
  // res.send({ data: result })
  const phaseResult = await phase.findOne({ taches: req.params.idTache }).exec()
  const phaseUpdateResult = await phase.updateOne({ _id: phaseResult._id },
    { $pull: { taches: req.params.idTache } }).exec()
  const tacheResult = await tache.deleteOne({ _id: req.params.idTache }).exec()
  res.send({ data: tacheResult })
})

module.exports = router;
