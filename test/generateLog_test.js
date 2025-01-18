import { assertEquals, assertThrows } from "jsr:@std/assert";
import { readTransactions } from "../src/generateLog.js";
import { describe, test } from "jsr:@std/testing/bdd";

const mockDenoReadTextFileSync = (content) => content;

describe("Test Group: Valid Data", () => {
  test("Test with Valid Data", () => {
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
});

describe("Test Group: File Error", () => {
  test("Test Missing File", () => {
    const originalReadTextFileSync = Deno.readTextFileSync;
    Deno.readTextFileSync = () => {
      throw new Deno.errors.NotFound("File not found");
    };

    const error = assertThrows(
      () => readTransactions(),
      Error,
      "Error: Transaction file not found. Please check the file path."
    );

    assertEquals(
      error.message,
      "Error: Transaction file not found. Please check the file path."
    );

    Deno.readTextFileSync = originalReadTextFileSync;
  });
});

describe("Test Group: JSON Parsing Error", () => {
  test("Test Malformed JSON", () => {
    const malformedJson =
      '[ { "id": 1, "type": "credit", "amount": 200, "account": "A123" }, { "id": 2, "type": "debit", "amount": 100, "account": "A123" ]';

    const originalReadTextFileSync = Deno.readTextFileSync;
    Deno.readTextFileSync = () => mockDenoReadTextFileSync(malformedJson);

    const error = assertThrows(
      () => readTransactions(),
      Error,
      "Error: Malformed JSON in the transaction file."
    );

    assertEquals(
      error.message,
      "Error: Malformed JSON in the transaction file."
    );

    Deno.readTextFileSync = originalReadTextFileSync;
  });
});
