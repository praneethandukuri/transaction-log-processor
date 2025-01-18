export const readTransactions = () => {
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
