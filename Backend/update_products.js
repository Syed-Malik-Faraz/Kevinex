import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const updateProducts = async () => {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();
        await client.db('kevinex').collection('products').updateMany({}, { $set: { isFeatured: true } });
        console.log('All products in kevinex set to isFeatured: true');
    } finally {
        await client.close();
        process.exit(0);
    }
};

updateProducts();
