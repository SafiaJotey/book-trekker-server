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
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById({ _id: id });
    return result;
});
const getBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({});
    return result;
});
const getRecentBooks = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.find({}).sort({ createdAt: -1 }).limit(10);
    return result;
});
exports.BookServices = {
    createBook,
    getBooks,
    getSingleBook,
    getRecentBooks,
};
