import React, { Component } from "react";
import CardItem from "../CardItem/CardItem";
import "./ShopInfo.css";

class ShopInfo extends Component {
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
              spicy={pizza.spicy}
              vegetarian={pizza.vegetarian}
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

export default ShopInfo;
