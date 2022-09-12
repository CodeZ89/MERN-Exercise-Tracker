import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as users from './users_model.mjs';

const app = express();

const PORT = process.env.PORT;

app.get("/create", asyncHandler(async (req, res) => {
    const user = await users.createUser(req.query.name, req.query.age, req.query.email, req.query.phoneNumber)
    res.send(user)
}))

app.get("/retrieve", asyncHandler(async (req, res) => {

    const filter = {};

    if (req.query.name !== undefined) {
        filter.name = req.query.name
    }
    if (req.query.age !== undefined) {
        filter.age = req.query.age
    }
    if (req.query.email !== undefined) {
        filter.email = req.query.email
    }
    if (req.query.phoneNumber !== undefined) {
        filter.phoneNumber = req.query.phoneNumber
    }
    if (req.query._id !== undefined) {
        filter._id = req.query._id
    }

    const result = await users.findUser(filter)
    res.send(result)
}));

app.get("/update", asyncHandler(async (req, res) => {
    const update = {}

    if (req.query._id !== undefined) {
        update._id = req.query._id
    }
    if (req.query.name !== undefined) {
        update.name = req.query.name
    }
    if (req.query.age !== undefined) {
        update.age = req.query.age
    }
    if (req.query.email !== undefined) {
        update.email = req.query.email
    }
    if (req.query.phoneNumber !== undefined) {
        update.phoneNumber = req.query.phoneNumber
    }

    const resultVal = await users.updateUser({ _id: req.query._id }, update)

    if (resultVal !== 0) {
        res.send({ modifiedCount: resultVal });
    }
    else {
        res.send({ "Error": "Not Found" })
    }
}));

app.get("/delete", asyncHandler(async (req, res) => {
    const filter = {};

    if (req.query.name !== undefined) {
        filter.name = req.query.name
    }
    else if (req.query.age !== undefined) {
        filter.age = req.query.age
    }
    else if (req.query.email !== undefined) {
        filter.email = req.query.email
    }
    else if (req.query.phoneNumber !== undefined) {
        filter.phoneNumber = req.query.phoneNumber
    }
    else if (req.query._id !== undefined) {
        filter._id = req.query._id
    }

    const resultVal = await users.deleteUsers(filter)
    res.send({ deletedCount: resultVal });
}));


app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});