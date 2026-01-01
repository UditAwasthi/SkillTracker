import mongoose from "mongoose";

const connectDB = async (URL) => {
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connected successfully ✔");

 
        const db = mongoose.connection.useDb("skilltrackr");

        const TestSchema = new mongoose.Schema({ initialized: Boolean });
        const TestModel = db.model("Init", TestSchema);

      
        const existing = await TestModel.findOne();
        if (!existing) {
            await TestModel.create({ initialized: true });
            console.log("Database created & initialized ✔");
        } else {
            console.log("Database already initialized ✔");
        }

        console.log("SkillTracker DB ready for use");
    }
    catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export { connectDB };
