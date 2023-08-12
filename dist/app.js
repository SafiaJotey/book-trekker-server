"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importStar(require("express"));
const globalErrorHanler_1 = __importDefault(require("./app/midlewires/globalErrorHanler"));
const book_route_1 = require("./app/modules/books/book.route");
const completeReading_route_1 = require("./app/modules/completeReading/completeReading.route");
const reading_route_1 = require("./app/modules/reading/reading.route");
const user_route_1 = require("./app/modules/user/user.route");
const wishlist_route_1 = require("./app/modules/wishlist/wishlist.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: '*',
    credentials: true,
}));
app.use(express_1.default.json());
app.use((0, express_1.urlencoded)({ extended: true }));
app.use('/', express_1.default.static('upload'));
app.use('/upload', express_1.default.static(__dirname + '/upload'));
// Application routes
app.use('/api/v1/books', book_route_1.BookRoutes);
app.use('/api/v1/users', user_route_1.UserRoutes);
app.use('/api/v1/wishlist', wishlist_route_1.WishlistRoutes);
app.use('/api/v1/reading', reading_route_1.ReadingRoutes);
app.use('/api/v1/completed', completeReading_route_1.CompletedRoutes);
app.use(globalErrorHanler_1.default);
exports.default = app;
