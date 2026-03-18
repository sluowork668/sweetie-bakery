import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const realProducts = [
  {
    id: "101",
    name: "Mochi Donuts (12 pcs)",
    category: "dessert",
    price: 40.88,
    description: "Assorted mochi donuts with chewy texture and unique flavors.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "102",
    name: "Mini Kroffle",
    category: "pastry",
    price: 4.5,
    description: "Mini croissant waffle with crispy outside and soft inside.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "103",
    name: "Sea Salt French Cream Thai Tea",
    category: "drink",
    price: 8.04,
    description: "Classic Thai tea topped with sea salt cream foam.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "104",
    name: "Crispy Egg Rolls",
    category: "dessert",
    price: 3.44,
    description: "Crispy sweet egg rolls with a light texture.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "105",
    name: "Seaweed Pork Floss Egg Roll",
    category: "savory",
    price: 14.94,
    description: "Savory egg rolls with seaweed and pork floss.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "106",
    name: "Coconut Egg Rolls",
    category: "dessert",
    price: 14.94,
    description: "Sweet crispy egg rolls with rich coconut flavor.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "107",
    name: "Scallion Pork Floss Cake",
    category: "savory",
    price: 13.79,
    description: "Soft chiffon cake topped with pork floss and scallions.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "108",
    name: "Tiramisu Cuicuidun",
    category: "dessert",
    price: 6.32,
    description: "Crispy donut-style pastry with tiramisu flavor.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "109",
    name: "Blueberry Cuicuidun",
    category: "dessert",
    price: 6.32,
    description: "Sweet and sour blueberry crispy donut.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "110",
    name: "Mango Cuicuidun",
    category: "dessert",
    price: 6.32,
    description: "Crispy pastry with mango flavor.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "111",
    name: "Original Cuicuidun",
    category: "dessert",
    price: 5.75,
    description: "Original crispy pastry with a light buttery flavor.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "112",
    name: "Chocolate Cuicuidun",
    category: "dessert",
    price: 6.32,
    description: "Crispy pastry filled with rich chocolate flavor.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "113",
    name: "Matcha Cuicuidun",
    category: "dessert",
    price: 6.32,
    description: "Crispy pastry with earthy matcha flavor.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "114",
    name: "Strawberry Cuicuidun",
    category: "dessert",
    price: 6.32,
    description: "Crispy pastry with sweet strawberry flavor.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "115",
    name: "Custard Cuicuidun",
    category: "dessert",
    price: 6.32,
    description: "Crispy pastry with creamy custard filling.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "116",
    name: "Ube Cuicuidun",
    category: "dessert",
    price: 6.32,
    description: "Crispy pastry flavored with sweet purple yam.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "117",
    name: "Taro Mochi Bread",
    category: "bread",
    price: 5.95,
    description: "Soft bread with taro flavor and chewy mochi texture.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "118",
    name: "Red Bean Bread",
    category: "bread",
    price: 4.95,
    description: "Soft bakery bread filled with sweet red bean paste.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "119",
    name: "Pork Floss Bun",
    category: "savory",
    price: 5.5,
    description: "Soft bun topped with savory pork floss.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "120",
    name: "Milk Bread",
    category: "bread",
    price: 6.25,
    description: "Fluffy milk bread with a soft and tender texture.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "121",
    name: "Croissant",
    category: "pastry",
    price: 4.5,
    description: "Buttery flaky pastry.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "122",
    name: "Almond Croissant",
    category: "pastry",
    price: 5.75,
    description: "Croissant topped with sliced almonds and sweet filling.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "123",
    name: "Chocolate Donut",
    category: "dessert",
    price: 4.25,
    description: "Soft donut coated with chocolate glaze.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "124",
    name: "Blueberry Muffin",
    category: "dessert",
    price: 4.75,
    description: "Classic muffin with sweet blueberries.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "125",
    name: "Basque Cheesecake",
    category: "dessert",
    price: 7.5,
    description: "Creamy cheesecake with a caramelized top.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "126",
    name: "Baguette",
    category: "bread",
    price: 4.95,
    description: "Classic crusty French-style bread.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "127",
    name: "Matcha Latte",
    category: "drink",
    price: 6.95,
    description: "Smooth latte with rich matcha flavor.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "128",
    name: "Thai Milk Tea",
    category: "drink",
    price: 6.95,
    description: "Sweet and creamy Thai-style milk tea.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "129",
    name: "Sesame Mochi Bun",
    category: "bread",
    price: 5.5,
    description: "Chewy bun with black sesame flavor.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
  {
    id: "130",
    name: "Egg Tart",
    category: "dessert",
    price: 3.95,
    description: "Flaky tart shell with silky egg custard filling.",
    imageUrl: "",
    available: true,
    isSample: false,
    createdAt: new Date("2025-01-01"),
  },
];

const productNames = [
  "Sample Bread",
  "Sample Cake",
  "Sample Tart",
  "Sample Bun",
  "Sample Donut",
  "Sample Muffin",
  "Sample Pastry",
  "Sample Cookie",
  "Sample Sandwich",
  "Sample Roll",
];

const categories = ["bread", "pastry", "dessert", "savory", "drink"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomPrice(min = 3, max = 18) {
  return Number((Math.random() * (max - min) + min).toFixed(2));
}

function generateSyntheticProducts(count) {
  const syntheticProducts = [];

  for (let i = 0; i < count; i += 1) {
    const idNumber = 1000 + i;
    const category = randomItem(categories);
    const baseName = randomItem(productNames);

    syntheticProducts.push({
      id: String(idNumber),
      name: `${baseName} ${i + 1}`,
      category,
      price: randomPrice(),
      description: `Synthetic ${category} item used to satisfy the 1000-record requirement.`,
      imageUrl: "",
      available: Math.random() > 0.1,
      isSample: true,
      createdAt: new Date("2025-01-01"),
    });
  }

  return syntheticProducts;
}

async function seedProducts() {
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const productsCollection = db.collection("products");

    await productsCollection.deleteMany({});

    const syntheticProducts = generateSyntheticProducts(1000);
    const allProducts = [...realProducts, ...syntheticProducts];

    await productsCollection.insertMany(allProducts);

    console.log(`Inserted ${allProducts.length} products successfully.`);
    console.log(`Real products: ${realProducts.length}`);
    console.log(`Synthetic products: ${syntheticProducts.length}`);
  } catch (error) {
    console.error("Error seeding products:", error);
  } finally {
    await client.close();
  }
}

seedProducts();
