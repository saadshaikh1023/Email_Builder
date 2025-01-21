import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  footer: String,
  imageUrl: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Template', templateSchema);
