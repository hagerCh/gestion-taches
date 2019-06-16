const mongoose = require('mongoose');

const phase = new mongoose.Schema({
  titre: String,
  description: String,
  date_deb: String,
  date_fin: String,
  taches: [{ type: mongoose.Schema.Types.ObjectId, ref: 'tache' }]
})

module.exports = mongoose.model('phase', phase);
