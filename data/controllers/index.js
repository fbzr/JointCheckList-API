module.exports = (collection) => {
  const findAll = async () => {
    return await collection.find().toArray();
  };

  const findOne = async (query, options = {}) => {
    return await collection.findOne(query, options);
  };

  const insertOne = async (doc) => {
    const result = await collection.insertOne({
      ...doc,
      created_at: Date.now(),
    });
    // return inserted document
    return result.ops[0];
  };

  const updateOne = async (filter, update) => {
    const result = await collection.findOneAndUpdate(filter, update, {
      upsert: false, // if true, allows creating of new doc if match is not found
      returnOriginal: false, // false to return updated doc
    });

    return result.value;
  };

  return {
    findAll,
    findOne,
    insertOne,
    updateOne,
  };
};
