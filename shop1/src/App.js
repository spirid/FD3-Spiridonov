import "./App.css";
import ShopInfo from "./components/ShopInfo/ShopInfo";
import CardItem from "./components/CardItem/CardItem";

const belarusianPizzas = [
  {
    id: 1,
    name: "Королевская",
    price: 12.99,
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018cfd6ceb3bb96afde7c6f8e24233/XXXL",
    stock: 8,
    description: "Ветчина, грибы, маслины, моцарелла, фирменный соус",
  },
  {
    id: 2,
    name: "Мясной Эксклюзив",
    price: 12.99,
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018cfd6ceb3bb96afde7c6f8e24233/XXXL",
    stock: 5,
    description: "Колбаса, ветчина, перец, лук, томатный соус",
  },
  {
    id: 3,
    name: "Чизбургер-пицца",
    price: 14.5,
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018cfd6ceb3bb96afde7c6f8e24233/XXXL",
    stock: 10,
    description: "Говядина, сыр чеддер, соленые огурцы, бургерный соус",
  },
  {
    id: 4,
    name: "Деревенская",
    price: 11.8,
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018cfd6ceb3bb96afde7c6f8e24233/XXXL",
    stock: 6,
    description: "Картофель, грибы, бекон, сметана, зелень",
  },
  {
    id: 5,
    name: "Четыре Сыра",
    price: 15.2,
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018cfd6ceb3bb96afde7c6f8e24233/XXXL",
    stock: 7,
    description: "Моцарелла, пармезан, дор-блю, чеддер, сливочный соус",
  },
  {
    id: 6,
    name: "Пепперони",
    price: 13.5,
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018cfd6ceb3bb96afde7c6f8e24233/XXXL",
    stock: 12,
    description: "Острая колбаса пепперони, сыр моцарелла, томатный соус",
  },
  {
    id: 7,
    name: "Гавайская",
    price: 12.3,
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018cfd6ceb3bb96afde7c6f8e24233/XXXL",
    stock: 4,
    description: "Ветчина, ананасы, сыр моцарелла, сливочный соус",
  },
  {
    id: 8,
    name: "Маргарита",
    price: 10.99,
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018cfd6ceb3bb96afde7c6f8e24233/XXXL",
    stock: 9,
    description: "Классическая пицца с томатами, моцареллой и базиликом",
  },
  {
    id: 9,
    name: "Охотничья",
    price: 14.99,
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018cfd6ceb3bb96afde7c6f8e24233/XXXL",
    stock: 0,
    description: "Охотничьи колбаски, грибы, лук, острый соус",
  },
  {
    id: 10,
    name: "Вегетарианская",
    price: 12.4,
    imageUrl:
      "https://avatars.mds.yandex.net/get-altay/10141118/2a0000018cfd6ceb3bb96afde7c6f8e24233/XXXL",
    stock: 7,
    description: "Свежие овощи, грибы, оливки, сыр моцарелла",
  },
];

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Пиццерия</h1>
        <p>Доставка пиццы в Минске</p>
      </header>
      <div className="pizza-list">
        {belarusianPizzas.map((pizza) => (
          <CardItem
            key={pizza.id}
            id={pizza.id}
            name={pizza.name}
            price={pizza.price}
            imageUrl={pizza.imageUrl || "https://example.com/images/pizza.jpg"}
            stock={pizza.stock}
            description={pizza.description}
            spicy={pizza.spicy}
            vegetarian={pizza.vegetarian}
          />
        ))}
      </div>
      <ShopInfo address="123 Main St" shopName="Anytown" />
    </div>
  );
}

export default App;
