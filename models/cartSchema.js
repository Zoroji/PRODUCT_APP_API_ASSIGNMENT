const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    ProductId: {
        type:Schema.Types.ObjectId,
        ref:"Product",
        required: true
    },
    quantity: {
        type: Number,
        default: 1
    },
   username: {
    type:String,
    required:true
    },
    uploaded_date: {
        type: Date,
        default: Date.now
    }
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
