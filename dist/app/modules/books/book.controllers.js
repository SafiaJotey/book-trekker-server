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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookControllers = void 0;
const sendresponse_1 = __importDefault(require("../../../Interfaces/sendresponse"));
const book_services_1 = require("./book.services");
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = __rest(req.body, []);
        const newBook = yield book_services_1.BookServices.createBook(book);
        res.status(200).json({
            success: true,
            message: 'successfully add a new book!',
            data: newBook,
        });
    }
    catch (err) {
        next(err);
    }
});
const reviewBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newBook = yield book_services_1.BookServices.reviewBook(req.params.id, req.body);
        console.log(newBook);
        res.status(200).json({
            success: true,
            message: 'successfully add a new book!',
            data: newBook,
        });
    }
    catch (err) {
        next(err);
    }
});
const updateBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield book_services_1.BookServices.updateBook(id, req.body);
        res.status(200).json({
            success: true,
            message: 'successfully update a book!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getSingleBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield book_services_1.BookServices.getSingleBook(id);
        res.status(200).json({
            success: true,
            message: 'successfully get a book!',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.getBooks();
        (0, sendresponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'Books fetched successfully !',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const getRecentBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.getRecentBooks();
        (0, sendresponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: '!0 recent books fetched successfully !',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_services_1.BookServices.deleteBook(req.params.id);
        (0, sendresponse_1.default)(res, {
            statusCode: 200,
            success: true,
            message: 'book deleted successfully !',
            data: result,
        });
    }
    catch (err) {
        next(err);
    }
});
exports.BookControllers = {
    createBook,
    getBooks,
    getSingleBook,
    getRecentBooks,
    deleteBook,
    updateBooks,
    reviewBook,
};
