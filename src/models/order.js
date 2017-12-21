import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  order: {
    type: String,
    required: true,
  },
  product: {
    type: [String],
    minlength: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

export default mongoose.model('Order', OrderSchema);
