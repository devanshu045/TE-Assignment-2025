import mongoose from 'mongoose';

const dbConnection = async () =>{
   try {
       await mongoose.connect(`mongodb://127.0.0.1:27017/TE_ASSIGNMENT_DB`);
       console.log("Database connection established");
   } catch (error) {
          console.log("Error connecting to MongoDB",error);
   }
}

export default dbConnection;