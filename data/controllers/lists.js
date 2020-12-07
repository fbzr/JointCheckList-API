module.exports = (db) => {
  const collection = db.collection("lists");

  const findAll = async () => {
    return await collection.find().toArray();
  };

  return {
    findAll,
  };
};
