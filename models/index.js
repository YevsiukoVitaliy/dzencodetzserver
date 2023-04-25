const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  serialNumber: { type: Number, required: true },
  isNew: { type: Boolean, required: true },
  photo: { type: String, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true },
  specification: { type: String, required: true },
  guarantee: { type: Object, required: true },
  price: { type: Array, required: true },
  order: { type: Schema.Types.ObjectId, ref: 'Order' },
  date: { type: String, required: true },
});

const orderSchema = new Schema({
  title: { type: String, required: true },
  date: { type: String, required: true },
  description: { type: String, required: true },
  products: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    default: [],
  },
});

const Order = mongoose.model('Order', orderSchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Order, Product };
