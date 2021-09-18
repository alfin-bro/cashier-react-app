import React from "react";

const Cart = ({ cart, modalOpen }) => {
  return (
    <>
      <div
        onClick={() => modalOpen(cart.id)}
        className="row mt-4 py-2 border-bottom cursor-pointer"
      >
        <div className="d-none d-sm-block col-sm-2 col-xl-2 ">
          <div className="img-thumb">
            <img src={cart.product.image} alt={cart.product.name} />
          </div>
        </div>
        <div className="col-6 col-sm-6 col-xl-6">
          <h6 className="font-weight-bold">{cart.product.name}</h6>
          <p className="text-muted">{cart.product.category.name}</p>
        </div>
        <div className="col-6 col-sm-4 col-lg-4">
          <p className="m-0 text-success text-right">
            <span className="badge badge-pill badge-primary">
              {cart.amount}
            </span>{" "}
            x ${cart.product.price}
          </p>
        </div>
      </div>
    </>
  );
};

export default Cart;
