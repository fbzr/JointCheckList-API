module.exports = (collection) => {
  const findAll = async () => {
    return await collection.find().toArray();
  };

  return {
    findAll,
  };
};
