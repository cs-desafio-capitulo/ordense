import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  product: {
    type: Object,
    minlength: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Order', OrderSchema);
