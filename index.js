const express =require('express')
const app = express()
const Person = require('./models/Person')

app.set('view engine','ejs')
app.set('views','views')
app.use(express.static('static'))
app.use(express.urlencoded())

const {connectDb} = require('./config/database')
connectDb()

app.get('/',(req,res)=>{
    return res.render('personform')
})
app.post('/register',async (req,res)=>{
    let id =Date.now()
    const {name,age,role}=req.body
    await Person.create({
        id,name,age,role
    })
    return res.send("<h1>you are registered</h1>")
})
app.get('/allperson',async (req,res)=>{
    let persons = await Person.find()
    console.log(persons)
    return res.json(persons)
})
export default async()=>{
    let personList = await Person.find()
    return personList
}

app.listen(3030,()=>{
    console.log("app started")
})