
require('dotenv').config()

const express = require('express')
const app = express()
const admin=require('./DatabaseConnection')
const db = admin.Dbconnect().firestore();
const {generateAccessToken,authenticateToken}=require('./Middleware')
app.use(express.json())

app.get('/getData',authenticateToken ,(req, res) => {
  const docRef = db.collection('users').doc(req.query.id).get()
  .then(doc=>
    {
      return res.send(doc.data())
    })
  .catch(err=>
    {
      return res.json({error:'not user exist'})
    })

})


app.post('/signup',(req,res)=>
{
  const docRef = db.collection('users').doc(req.body.username);

   docRef.set({
    first: req.body.firstname,
    last: req.body.lastname,
    born: req.body.dob
  }).then(result=>{
return res.sendStatus(200)
  }).catch(err=>
    {
     return res.sendStatus(502)
    })
})

app.post('/login',async (req, res) => {
  const username = req.body.username
  const doc = await db.collection('users').doc(username).get()
  const user = { name: username }
  if(doc.exists)
  {
    const accessToken =await generateAccessToken(user)
 
    return res.json({ accessToken: accessToken })
  }
  else
  {
    return res.json({error:'not user exist'})
  }
 
})
app.listen(3000)