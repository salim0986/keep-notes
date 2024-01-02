import mongoose from "mongoose";
export const mongoDbConnect = async () => {
    try {
      await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("App is connected to mongodb");
    } catch (error) {
      console.log(error);
    }
  };