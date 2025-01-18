import { assertEquals, assertThrows } from "jsr:@std/assert";

import { readTransactions } from "../src/generateLog.js";

function mockDenoReadTextFileSync(content) {
  return content;
}

Deno.test("Test with Valid Data", () => {
  const validJson = JSON.stringify([
    { id: 1, type: "credit", amount: 200, account: "A123" },
    { id: 2, type: "debit", amount: 100, account: "A123" },
    { id: 3, type: "credit", amount: 500, account: "B456" },
    { id: 4, type: "debit", amount: 300, account: "A123" },
    { id: 5, type: "credit", amount: 400, account: "B456" },
  ]);

  const originalReadTextFileSync = Deno.readTextFileSync;
  Deno.readTextFileSync = () => mockDenoReadTextFileSync(validJson);

  const transactions = readTransactions();

  assertEquals(transactions.length, 5);
  assertEquals(transactions[0].id, 1);
  assertEquals(transactions[0].type, "credit");

  Deno.readTextFileSync = originalReadTextFileSync;
});

Deno.test("Test Missing File", () => {
  const originalReadTextFileSync = Deno.readTextFileSync;
  Deno.readTextFileSync = () => {
    throw new Error("File not found");
  };

  const error = assertThrows(
    () => readTransactions(),
    Error,
    "Error: Unable to process transactions. Please check the file and try again."
  );

  assertEquals(
    error.message,
    "Error: Unable to process transactions. Please check the file and try again."
  );

  Deno.readTextFileSync = originalReadTextFileSync;
});

Deno.test("Test Malformed JSON", () => {
  const malformedJson =
    '[ { "id": 1, "type": "credit", "amount": 200, "account": "A123" }, { "id": 2, "type": "debit", "amount": 100, "account": "A123" ]';

  const originalReadTextFileSync = Deno.readTextFileSync;
  Deno.readTextFileSync = () => mockDenoReadTextFileSync(malformedJson);

  const error = assertThrows(
    () => readTransactions(),
    Error,
    "Error: Unable to process transactions. Please check the file and try again."
  );

  assertEquals(
    error.message,
    "Error: Unable to process transactions. Please check the file and try again."
  );

  Deno.readTextFileSync = originalReadTextFileSync;
});

Deno.test("Test Empty File", () => {
  const originalReadTextFileSync = Deno.readTextFileSync;
  Deno.readTextFileSync = () => mockDenoReadTextFileSync("");

  const error = assertThrows(
    () => readTransactions(),
    Error,
    "Error: Unable to process transactions. Please check the file and try again."
  );

  assertEquals(
    error.message,
    "Error: Unable to process transactions. Please check the file and try again."
  );

  Deno.readTextFileSync = originalReadTextFileSync;
});
