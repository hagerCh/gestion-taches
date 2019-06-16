const mongoose = require('mongoose');

const tache = new mongoose.Schema({
  phase: { type: mongoose.Schema.Types.ObjectId, ref: 'phase' },
  nom: String,
  description: String,
  resultat: String,
  done: Boolean,
  duree: String,
  charge: String
})

module.exports = mongoose.model('tache', tache);
