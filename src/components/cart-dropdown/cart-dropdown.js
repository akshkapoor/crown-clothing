import React from "react";
import CustomButton from "../custom-button/custom-button";
import "./cart-dropdown.styles.scss";
import CartItem from "../cart-item/cart-item";
import { connect } from "react-redux";

const CartDropdown = ({cartItems}) => (
  <div className="cart-dropdown">
    <div className="cart-items">
    {
        cartItems.map(cartItem=><CartItem key={cartItem.id} item={cartItem} />)
    }
    </div>
    <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, null)(CartDropdown);
