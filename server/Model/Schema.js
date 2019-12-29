const mongoose = require('mongoose')

const mongoUrl = 'mongodb://localhost/dataUsers'
const connectDB = async () => {
 await mongoose.connect(mongoUrl,{ 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
mongoose.set('debug', true)

}
connectDB()

let Schema = mongoose.Schema
let userSchema= new Schema({
    id:Number,
    name:String,
    email:String ,
    password: String,
    description: String,
    title : String,
	phone: String,
	gender: String,
    born_date: Date,
    reg_date: Date,
})
const user= mongoose.model('users',userSchema)

module.exports={user}