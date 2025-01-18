export const readTransactions = () => {
  try {
    const fileContent = Deno.readTextFileSync("transactions.json");
    const transactions = JSON.parse(fileContent);

    return transactions;
  } catch {
    throw new Error(
      "Error: Unable to process transactions. Please check the file and try again."
    );
  }
};
