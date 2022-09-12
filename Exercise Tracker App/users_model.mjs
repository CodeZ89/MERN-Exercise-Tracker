import mongoose from 'mongoose';
import 'dotenv/config';


mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: Number, required: false }
})

const User = mongoose.model("User", userSchema);

const createUser = async (name, age, email, phoneNumber) => {
    const user = new User({ name: name, age: age, email: email, phoneNumber: phoneNumber })
    return user.save()
}

const findUser = async (filter) => {
    const query = User.find(filter)
    return query.exec();
}

const updateUser = async (filter, update) => {
    const result = await User.updateOne(filter, update)
    return result.modifiedCount;
}

const deleteUsers = async (filter) => {
    const result = await User.deleteMany(filter)
    return result.deletedCount

}

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export { createUser, findUser, updateUser, deleteUsers }; 