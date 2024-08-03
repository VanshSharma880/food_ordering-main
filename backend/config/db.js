import mongoose from "mongoose";

export const  connectDB = async () =>{
    await mongoose.connect("mongodb+srv://svansh880:nF7QITr0oP19Iehu@cluster0.kcsjikl.mongodb.net/My_FoodOrderingProject").then(()=>console.log("DB Connected"));
}


// add your mongoDB connection string above.
// Do not use '@' symbol in your database user's password else it will show an error.

//svansh880
//MONGODB_Project password: nF7QITr0oP19Iehu

