const readTransactions = () => {
  try {
    const fileContent = Deno.readTextFileSync("transactions.json");
    const transactions = JSON.parse(fileContent);

    return transactions;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error(
        "Error: Transaction file not found. Please check the file path."
      );
    }

    if (error instanceof SyntaxError) {
      throw new Error("Error: Malformed JSON in the transaction file.");
    }

    throw new Error(
      "Error: Unable to process transactions. Please check the file and try again."
    );
  }
};

export { readTransactions };

/*
const readTransactions = () => {
  try {
    const fileContent = Deno.readTextFileSync("transactions.json");
    return JSON.parse(fileContent);
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      throw new Error(
        "Error: Transaction file not found. Please check the file path."
      );
    }

    if (error instanceof SyntaxError) {
      throw new Error("Error: Malformed JSON in the transaction file.");
    }

    throw new Error(
      "Error: Unable to process transactions. Please check the file and try again."
    );
  }
};

const validateTransaction = ({ amount, type, id }) => {
  if (amount < 0) {
    return `Transaction ID ${id} has invalid data: Negative amount`;
  }

  if (!["credit", "debit"].includes(type)) {
    return `Transaction ID ${id} has invalid data: Unknown type`;
  }

  return null;
};

const summarizeAccountBalances = (transactions) => {
  return transactions.reduce((balances, transaction) => {
    const validationError = validateTransaction(transaction);

    if (validationError) {
      console.log(validationError);
      return balances;
    }

    const { account, amount, type } = transaction;

    balances[account] =
      updateAccountBalance(type, balances[account], amount) || 0;

    return balances;
  }, {});
};

const updateAccountBalance = (type, balance, amount) => {
  const transactionTypes = {
    credit: (balance, amount) => balance + amount,
    debit: (balance, amount) => balance - amount,
  };

  return transactionTypes[type](balance, amount);
};

const processTransactions = () => {
  try {
    const transactions = readTransactions();
    const balances = summarizeAccountBalances(transactions);

    console.log("\nAccount Balances:", balances);
  } catch (error) {
    console.error(error.message);
  }
};

processTransactions();
*/
