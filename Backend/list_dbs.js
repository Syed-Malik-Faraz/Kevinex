import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const listAll = async () => {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();
        const admin = client.db().admin();
        const dbs = await admin.listDatabases();
        
        for (const dbInfo of dbs.databases) {
            const dbName = dbInfo.name;
            if (['admin', 'local', 'config'].includes(dbName)) continue;
            
            const db = client.db(dbName);
            const collections = await db.listCollections().toArray();
            console.log(`\nDatabase: ${dbName}`);
            
            for (const col of collections) {
                const count = await db.collection(col.name).countDocuments();
                console.log(`  - ${col.name}: ${count} documents`);
            }
        }
    } catch (err) {
        console.error(err);
    } finally {
        await client.close();
    }
};

listAll();
