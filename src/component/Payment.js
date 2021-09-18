import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Payment = ({ children, cart, checkout }) => {
  const total_prices = cart.reduce(function (result, item) {
    return result + item.totalPrice;
  }, 0);
  return (
    <>
      <div className="col">
        <h5>Payment</h5>
      </div>
      <hr />
      {children}
      {cart.length === 0 ? (
        <div></div>
      ) : (
        <>
          <div className="row mt-3">
            <div className="col">
              <h3>Total :{""}</h3>
            </div>
            <div className="col text-right">
              <h3 className="text-success text-right font-weight-bold">
                ${total_prices}
              </h3>
            </div>
          </div>
          <button
            onClick={() => checkout(cart)}
            className="btn btn-primary btn-lg btn-block font-weight-bold sadow mt-4"
          >
            <FontAwesomeIcon className="mr-2" icon={faShoppingCart} />
            Checkout
          </button>
        </>
      )}
    </>
  );
};

export default Payment;
