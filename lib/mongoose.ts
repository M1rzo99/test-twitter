import mongoose,{ConnectOptions} from "mongoose"

let isConnected:boolean=false

export const connectToDataBase = async ()=>{
    mongoose.set("strictQuery",true)
    if(!process.env.MONGO_DB_URI){
        return console.error("Mongo_DB_URI in not Defined");
    }

    if(isConnected){
        return
    }

    try {
        const options:ConnectOptions={
            dbName:"twitter-x",
            autoCreate:true
        }
        await mongoose.connect(process.env.MONGO_DB_URI,options);
        isConnected=true;
        console.log("Successfully Connected to Data Base");
    } catch (error) {
        console.log("Error connecting to Data Base");
    }
}