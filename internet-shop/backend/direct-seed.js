const { Sequelize, DataTypes } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inStock: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    stockQuantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 2),
      defaultValue: 0,
    },
  },
  {
    tableName: "products",
    timestamps: true,
  }
);

const seedDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Connection to database established");

    await Product.sync({ force: true });
    console.log("✅ Product table created");

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
