import mongoose  from "mongoose";

const connectToDatabse = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
    }catch(error){
        console.log(error);
    }
}

export default connectToDatabse