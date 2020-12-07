const { MongoClient } = require("mongodb");

const connect = async (url) => {
  mongoClient = new MongoClient(url, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
  });

  // return DB from connection string
  return (await mongoClient.connect()).db();
};

module.exports = async () => {
  // You can add different URL for prod, dev or testing environments
  let dbs = await Promise.all([connect(process.env.MONGO_URL)]);

  return {
    production: dbs[0],
    development: dbs[0],
    testing: dbs[0],
  };
};
