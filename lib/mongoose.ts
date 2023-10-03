import mongoose from 'mongoose'

let isConnected = false 

export const connectToDB  = async () => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log("Mongodb url not found") 
    //if connection is already established, return without creating a new connection
    if(isConnected) return console.log("Already connected to MongoDB ")
    try {
 await mongoose.connect(process.env.MONGODB_URL)
 isConnected = true; //set connection status to true
 console.log("Connected to MONGO Database")
    } catch (err) {
        console.log(err)
    }

}