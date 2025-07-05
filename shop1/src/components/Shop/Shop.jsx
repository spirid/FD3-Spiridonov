import React, { Component } from "react";
import CardItem from "../CardItem/CardItem";
import "./Shop.css";

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedItemId: null,
      products: props.products,
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

  handleDeleteItem = (id) => {
    this.setState((prevState) => ({
      products: prevState.products.filter((item) => item.id !== id),
      selectedItemId:
        prevState.selectedItemId === id ? null : prevState.selectedItemId,
    }));
  };

  renderCardItem = (pizza) => {
    return (
      <CardItem
        key={pizza.id}
        id={pizza.id}
        name={pizza.name}
        price={pizza.price}
        imageUrl={pizza.imageUrl || "https://example.com/images/pizza.jpg"}
        stock={pizza.stock}
        description={pizza.description}
        isSelected={this.state.selectedItemId === pizza.id}
        onClick={this.handleItemClick}
        onDelete={this.handleDeleteItem}
      />
    );
  };

  render() {
    return (
      <>
        <div className="pizza-list">
          {this.state.products.map(this.renderCardItem)}
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
