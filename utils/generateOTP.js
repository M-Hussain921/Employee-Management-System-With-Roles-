const crypto=require('crypto');

const generateOTP=()=>(crypto.randomInt(100000,900000).toString());

module.exports=generateOTP;