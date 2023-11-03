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
exports.login = exports.register = void 0;
const users_1 = require("../Models/users");
const helper_1 = require("../helpers/helper");
// Register User
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract username, email, and password from the request body
        const { username, email, password } = req.body;
        // Check if any of the required fields are missing
        if (!username || !email || !password) {
            res.status(404).json({ error: "Invalid inputs" });
            return; // Exit the function early
        }
        // Check if a user with the same email already exists
        const existingUser = yield (0, users_1.getUserByEmail)(email);
        if (existingUser) {
            // If a user with the same email exists, return a conflict response
            return res.status(409).send("User already exists");
        }
        // Generate a random salt for password hashing
        const salt = (0, helper_1.random)();
        // Create a new user with the provided information
        const newUser = yield (0, users_1.createUser)({
            email,
            username,
            authentication: {
                // Hash the password using the generated salt
                password: (0, helper_1.hashPassword)(salt, password),
                salt: salt,
            },
        });
        // Respond with a success status and the newly created user data
        res.status(201).json(newUser).end();
    }
    catch (error) {
        // Handle any errors that occur during registration
        console.error(error);
        // Respond with a 404 status (should probably be changed to a more appropriate status)
        return res.status(404).send("Error during registration");
    }
});
exports.register = register;
// Login User
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract email and password from the request body
        const { email, password } = req.body;
        // Check if either email or password is missing
        if (!email || !password) {
            return res.status(404).send("Invalid inputs");
        }
        // Retrieve the user's data including salt and password hash for authentication
        const user = yield (0, users_1.getUserByEmail)(email).select("+authentication.salt +authentication.password");
        // Check if a user with the provided email exists
        if (!user) {
            return res.status(404).send("User doesn't exist");
        }
        // Calculate the expected password hash using the retrieved salt and provided password
        const expectedHash = (0, helper_1.hashPassword)(user.authentication.salt, password);
        // Compare the expected hash with the stored password hash
        if (expectedHash !== user.authentication.password) {
            // If the hashes do not match, return a conflict response
            return res.status(409).send("Password or email is incorrect");
        }
        // Generate a new session token and update it for the user
        const salt = (0, helper_1.random)();
        user.authentication.sessionToken = (0, helper_1.hashPassword)(salt, user._id.toString());
        yield user.save();
        // Set a cookie with the session token for future authentication
        res.cookie("ISMAIL-AUTH", user.authentication.sessionToken, {
            domain: "localhost",
            path: "/",
        });
        // Respond with a success status and the user's data
        res.status(200).json(user).end();
    }
    catch (error) {
        // Handle any errors that occur during login
        console.error(error);
    }
});
exports.login = login;
//# sourceMappingURL=authController.js.map