
import {
  issueToken,
  consumeToken
} from "./token-service.js";

const id = await issueToken({ userId: 42 }, 60);

console.log("issued token:", id);

// Five consumers attempt to use the same token
const results = await Promise.all([
  consumeToken(id),
  consumeToken(id),
  consumeToken(id),
  consumeToken(id),
  consumeToken(id)
]);

const winners = results.filter((r) => r.ok).length;

console.log("winners:", winners);

console.assert(
  winners === 1,
  "SINGLE-USE VIOLATED!"
);

if (winners !== 1) {
  process.exitCode = 1;
} else {
  console.log("PASS: token was single-use.");
}

process.exit();
