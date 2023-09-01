const mongoose = require ('mongoose');

const accountSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    // Otros campos relacionados con la cuenta
    favoriteItineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Itinerary' }],
  });
  
  const AccountModel = mongoose.model('Account', accountSchema);
  
  module.exports = AccountModel;
