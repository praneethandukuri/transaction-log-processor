import { assertEquals } from "jsr:@std/assert";
import {
  parseArguments,
  generateTransactions,
  saveTransactions,
} from "../src/generateLog.js";

describe("Argument Parsing", () => {
  test("Default Case", () => {
    const args = [];
    const { count, allowInvalid, accounts } = parseArguments(args);
    assertEquals(count, 20);
    assertEquals(allowInvalid, false);
    assertEquals(accounts, ["A123", "B456", "C789", "D012"]);
  });

  test("Custom Count", () => {
    const args = ["10"];
    const { count } = parseArguments(args);
    assertEquals(count, 10);
  });

  test("Custom Accounts", () => {
    const args = ["15", "X111", "Y222", "Z333"];
    const { accounts } = parseArguments(args);
    assertEquals(accounts, ["X111", "Y222", "Z333"]);
  });

  test("Invalid Transactions Enabled", () => {
    const args = ["20", "--invalid"];
    const { allowInvalid } = parseArguments(args);
    assertEquals(allowInvalid, true);
  });

  test("Custom Count, Accounts, and Invalid Transactions", () => {
    const args = ["25", "--invalid", "P555", "Q666", "R777"];
    const { count, allowInvalid, accounts } = parseArguments(args);
    assertEquals(count, 25);
    assertEquals(allowInvalid, true);
    assertEquals(accounts, ["P555", "Q666", "R777"]);
  });

  test("No Accounts Provided", () => {
    const args = ["30", "--invalid"];
    const { accounts } = parseArguments(args);
    assertEquals(accounts, ["A123", "B456", "C789", "D012"]);
  });

  test("Large Transaction Count", () => {
    const args = ["1000"];
    const { count } = parseArguments(args);
    assertEquals(count, 1000);
  });

  test("Empty Count (Invalid Input)", () => {
    const args = ["abc"];
    const { count } = parseArguments(args);
    assertEquals(count, 20);
  });

  test("Invalid Flag Handling", () => {
    const args = ["50", "--unknown"];
    const { count, allowInvalid } = parseArguments(args);
    assertEquals(count, 50);
    assertEquals(allowInvalid, false);
  });
});

describe("Transaction Generation", () => {
  test("Generate Transactions", () => {
    const accounts = ["A123", "B456"];
    const transactions = generateTransactions(5, accounts, false);
    assertEquals(transactions.length, 5);
    transactions.forEach((txn) => {
      assertEquals(accounts.includes(txn.account), true);
      assertEquals(["credit", "debit"].includes(txn.type), true);
      assertEquals(txn.amount > 0, true);
    });
  });
});

describe("Transaction Saving", () => {
  test("Save Transactions", () => {
    const transactions = [
      { id: 1, type: "credit", amount: 100, account: "A123" },
    ];
    saveTransactions(transactions, "mock_transactions.json");
    console.log("Test passed: Transactions saved successfully.");
  });
});
