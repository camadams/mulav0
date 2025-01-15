async function getSpendings() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const spendingsData = [
        { id: 1, amount: 50, description: "Groceries" },
        { id: 2, amount: 20, description: "Transport" },
        { id: 3, amount: 100, description: "Utilities" },
      ];
      resolve(spendingsData);
    }, 2000); // Simulates a 2-second delay
  });
}
