const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ordersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    CartId: {
        type: Schema.Types.ObjectId,
        ref:"Cart",
        required: true
    },
    order_date:{
        type:Date,
        default:Date.now
    }
});

const Orders = mongoose.model('Orders', ordersSchema);

module.exports = Orders;
