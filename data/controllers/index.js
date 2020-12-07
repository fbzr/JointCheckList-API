module.exports = (collection) => {
  const findAll = async () => {
    return await collection.find().toArray();
  };

  const findOne = async (query, options = {}) => {
    return await collection.findOne(query, options);
  };

  const insertOne = async (doc) => {
    return await collection.insertOne(doc);
  };

  return {
    findAll,
    findOne,
    insertOne,
  };
};
