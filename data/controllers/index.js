const ObjectId = require("mongodb").ObjectId;

module.exports = (collection) => {
  const findAll = async () => {
    return await collection.find().toArray();
  };

  const findMany = async (query) => {
    return await collection.find(query).toArray();
  };

  const findById = async (id, options = {}) => {
    return await collection.findOne({ _id: ObjectId(id) }, options);
  };

  const findOne = async (query, options = {}) => {
    return await collection.findOne(query, options);
  };

  const insertOne = async (doc) => {
    const result = await collection.insertOne({
      ...doc,
      created_at: new Date(),
    });
    // return inserted document
    return result.ops[0];
  };

  const updateOne = async (id, update) => {
    const result = await collection.findOneAndUpdate(
      { _id: ObjectId(id) },
      update,
      {
        upsert: false, // if true, allows creating of new doc if match is not found
        returnOriginal: false, // false to return updated doc
      }
    );

    return result.value;
  };

  // returns deleted doc or null if not found
  const deleteOne = async (id) => {
    const result = await collection.findOneAndDelete({ _id: ObjectId(id) });
    return result.value;
  };

  return {
    findAll,
    findMany,
    findById,
    findOne,
    insertOne,
    updateOne,
    deleteOne,
  };
};
