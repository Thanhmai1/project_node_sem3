const { MongoClient, ObjectId } = require('mongodb');
const url = 'mongodb://localhost:27017';
const dbName = 'Prj3';
let db;

MongoClient.connect(url, { useUnifiedTopology: true }, (err, client) => {
    if (err) throw err;
    db = client.db(dbName);
});

const getAllDishes = async () => {
    return await db.collection('dishes').find().toArray();
};

const getDishById = async (id) => {
    return await db.collection('dishes').findOne({ _id: new ObjectId(id) });
};

const addDish = async (data) => {
    return await db.collection('dishes').insertOne(data);
};

const updateDish = async (id, data) => {
    return await db.collection('dishes').updateOne(
        { _id: new ObjectId(id) },
        { $set: data }
    );
};

const deleteDish = async (id) => {
    return await db.collection('dishes').deleteOne({ _id: new ObjectId(id) });
};

module.exports = { getAllDishes, getDishById, addDish, updateDish, deleteDish };
