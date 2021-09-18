import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const Menus = ({ menu, addTocart }) => {
  return (
    <div className="col-sm-6 col-lg-4 mb-5">
      <div className="card">
        <div className="img-box">
          <img src={menu.image} className="img-box" alt={menu.name} />
        </div>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h5 className="card-title font-weight-bold">{menu.name}</h5>
              <p className="text-muted m-0">${menu.price}</p>
            </div>
            <button
              onClick={() => addTocart(menu)}
              className="btn btn-primary shadow-lg font-weight-bold"
            >
              <FontAwesomeIcon icon={faShoppingCart} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menus;
