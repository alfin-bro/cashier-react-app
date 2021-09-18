import {
  faMinus,
  faPlus,
  faTimes,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import ReactModal from "react-modal";
import swal from "sweetalert";
import { api } from "../api/api";

const ModalCompoment = ({
  order,
  isOpen,
  setIsOpen,
  modalClose,
  setOrder,
  getCart,
}) => {
  ReactModal.defaultStyles.overlay.backgroundColor = "#00000088";
  const style = {
    content: {
      padding: "1rem 2rem",
      width: "79%",
      margin: " 0 auto",
      borderRadius: "20px",
    },
  };
  const plus = () => {
    setOrder({
      ...order,
      amount: order.amount + 1,
      totalPrice: order.product.price * (order.amount + 1),
    });
  };

  const onSubmitModal = (e) => {
    e.preventDefault();
    const updateOrder = {
      amount: order.amount,
      totalPrice: order.totalPrice,
      product: order.product,
      notes: order.notes,
    };
    api.put(`cart/${order.id}`, updateOrder).then((res) => {
      swal({
        title: "Updated!",
        text: "Your order success update, checkout now!",
        button: false,
        icon: "success",
        timer: 1500,
      });
      console.log(res.data);
      modalClose();
      getCart();
    });
  };

  const minus = () => {
    if (order.amount !== 1) {
      setOrder({
        ...order,
        amount: order.amount - 1,
        totalPrice: order.product.price * (order.amount - 1),
      });
    }
  };

  const onChangeModal = (e) => {
    setOrder({
      ...order,
      notes: e.target.value,
    });
  };

  const removeOrder = () => {
    api
      .delete(`cart/${order.id}`)
      .then((res) => {
        getCart();
        modalClose();
        swal({
          title: "Your order has been removed",
          text: "Get another order soon at our restaurant",
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      shouldCloseOnOverlayClick={true}
      contentLabel="example"
      ariaHideApp={false}
      style={style}
    >
      <div className="row mb-lg-5">
        <div className="col title p-0 p-md-3 d-flex justify-content-between align-items-center">
          <h3>Edit your order</h3>
          <FontAwesomeIcon
            className="cursor-pointer"
            onClick={() => modalClose()}
            icon={faTimes}
          />
        </div>
      </div>
      <div className="row">
        <div className="col col-xl-5 d-none d-lg-block">
          <div className="box">
            <img src={order?.product?.image} alt={order?.product?.name} />
          </div>
        </div>
        <div className="col p-0 col-xl-6">
          <h3>{order?.product?.name}</h3>
          <p className="text-muted">
            {order?.product?.category?.name} | ${order?.product?.price}
          </p>
          <h4>Total Price : ${order?.totalPrice}</h4>
          <div className="row">
            <div className="col col-lg-5 my-2">
              <h5>Amount</h5>
              <div className="d-flex p-0  align-items-center">
                <button onClick={() => minus()} className="btn btn-danger">
                  <FontAwesomeIcon icon={faMinus} />
                </button>
                <span className="text-info mx-3">{order?.amount}</span>
                <button onClick={() => plus()} className="btn btn-success">
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
              <div className="col-12 p-0">
                <form onSubmit={onSubmitModal} className="form-group my-3">
                  <label htmlFor="input">Notes</label>
                  <input
                    onChange={onChangeModal}
                    type="text"
                    className="form-control mb-3"
                    placeholder="Spicy, Hot, Freeze"
                  />
                  <button className="btn btn-primary btn-lg btn-block sadow">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col d-flex justify-content-end px-0 p-lg-5">
          <button
            onClick={() => removeOrder()}
            className="btn btn-danger btn-lg shadow-lg"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default ModalCompoment;
