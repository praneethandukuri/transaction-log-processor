# TODO List for Transaction Log Processor

## Phase 1: File Reading and Parsing

- [ ] **Read the Transaction Log File**
  - Use `Deno.readTextFileSync()` to read the content of `transactions.json`.
  - Check if the file exists (optional, depends on environment).
- [ ] **Parse the File Content**

  - Use `JSON.parse()` to convert the string content into a JavaScript object.

- [ ] **Log the Parsed Data**

  - Log the parsed transactions to verify they were read and parsed correctly.

- [ ] **Handle File Read Errors**

  - Add a `try-catch` block to catch any errors during file reading or parsing.
  - Log a user-friendly error message if there's a problem (e.g., `"Error: Unable to process transactions. Please check the file and try again."`).

- [ ] **Test the File Parsing**
  - Create a `transactions.json` file with the sample data.
  - Run the script and verify the correct output in the console.
  - Check for errors (such as malformed JSON or missing file).

---

## Phase 2: Summarize Account Balances

- [ ] **Initialize an Empty Account Balances Object**

  - Create an empty object to store account balances (e.g., `{}`).

- [ ] **Process Each Transaction**

  - Loop through the transactions array.
  - Check the transaction type (credit or debit).
  - Update the balance for the corresponding account.
    - If "credit", add the amount to the account balance.
    - If "debit", subtract the amount from the account balance.

- [ ] **Log the Account Balances**

  - Output the final balance for each account after processing all transactions.

- [ ] **Test Account Balances Calculation**
  - Verify correct balances by using the sample data from `transactions.json`.

---

## Phase 3: Handle Invalid Transactions (Bonus Challenge)

- [ ] **Identify Invalid Transactions**

  - Check for negative amounts or unknown types.
  - Log an error if any transaction is invalid (e.g., `"Transaction ID [id] has invalid data: [error description]"`).

- [ ] **Skip Invalid Transactions**

  - Modify the loop to skip invalid transactions and continue processing the valid ones.

- [ ] **Test Invalid Transactions Handling**
  - Add a transaction with invalid data (negative amount or unknown type).
  - Ensure the invalid transaction is skipped and the program continues with valid ones.

---

## Phase 4: Transaction Breakdown

- [ ] **Count Total Transactions**

  - Track the total number of transactions (valid ones only).

- [ ] **Track Credit and Debit Transactions**

  - Count how many are credit transactions and how many are debit transactions.

- [ ] **Log Transaction Breakdown**

  - Log the total number of transactions, credits, and debits.

- [ ] **Test the Transaction Breakdown**
  - Verify the transaction counts with the sample data from `transactions.json`.

---

## Phase 5: Category and Tag-based Summaries (Optional)

- [ ] **Track Categories for Credits and Debits**

  - Create separate objects for credit and debit categories (e.g., `{}`).
  - Sum amounts for each category and account.

- [ ] **Output Category Summaries**

  - Log category breakdowns for each account (e.g., "Salary", "Rent", "Groceries").

- [ ] **Track Total by Tag**

  - Create a tag-based summary (e.g., salary, rent, groceries) to track totals for each tag.

- [ ] **Log Tag-based Summaries**

  - Log the total amount for each tag across all transactions.

- [ ] **Test Category and Tag Summaries**
  - Verify that categories and tags are correctly logged and summarized.

---

## Phase 6: Code Cleanup and Final Testing

- [ ] **Clean Up Code**

  - Refactor and organize the code for clarity and maintainability.

- [ ] **Add Comments**

  - Comment the key sections of the code to explain the logic.

- [ ] **Final Testing**

  - Test with edge cases:
    - Empty file.
    - File with invalid JSON.
    - File with invalid transactions.
  - Ensure everything works as expected.

- [ ] **Update Documentation**
  - Add comments or update README to explain how the processor works.

---

## Testing Throughout

- **Unit Testing**: Consider testing each part (e.g., file reading, balance calculation, invalid transaction handling) individually as you complete each phase.
- **Progressive Testing**: After each major step, run the script and verify the output to ensure correctness.
