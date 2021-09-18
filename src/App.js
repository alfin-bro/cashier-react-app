import { useEffect, useState } from "react";
import swal from "sweetalert";
import { api } from "./api/api";
import "./App.css";
import Cart from "./component/Cart";
import Category from "./component/Category";
import ListProduct from "./component/ListProduct";
import Menus from "./component/Menus";
import ModalCompoment from "./component/ModalCompoment";
import Navbar from "./component/Navbar";
import Payment from "./component/Payment";

function App() {
  const [menus, setMenus] = useState([]);
  const [cart, setCart] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState("Food");
  const [order, setOrder] = useState({});

  const chooseCategories = (value) => {
    console.log("click categories");
    setShowCategories(value);
    setMenus([]);
    getMenus();
  };

  const getMenus = async () => {
    await api
      .get(`/menus?category.name=${showCategories}`)
      .then((result) => setMenus(result.data))
      .catch((err) => console.log(err));
  };

  const getCart = async () => {
    await api.get("cart").then((res) => {
      setCart(res.data);
    });
  };

  const addTocartClick = (value) => {
    console.log("click card");
    api.get(`cart?product.id=${value.id}`).then((res) => {
      if (res.data.length === 0) {
        let newCart = {
          amount: 1,
          totalPrice: value.price,
          product: value,
        };
        api.post("cart", newCart).then((res) => {
          swal({
            title: "Success add to cart",
            text: `${res.data.product.name} success add to cart, checkout now!`,
            icon: "success",
            buttons: false,
            timer: 1500,
          });
          getCart();
        });
      } else {
        let newCart = {
          amount: res.data[0].amount + 1,
          totalPrice: res.data[0].totalPrice + value.price,
          product: value,
        };
        api.put(`cart/${res.data[0].id}`, newCart).then((res) => {
          swal({
            title: "Success add to cart",
            text: `${res.data.product.name} success add to cart, checkout now!`,
            icon: "success",
            buttons: false,
            timer: 1500,
          });
          getCart();
        });
      }
    });
  };

  const checkout = (data) => {
    const addToOrder = {
      totalPrice: data.totalPrice,
      menusOrder: data,
    };
    api.post("order", addToOrder).then((res) => {
      swal({
        title: "Thanks for order",
        text: "We will process your order soon, please wait",
        icon: "success",
        button: false,
        timer: 1500,
      }).then((value) => {
        switch (value) {
          default:
            cart.map((item) => {
              return api
                .delete(`cart/${item.id}`)
                .then((res) => {
                  getCart();
                })
                .catch((err) => err);
            });
            break;
        }
      });
    });
  };

  const modalOpen = (id) => {
    api
      .get(`cart/${id}`)
      .then((res) => {
        setOrder(res.data);
      })
      .catch((err) => console.log(err));
    setIsOpen(true);
  };

  const modalClose = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    getCart();
    getMenus();
  }, [showCategories]);

  return (
    <>
      <div className="fixed-top">
        <Navbar />
      </div>
      <div className="row px-5 py-5 my-5">
        <div className="col-xl-2 category py-lg-5 my-lg-5 fixed-top one">
          <Category
            chooseCategories={chooseCategories}
            showCategories={showCategories}
          />
        </div>
        <div className="col-lg-12 list offset-0 offset-xl-2 col-xl-7 mt-5 mt-xl-0">
          <ListProduct />
          <hr />
          <div className="row">
            {menus &&
              menus.map((menu) => {
                return (
                  <Menus addTocart={addTocartClick} key={menu.id} menu={menu} />
                );
              })}
          </div>
        </div>
        <div className="col-lg-12 col-xl-3 mt-5 mt-xl-0 mb-5">
          <Payment checkout={checkout} cart={cart}>
            {cart.length === 0 ? (
              <p className="text-danger text-center">Cart is empty</p>
            ) : (
              cart.map((item) => {
                return (
                  <Cart
                    modalOpen={modalOpen}
                    className="my-5"
                    key={item.id}
                    cart={item}
                  />
                );
              })
            )}
            <ModalCompoment
              getCart={getCart}
              order={order}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
              modalClose={modalClose}
              setOrder={setOrder}
            />
          </Payment>
        </div>
      </div>
    </>
  );
}

export default App;
