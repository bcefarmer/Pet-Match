

const makeCall = (callNumber, userLoc)=>{

const accountSid = 'AC5d4e412e43777239241a46267a5f93ec';
const authToken = '7e9f2e7c38975af6d0213a1f9cf0a2f4';
const basePhone = '+18605908302';
this.callNumber = callNumber;

const client = require('twilio')(accountSid, authToken);


client.calls
      .create({
         url: userLoc,
         to: "8609089593",
         from: basePhone
       })
      .then(call => console.log(call.sid));
}

module.exports = makeCall();

//--------NEW 


