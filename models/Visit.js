// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/
const mongoose = require('mongoose');

const visitSchema = new mongoose.Schema({
  user: {
    type:mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  visitNumber:{
    type: String,
    required: true
  },
  location: {
    type: String,
    enum: ['Brampton', 'Peel', 'Vaughn', 'Bolton'],
    default: 'Brampton'
  },
  visitType:{
    type: String,
    enum: ['Parking Ticket', 'Bail Hearing', 'Crown summon', 'Pardon Request'],
    default: 'Parking Ticket'
  },
  visitDate:{
    type: Date,    
    required:true
  },
  visitTime:{
    type: String,
    enum:['7:00 am', '9:00 am', '11:00 am','1:00 pm', '3:00 pm'],
    default: '7:00 am'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Visit', visitSchema);