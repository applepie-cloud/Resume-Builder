import mongoose from "mongoose"

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("database connected successfully")
        })

        let mongodb_uri = process.env.MONGODB_URI
        const projectName = 'resume_builder'

        if(!mongodb_uri) {
            throw new Error("MONGODB_URI is not defined in environment variables")
        }

        if(mongodb_uri.endsWith('/')) {
            mongodb_uri = mongodb_uri.slice(0, -1)
        }

        await mongoose.connect(`${mongodb_uri}/${projectName}`);

    } catch (error) {
        console.error("Error connecting to the database:", error);
    }
}

export default connectDB;