const filledOrderModel = require('../../Models/filledOrderModel')
// const User = require("../models/user");




exports.orders = async (req, res) => {

try {

    let allOrders = await filledOrderModel.find({})
    .sort("-createdAt")
    .populate("products.product")
    .populate({
      path: 'orderdBy',
     model: 'User'
    })
    .exec();

    res.json(allOrders);
    
} catch (err) {
     console.log("err.errors is =============================>",Object.entries(err.errors)[0][1].properties.message);
     console.table(err.errors);
    res.status(400).json("***Fetching Orders Failed***"+" | "+"Error Message == "+err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
}


};



exports.orderStatus = async (req, res) => {


try {

    // console.log(req.body);
    // return;
    const { orderId, orderStatus } = req.body;

    let updated = await filledOrderModel.findByIdAndUpdate(
    orderId,
    { orderStatus },
    { new: true }
    ).exec();

  res.json(updated);
    
} catch (err) {
     console.log("err.errors is =============================>",Object.entries(err.errors)[0][1].properties.message);
     console.table(err.errors);
    res.status(400).json("***Updating Order Status Failed***"+" | "+"Error Message == "+err._message+" "+"|| Main Reason =====> "+ Object.entries(err.errors)[0][1].properties.message);
}

};
