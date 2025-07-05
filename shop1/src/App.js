import "./App.css";
import Shop from "./components/Shop/Shop";
import belarusianPizzas from "./data/products.json";

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>Пиццерия</h1>
        <p>Доставка пиццы в Минске</p>
      </header>
      <Shop
        address="123 Main St"
        shopName="Anytown"
        products={belarusianPizzas}
      />
    </div>
  );
}

export default App;
