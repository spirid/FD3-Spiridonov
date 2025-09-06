const sequelize = require("../config/database");
const { Product } = require("../models"); // Используем импорт из models/index.js

const seedDatabase = async () => {
  try {
    // Подключаемся к базе данных
    await sequelize.authenticate();
    console.log("✅ Connection to database established");

    // Синхронизируем модель (создаст таблицу если ее нет)
    await Product.sync({ force: true });
    console.log("✅ Product table synchronized");

    const products = [];

    for (let i = 1; i <= 1000; i++) {
      products.push({
        name: `Товар ${i}`,
        price: parseFloat((Math.random() * 10000 + 100).toFixed(2)),
        description: `Описание товара ${i}`,
        category: ["электроника", "одежда", "книги", "спорт"][i % 4],
        image: `https://picsum.photos/200/300?random=${i}`,
        stockQuantity: Math.floor(Math.random() * 100),
        rating: parseFloat((Math.random() * 5).toFixed(1)),
      });
    }

    await Product.bulkCreate(products);
    console.log("✅ 1000 товаров добавлено!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Ошибка:", error);
    process.exit(1);
  }
};

seedDatabase();
