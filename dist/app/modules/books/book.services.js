"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookServices = void 0;
const ApiError_1 = __importDefault(require("../../../error/ApiError"));
const book_model_1 = require("./book.model");
const createBook = (book) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.Book.create(book);
    if (!newBook) {
        throw new ApiError_1.default(440, 'Failed to create new user');
    }
    return newBook;
});
const reviewBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newBook = yield book_model_1.Book.findById({ _id: id });
    if (!newBook) {
        throw new ApiError_1.default(440, 'Failed to find book');
    }
    if (!newBook.reviews) {
        newBook.reviews = [];
    }
    newBook.reviews.push(payload);
    const result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, { reviews: newBook === null || newBook === void 0 ? void 0 : newBook.reviews }, {
        new: true,
    }).populate('user');
    return result;
});
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById({ _id: id });
    return result;
});
const getBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({});
    return result;
});
const getRecentBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({}).sort({ createdAt: -1 }).limit(8);
    return result;
});
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let result;
    const findBook = yield book_model_1.Book.findOne({ _id: id }).populate('user');
    if (findBook && ((_a = findBook === null || findBook === void 0 ? void 0 : findBook.user) === null || _a === void 0 ? void 0 : _a._id) == (payload === null || payload === void 0 ? void 0 : payload.user)) {
        result = yield book_model_1.Book.findOneAndUpdate({ _id: id }, payload, {
            new: true,
        }).populate('user');
    }
    else {
        throw new ApiError_1.default(403, 'Forbidden');
    }
    return result;
});
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findByIdAndDelete({ _id: id });
    return result;
});
exports.BookServices = {
    createBook,
    getBooks,
    getSingleBook,
    getRecentBooks,
    updateBook,
    deleteBook,
    reviewBook,
};
