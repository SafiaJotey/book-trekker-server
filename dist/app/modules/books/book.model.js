"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
// Create a new Model type that knows about IUserMethods...
//  Creating a Schema for users
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publication_date: { type: String, required: true },
    image: { type: String, required: true },
    reviews: [
        {
            reviewer: { type: String },
            rating: { type: Number },
            comment: { type: String },
        },
    ],
}, {
    timestamps: true,
});
// Creating a Model.
exports.Book = (0, mongoose_1.model)('Book', bookSchema);
