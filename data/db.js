const { MongoClient } = require("mongodb");

const connect = async (url) => {
  mongoClient = new MongoClient(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });

  // return DB from connection string
  return await mongoClient.connect();
};

module.exports = async () => {
  // You can add different URL for prod, dev or testing environments
  let mongoClients = await Promise.all([connect(process.env.MONGO_URL)]);

  return {
    production: mongoClients[0],
    development: mongoClients[0],
    testing: mongoClients[0],
  };
};
