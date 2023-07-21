"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controllers_1 = require("./book.controllers");
const router = express_1.default.Router();
router.post('/add-book', book_controllers_1.BookControllers.createBook);
router.get('/recent', book_controllers_1.BookControllers.getRecentBooks);
router.get('/', book_controllers_1.BookControllers.getBooks);
router.get('/:id', book_controllers_1.BookControllers.getSingleBook);
exports.BookRoutes = router;
