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
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserById = exports.deleteUserById = exports.createUser = exports.getUserById = exports.getUserBySessionToken = exports.getUserByEmail = exports.getUsers = exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },		
    authentication: {
        password: { type: String, required: true },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
});
exports.userModel = (0, mongoose_1.model)("User", userSchema);
const getUsers = () => exports.userModel.find();
exports.getUsers = getUsers;
const getUserByEmail = (email) => {
    return exports.userModel.findOne({ email: email });
};
exports.getUserByEmail = getUserByEmail;
const getUserBySessionToken = (sessionToken) => {
    return exports.userModel.findOne({ "authentication.sessionToken": sessionToken });
};
exports.getUserBySessionToken = getUserBySessionToken;
const getUserById = (id) => {
    return exports.userModel.findById(id);
};
exports.getUserById = getUserById;
const createUser = (values) => __awaiter(void 0, void 0, void 0, function* () {
    return yield new exports.userModel(values).save().then((user) => user.toObject());
});
exports.createUser = createUser;
const deleteUserById = (id) => {
    return exports.userModel.findOneAndDelete({ _id: id });
};
exports.deleteUserById = deleteUserById;
const updateUserById = (id, values) => {
    return exports.userModel.findOneAndUpdate(id, values);
};
exports.updateUserById = updateUserById;
//# sourceMappingURL=users.js.map
