import crypto from "crypto";

const password = "1234";
const salt = "salDePrueba";

const hash1 = crypto
    .scryptSync(password, salt, 64)
    .toString("hex");

const hash2 = crypto
    .scryptSync(password, salt, 64)
    .toString("hex");

const hash3 = crypto
    .scryptSync("12345", salt, 64)
    .toString("hex");

const hash4 = crypto
    .scryptSync(password, "otraSal", 64)
    .toString("hex");

console.log("HASH 1:");
console.log(hash1);

console.log("\nHASH 2:");
console.log(hash2);

console.log("\n¿Mismo texto + misma sal = mismo hash?");
console.log(hash1 === hash2);

console.log("\n¿Texto diferente = hash diferente?");
console.log(hash1 !== hash3);

console.log("\n¿Sal diferente = hash diferente?");
console.log(hash1 !== hash4);