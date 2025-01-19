import { assertEquals } from "jsr:@std/assert";
import { summarizeAccountBalances } from "../src/summarizeAccountBalances.js";
import { describe, test } from "jsr:@std/testing/bdd";

describe("summarizeAccountBalances", () => {
  test("should summarize account balances correctly with valid data", () => {
    const transactions = [
      { id: 1, type: "credit", amount: 200, account: "A123" },
      { id: 2, type: "debit", amount: 100, account: "A123" },
      { id: 3, type: "credit", amount: 500, account: "B456" },
      { id: 4, type: "debit", amount: 300, account: "A123" },
      { id: 5, type: "credit", amount: 400, account: "B456" },
    ];

    const balances = summarizeAccountBalances(transactions);

    assertEquals(balances["A123"], -200);
    assertEquals(balances["B456"], 900);
  });

  test("should return an empty object for no transactions", () => {
    const emptyTransactions = [];
    const emptyBalances = summarizeAccountBalances(emptyTransactions);

    assertEquals(emptyBalances, {});
  });

  test("should calculate balances correctly with only debit transactions", () => {
    const transactions = [
      { id: 1, type: "debit", amount: 100, account: "A123" },
      { id: 2, type: "debit", amount: 50, account: "A123" },
      { id: 3, type: "debit", amount: 200, account: "B456" },
    ];

    const balances = summarizeAccountBalances(transactions);

    assertEquals(balances["A123"], -150);
    assertEquals(balances["B456"], -200);
  });

  test("should calculate balances correctly with only credit transactions", () => {
    const transactions = [
      { id: 1, type: "credit", amount: 100, account: "A123" },
      { id: 2, type: "credit", amount: 50, account: "A123" },
      { id: 3, type: "credit", amount: 200, account: "B456" },
    ];

    const balances = summarizeAccountBalances(transactions);

    assertEquals(balances["A123"], 150);
    assertEquals(balances["B456"], 200);
  });
});
