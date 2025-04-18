export const stores = [
  {
    name: "H-E-B",
    price: {
      Milk: 3.19,
      Eggs: 2.79,
      Bread: 2.29,
      Cheese: 4.39,
      Butter: 3.69,
      Apples: 1.79,
      Bananas: 0.59,
      Oranges: 2.89,
      Carrots: 1.39,
      Tomatoes: 2.29,
    },
    inventory: {
      Milk: 12,
      Eggs: 8,
      Bread: 15,
      Cheese: 10,
      Butter: 5,
      Apples: 18,
      Bananas: 25,
      Oranges: 10,
      Carrots: 7,
      Tomatoes: 9,
    },
    sale: {
      Milk: 5, // 5% off
      Bread: 10, // 10% off
    },
  },
  {
    name: "Whole Foods Market",
    price: {
      Milk: 3.99,
      Eggs: 3.49,
      Bread: 2.99,
      Cheese: 5.29,
      Butter: 4.49,
      Apples: 2.49,
      Bananas: 0.79,
      Oranges: 3.19,
      Carrots: 1.89,
      Tomatoes: 2.79,
    },
    inventory: {
      Milk: 10,
      Eggs: 12,
      Bread: 8,
      Cheese: 6,
      Butter: 4,
      Apples: 15,
      Bananas: 20,
      Oranges: 12,
      Carrots: 10,
      Tomatoes: 5,
    },
    sale: {
      Cheese: 15, // 15% off
      Butter: 10, // 10% off
    },
  },
  {
    name: "Sprouts Farmers Market",
    price: {
      Milk: 3.49,
      Eggs: 2.99,
      Bread: 2.59,
      Cheese: 4.79,
      Butter: 3.99,
      Apples: 1.99,
      Bananas: 0.69,
      Oranges: 2.99,
      Carrots: 1.49,
      Tomatoes: 2.49,
    },
    inventory: {
      Milk: 8,
      Eggs: 10,
      Bread: 12,
      Cheese: 7,
      Butter: 6,
      Apples: 20,
      Bananas: 30,
      Oranges: 15,
      Carrots: 9,
      Tomatoes: 8,
    },
    sale: {
      Apples: 5, // 5% off
      Bananas: 5, // 5% off
    },
  },
  {
    name: "Trader Joe's",
    price: {
      Milk: 3.29,
      Eggs: 2.69,
      Bread: 2.49,
      Cheese: 4.59,
      Butter: 3.79,
      Apples: 1.89,
      Bananas: 0.59,
      Oranges: 2.79,
      Carrots: 1.39,
      Tomatoes: 2.29,
    },
    inventory: {
      Milk: 15,
      Eggs: 9,
      Bread: 10,
      Cheese: 8,
      Butter: 5,
      Apples: 18,
      Bananas: 25,
      Oranges: 10,
      Carrots: 7,
      Tomatoes: 6,
    },
    sale: {
      Milk: 5, // 5% off
      Cheese: 10, // 10% off
    },
  },
  {
    name: "Midway Food Market",
    price: {
      Milk: 3.59,
      Eggs: 2.89,
      Bread: 2.69,
      Cheese: 4.99,
      Butter: 4.19,
      Apples: 2.09,
      Bananas: 0.79,
      Oranges: 3.09,
      Carrots: 1.59,
      Tomatoes: 2.59,
    },
    inventory: {
      Milk: 7,
      Eggs: 6,
      Bread: 8,
      Cheese: 5,
      Butter: 3,
      Apples: 12,
      Bananas: 15,
      Oranges: 9,
      Carrots: 4,
      Tomatoes: 3,
    },
    sale: {
      Butter: 5, // 5% off
      Apples: 10, // 10% off
    },
  },
  {
    name: "Kroger",
    price: {
      Milk: 3.49,
      Eggs: 2.99,
      Bread: 2.49,
      Cheese: 4.59,
      Butter: 3.99,
      Apples: 1.99,
      Bananas: 0.79,
      Oranges: 2.99,
      Carrots: 1.49,
      Tomatoes: 2.69,
    },
    inventory: {
      Milk: 5,  // Low stock
      Eggs: 10,
      Bread: 0,  // Out of stock
      Cheese: 12,
      Butter: 2,  // Low stock
      Apples: 20,
      Bananas: 30,
      Oranges: 8,
      Carrots: 2,  // Low stock
      Tomatoes: 0,  // Out of stock
    },
    sale: {
      Milk: 10,  // 10% off
      Butter: 15, // 15% off
      Cheese: 5   // 5% off
    }
  },
  {
    name: "Walmart",
    price: {
      Milk: 3.29,
      Eggs: 2.79,
      Bread: 2.39,
      Cheese: 4.49,
      Butter: 3.89,
      Apples: 2.49,
      Bananas: 0.69,
      Oranges: 3.29,
      Carrots: 1.69,
      Tomatoes: 2.49,
    },
    inventory: {
      Milk: 10,
      Eggs: 2,  // Low stock
      Bread: 3,
      Cheese: 4,
      Butter: 8,
      Apples: 15,
      Bananas: 20,
      Oranges: 0,  // Out of stock
      Carrots: 5,
      Tomatoes: 3,
    },
    sale: {
      Cheese: 20,  // 20% off
      Butter: 5   // 5% off
    }
  },
  {
    name: "Target",
    price: {
      Milk: 3.59,
      Eggs: 2.89,
      Bread: 2.59,
      Cheese: 4.79,
      Butter: 4.19,
      Apples: 2.99,
      Bananas: 0.89,
      Oranges: 3.49,
      Carrots: 1.59,
      Tomatoes: 2.99,
    },
    inventory: {
      Milk: 0,  // Out of stock
      Eggs: 6,
      Bread: 10,
      Cheese: 0, // Out of stock
      Butter: 3,
      Apples: 12,
      Bananas: 18,
      Oranges: 10,
      Carrots: 8,
      Tomatoes: 2,
    },
    sale: {
      Eggs: 5,  // 5% off
      Bread: 10  // 10% off
    }
  },
  {
    name: "Aldi",
    price: {
      Milk: 3.09,
      Eggs: 2.69,
      Bread: 2.19,
      Cheese: 3.99,
      Butter: 3.79,
      Apples: 1.89,
      Bananas: 0.59,
      Oranges: 2.69,
      Carrots: 1.29,
      Tomatoes: 2.19,
    },
    inventory: {
      Milk: 15,
      Eggs: 5,  // Low stock
      Bread: 2,  // Low stock
      Cheese: 9,
      Butter: 7,
      Apples: 20,
      Bananas: 25,
      Oranges: 12,
      Carrots: 4,  // Low stock
      Tomatoes: 6,
    },
    sale: {
      Apples: 10,  // 10% off
      Bananas: 5  // 5% off
    }
  },
  {
    name: "Costco",
    price: {
      Milk: 2.99,
      Eggs: 2.49,
      Bread: 1.99,
      Cheese: 3.79,
      Butter: 3.49,
      Apples: 1.49,
      Bananas: 0.79,
      Oranges: 2.79,
      Carrots: 1.39,
      Tomatoes: 2.19,
    },
    inventory: {
      Milk: 20,
      Eggs: 3,  // Low stock
      Bread: 5,
      Cheese: 12,
      Butter: 1,  // Low stock
      Apples: 25,
      Bananas: 35,
      Oranges: 20,
      Carrots: 5,  // Low stock
      Tomatoes: 10,
    },
    sale: {
      Milk: 5,  // 5% off
      Eggs: 10  // 10% off
    }
  },
];

// List of available items to search for
export const allItems = ["Milk", "Bread", "Butter", "Eggs", "Cheese", "Apples", "Bananas", "Oranges", "Carrots", "Tomatoes"];
