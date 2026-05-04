import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const checkDBs = async () => {
    try {
        const uri = process.env.MONGO_URI.replace("/kevinex?", "/test?");
        console.log("Checking URI:", uri);
        await mongoose.connect(uri);
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections in 'test':", collections.map(c => c.name));
        
        const Product = mongoose.model("Product", new mongoose.Schema({}, { strict: false }));
        const count = await Product.countDocuments();
        console.log("Products in 'test':", count);
        
        await mongoose.connection.close();
        
        const uri2 = process.env.MONGO_URI;
        console.log("Checking URI:", uri2);
        await mongoose.connect(uri2);
        const collections2 = await mongoose.connection.db.listCollections().toArray();
        console.log("Collections in 'kevinex':", collections2.map(c => c.name));
        const Product2 = mongoose.model("Product2", new mongoose.Schema({}, { strict: false }), "products");
        const count2 = await Product2.countDocuments();
        console.log("Products in 'kevinex':", count2);
        
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDBs();
