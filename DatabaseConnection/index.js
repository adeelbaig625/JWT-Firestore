exports.Dbconnect=()=>{
const admin = require('firebase-admin');
const serviceAccount = require('./ServiceAccountkey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})
return admin
}
