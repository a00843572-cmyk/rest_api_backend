import crypto from "crypto";


export const hashPassword = (password) => {

    const salt = crypto
        .randomBytes(16)
        .toString("hex");

    const hash = crypto
        .scryptSync(password, salt, 64)
        .toString("hex");

    return `${salt}:${hash}`;
};


export const verifyPassword = (
    password,
    storedPassword
) => {

    const [salt, storedHash] =
        storedPassword.split(":");

    const hash = crypto
        .scryptSync(password, salt, 64);

    const storedHashBuffer =
        Buffer.from(storedHash, "hex");

    return crypto.timingSafeEqual(
        hash,
        storedHashBuffer
    );
};