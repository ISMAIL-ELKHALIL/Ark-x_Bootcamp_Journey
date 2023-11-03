import crypto from "crypto";

const secret = "My Api key";
export const random = () => {
  return crypto.randomBytes(128).toString("hex");
};

export const hashPassword = (salt: string, password: string): string => {
  return crypto
    .createHmac("sha256", [salt, password].join("/"))
    .update(secret)
    .digest("hex");
};
