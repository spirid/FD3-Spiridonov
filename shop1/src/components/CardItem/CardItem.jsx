import React, { Component } from "react";
import "./CardItem.css";

class CardItem extends Component {
  render() {
    const { name, price, imageUrl, stock, description } = this.props;

    return (
      <div className="product-card">
        <img src={imageUrl} alt={name} className="product-image" />
        {stock > 0 ? (
          <div className="product-badge">В наличии: {stock}</div>
        ) : (
          <div className="product-not-in-stock">Нет в наличии</div>
        )}
        <h3 className="product-title">{name}</h3>
        <p className="product-description" title={description}>
          {description}
        </p>
        <div className="product-footer">
          <span className="product-price">{price} BYN</span>
          <button className="product-button">Заказать</button>
        </div>
      </div>
    );
  }
}

export default CardItem;
