import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const migrateData = async () => {
    const client = new MongoClient(process.env.MONGO_URI);
    try {
        await client.connect();
        console.log("Connected to MongoDB Cluster");

        const sourceDb = client.db('test');
        const targetDb = client.db('kevinex');

        const collectionsToMigrate = ['users', 'products', 'orders', 'messages'];

        for (const colName of collectionsToMigrate) {
            console.log(`\nMigrating collection: ${colName}...`);
            
            // Get data from source
            const data = await sourceDb.collection(colName).find({}).toArray();
            console.log(`  Found ${data.length} documents in test.${colName}`);

            if (data.length > 0) {
                // Clear target collection first to avoid duplicates if re-run
                await targetDb.collection(colName).deleteMany({});
                
                // Insert into target
                const result = await targetDb.collection(colName).insertMany(data);
                console.log(`  Successfully moved ${result.insertedCount} documents to kevinex.${colName}`);
            } else {
                console.log(`  No documents to move for ${colName}`);
            }
        }

        console.log("\nMigration completed successfully!");
    } catch (err) {
        console.error("Migration failed:", err);
    } finally {
        await client.close();
        process.exit(0);
    }
};

migrateData();
