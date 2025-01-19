const readFile = (filePath) => {
  try {
    return Deno.readTextFileSync(filePath);
  } catch {
    throw new Error("Error: Unable to read the file.");
  }
};

const parseJson = (content) => {
  try {
    return JSON.parse(content);
  } catch {
    throw new Error("Error: Malformed JSON in the transaction file.");
  }
};

const readTransactions = (filePath) => {
  const fileContent = readFile(filePath);
  return parseJson(fileContent);
};

const isValidAmount = (amount) => amount >= 0;

const isValidType = (type) => ["credit", "debit"].includes(type);

const validateTransaction = ({ amount, type, id }) => {
  if (!isValidAmount(amount)) {
    return `Transaction ID ${id} has invalid data: Negative amount`;
  }
  if (!isValidType(type)) {
    return `Transaction ID ${id} has invalid data: Unknown type`;
  }
  return null;
};

const updateAccountBalance = (type, balance, amount) => {
  const transactionTypes = {
    credit: (balance, amount) => balance + amount,
    debit: (balance, amount) => balance - amount,
  };

  return transactionTypes[type]
    ? transactionTypes[type](balance, amount)
    : balance;
};

const initializeAccountBalance = (balances, account) => {
  if (!balances[account]) {
    balances[account] = 0;
  }
};

const summarizeAccountBalances = ({ transactions }) => {
  return transactions.reduce((balances, transaction) => {
    const validationError = validateTransaction(transaction);
    if (validationError) {
      console.log(validationError);
      return balances;
    }

    const { account, amount, type } = transaction;
    initializeAccountBalance(balances, account);
    balances[account] = updateAccountBalance(type, balances[account], amount);
    return balances;
  }, {});
};

const processTransactions = (filePath) => {
  try {
    const transactions = readTransactions(filePath);
    const balances = summarizeAccountBalances(transactions);

    console.log("\nAccount Balances:", balances);
  } catch (error) {
    console.error(error.message);
  }
};

processTransactions("../data/transactionLog.json");
