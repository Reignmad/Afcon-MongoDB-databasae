import { MongoClient } from "mongodb";
import readline from "readline";

// MongoDB connection details
const uri = "mongodb+srv://Oabusa:password12345678@cluster0.ksv0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const client = new MongoClient(uri);

// Command-line interface setup
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function connectDB() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

async function readData(collectionName, filter = {}) {
  try {
    const database = client.db("AFCON");
    const collection = database.collection(collectionName);
    const results = await collection.find(filter).toArray();
    console.log("📊 Query Results:", results);
  } catch (error) {
    console.error("❌ Error reading data:", error);
  }
}

async function insertData(collectionName, data) {
  try {
    const database = client.db("AFCON");
    const collection = database.collection(collectionName);
    await collection.insertOne(data);
    console.log("✅ Data inserted successfully.");
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  }
}

async function updateData(collectionName, filter, update) {
  try {
    const database = client.db("AFCON");
    const collection = database.collection(collectionName);
    await collection.updateOne(filter, { $set: update });
    console.log("✅ Data updated successfully.");
  } catch (error) {
    console.error("❌ Error updating data:", error);
  }
}

async function deleteData(collectionName, filter) {
  try {
    const database = client.db("AFCON");
    const collection = database.collection(collectionName);
    await collection.deleteOne(filter);
    console.log("✅ Data deleted successfully.");
  } catch (error) {
    console.error("❌ Error deleting data:", error);
  }
}

// CLI interaction
async function startCLI() {
  await connectDB();

  rl.question("Choose an action: 1. Read 2. Insert 3. Update 4. Delete\n", (answer) => {
    if (answer === "1") {
      rl.question("Enter collection name to read from: ", (collection) => {
        readData(collection).then(() => rl.close());
      });
    } else if (answer === "2") {
      rl.question("Enter collection name to insert into: ", (collection) => {
        rl.question("Enter data as JSON: ", (data) => {
          try {
            insertData(collection, JSON.parse(data)).then(() => rl.close());
          } catch (error) {
            console.error("❌ Invalid JSON input.");
            rl.close();
          }
        });
      });
    } else if (answer === "3") {
      rl.question("Enter collection name to update: ", (collection) => {
        rl.question("Enter filter as JSON: ", (filter) => {
          rl.question("Enter update as JSON: ", (update) => {
            try {
              updateData(collection, JSON.parse(filter), JSON.parse(update)).then(() => rl.close());
            } catch (error) {
              console.error("❌ Invalid JSON input.");
              rl.close();
            }
          });
        });
      });
    } else if (answer === "4") {
      rl.question("Enter collection name to delete from: ", (collection) => {
        rl.question("Enter filter as JSON: ", (filter) => {
          try {
            deleteData(collection, JSON.parse(filter)).then(() => rl.close());
          } catch (error) {
            console.error("❌ Invalid JSON input.");
            rl.close();
          }
        });
      });
    } else {
      console.log("❌ Invalid choice. Exiting...");
      rl.close();
    }
  });
}


startCLI();





/*import { MongoClient } from "mongodb";

// MongoDB connection string
const uri = "mongodb+srv://Oabusa:password12345678@cluster0.ksv0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    // Connect to MongoDB
    await client.connect();

    // Select the database and collection
    const database = client.db("AFCON");
    const collection = database.collection("Nigeria");

    // Query for a player
    const query = { playerName: "Ola Aina" };

    // Retrieve the document
    const player = await collection.findOne(query);

    // Display the result
    console.log(player);
  } catch (error) {
    console.error("❌ Error:", error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the function
run();*/


/*
import { MongoClient } from 'mongodb';

// MongoDB Atlas Connection String
const uri = "mongodb+srv://Oabusa:password12345678@cluster0.ksv0b.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a new MongoClient
const client = new MongoClient(uri);

async function testConnection() {
    try {
        await client.connect();
        console.log("✅ Successfully connected to MongoDB Atlas!");

        // List all collections in the database
        const db = client.db("AFCON"); // Change if using a different database name
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections.map(col => col.name));

    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
    } finally {
        await client.close();
    }
}

// Run the test function
testConnection();

*/
