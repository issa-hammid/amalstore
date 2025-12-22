import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  title: {
    type: String,
    // required: true,
    trim: true
  },
  subtitle: {
    type: String,
    // required: true,
    trim: true
  },
  buttonText: {
    type: String,
    // required: true,
    trim: true
  },
  buttonLink: {
    type: String,
    // required: true,
    trim: true
  },
  image: {
    type: String, 
    // required: true
  },
  imagePublicId: {
    type: String, 
    // required: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.models.Hero || mongoose.model('Hero', heroSchema);