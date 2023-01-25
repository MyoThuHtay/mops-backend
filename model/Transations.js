const mongoose = require('mongoose');

const transations = mongoose.Schema({
    blockNumber:{
        type:String,
        required:true,
    },
    timeStamp:{
        type:Date,
        required:true,
    },
    txHash:{
        type:String,
        require:true,
    },
    fromAddress:{
        type:String,
        require:true,
    },
    toAddress:{
        type:String,
        require:true,
    },
    amount:{
        type:Number,
        require:true,
    },
    txreceipt_status:{
        type:String,
        default:'1'
    },
    gasPrice:{
        type:String,
        require:true,
    },
    gasUsed:{
        type:String,
        require:true,
    },
})

const Transations = mongoose.model('Transations',transations);
module.exports = Transations;