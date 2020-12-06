const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URL, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
  useUnifiedTopology: true,
});

const connectDB = async () => {
  try {
    await client.connect();
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  } finally {
    await client.close();
  }
};

module.exports = connectDB;
