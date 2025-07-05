import React, { Component } from "react";
import "./CardItem.css";

class CardItem extends Component {
  handleClick = () => {
    this.props.onClick(this.props.id);
  };

  handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm("Вы уверены, что хотите удалить этот товар?")) {
      this.props.onDelete(this.props.id);
    }
  };

  render() {
    const { name, price, imageUrl, stock, description, isSelected } =
      this.props;

    return (
      <div
        className={`product-card ${isSelected ? "selected" : ""}`}
        onClick={this.handleClick}
      >
        <img src={imageUrl} alt={name} className="product-image" />
        {stock > 0 ? (
          <div className="product-badge">В наличии: {stock}</div>
        ) : (
          <div className="product-not-in-stock">Нет в наличии</div>
        )}
        <h3 className="product-title">{name}</h3>
        <p className="product-description">{description}</p>
        <div className="product-footer">
          <span className="product-price">{price} BYN</span>
          <button
            className="product-button delete-btn"
            onClick={this.handleDelete}
          >
            Удалить
          </button>
        </div>
      </div>
    );
  }
}

export default CardItem;
