"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const user_model_1 = require("../user/user.model");
// Create a new Model type that knows about IUserMethods...
//  Creating a Schema for users
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publication_date: { type: String, required: true },
    image: { type: Object, required: true },
    bookPdf: { type: Object, required: true },
    reviews: [
        {
            reviewer: { type: String },
            rating: { type: Number },
            comment: { type: String },
        },
    ],
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: user_model_1.User },
}, {
    timestamps: true,
});
// Creating a Model.
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
