import { Response, Request } from "express";
import { createUser, getUserByEmail } from "../Models/users";
import { hashPassword, random } from "../helpers/helper";

// Register User
export const register = async (req: Request, res: Response) => {
  try {
    // Extract username, email, and password from the request body
    const { username, email, password } = req.body;

    // Check if any of the required fields are missing
    if (!username || !email || !password) {
      res.status(404).json({ error: "Invalid inputs" });
      return; // Exit the function early
    }

    // Check if a user with the same email already exists
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      // If a user with the same email exists, return a conflict response
      return res.status(409).send("User already exists");
    }

    // Generate a random salt for password hashing
    const salt = random();

    // Create a new user with the provided information
    const newUser = await createUser({
      email,
      username,
      authentication: {
        // Hash the password using the generated salt
        password: hashPassword(salt, password),
        salt: salt,
      },
    });

    // Respond with a success status and the newly created user data
    res.status(201).json(newUser).end();
  } catch (error) {
    // Handle any errors that occur during registration
    console.error(error);

    // Respond with a 404 status (should probably be changed to a more appropriate status)
    return res.status(404).send("Error during registration");
  }
};

// Login User
export const login = async (req: Request, res: Response) => {
  try {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Check if either email or password is missing
    if (!email || !password) {
      return res.status(404).send("Invalid inputs");
    }

    // Retrieve the user's data including salt and password hash for authentication
    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    // Check if a user with the provided email exists
    if (!user) {
      return res.status(404).send("User doesn't exist");
    }

    // Calculate the expected password hash using the retrieved salt and provided password
    const expectedHash = hashPassword(user.authentication.salt, password);

    // Compare the expected hash with the stored password hash
    if (expectedHash !== user.authentication.password) {
      // If the hashes do not match, return a conflict response
      return res.status(409).send("Password or email is incorrect");
    }

    // Generate a new session token and update it for the user
    const salt = random();
    user.authentication.sessionToken = hashPassword(salt, user._id.toString());
    await user.save();

    // Set a cookie with the session token for future authentication
    res.cookie("ISMAIL-AUTH", user.authentication.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    // Respond with a success status and the user's data
    res.status(200).json(user).end();
  } catch (error) {
    // Handle any errors that occur during login
    console.error(error);
  }
};
