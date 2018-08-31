const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  host: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  guest: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  hotel: {
    type: mongoose.Schema.ObjectId,
    ref: 'Hotel',
    required: true,
  },
  guests: {
    type: Number,
    required: true,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    default: false,
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;