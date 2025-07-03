import React, { Component } from "react";
import CardItem from "../CardItem/CardItem";
import "./Shop.css";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemId: null,
    };
  }

  handleItemClick = (id) => {
    if (this.state.selectedItemId !== id) {
      this.setState({ selectedItemId: id });
    }
    // Если убирать выделение нужно даже если клинкуем на тот же элемент раскоментить этот код
    // this.setState((prevState) => ({
    //   selectedItemId: prevState.selectedItemId === id ? null : id,
    // }));
  };

  render() {
    return (
      <>
        <div className="pizza-list">
          {this.props.products.map((pizza) => (
            <CardItem
              key={pizza.id}
              id={pizza.id}
              name={pizza.name}
              price={pizza.price}
              imageUrl={
                pizza.imageUrl || "https://example.com/images/pizza.jpg"
              }
              stock={pizza.stock}
              description={pizza.description}
              isSelected={this.state.selectedItemId === pizza.id}
              onClick={() => this.handleItemClick(pizza.id)}
            />
          ))}
        </div>
        <div className="shop-info">
          <h2 className="shop-title">{this.props.shopName}</h2>
          <p className="shop-address">{this.props.address}</p>
        </div>
      </>
    );
  }
}

export default Shop;
