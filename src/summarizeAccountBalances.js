const initializeAccountBalance = (balances, account) => {
  if (!balances[account]) {
    balances[account] = 0;
  }
};

const updateAccountBalance = (type, balance, amount) => {
  const transactionTypes = {
    credit: (balance, amount) => balance + amount,
    debit: (balance, amount) => balance - amount,
  };

  if (transactionTypes[type]) {
    return transactionTypes[type](balance, amount);
  } else {
    throw new Error(`Invalid transaction type: ${type}`);
  }
};

const summarizeAccountBalances = (transactions) => {
  return transactions.reduce((balances, { account, amount, type }) => {
    initializeAccountBalance(balances, account);

    balances[account] = updateAccountBalance(type, balances[account], amount);

    return balances;
  }, {});
};

export { summarizeAccountBalances };
