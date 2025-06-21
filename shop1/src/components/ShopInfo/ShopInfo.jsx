import React, { Component } from "react";
import "./ShopInfo.css";

class ShopInfo extends Component {
  render() {
    return (
      <div className="shop-info">
        <h2 className="shop-title">{this.props.shopName}</h2>
        <p className="shop-address">{this.props.address}</p>
      </div>
    );
  }
}

export default ShopInfo;
