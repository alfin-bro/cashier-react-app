import {
  faCoffee,
  faIceCream,
  faLongArrowAltRight,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { api } from "../api/api";

const Category = ({ showCategories, chooseCategories }) => {
  const [categories, setCategories] = useState([]);
  const getCategories = () => {
    api
      .get("/categories")
      .then((result) => setCategories(result.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCategories();
  }, []);

  const Icon = ({ name }) => {
    if (name === "Food")
      return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
    if (name === "Drink")
      return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
    if (name === "Snack")
      return <FontAwesomeIcon icon={faIceCream} className="mr-2" />;
  };

  return (
    <>
      <div className="col">
        <h5>Category</h5>
        <hr />
        <ul className="list-group">
          {categories &&
            categories.map((category) => {
              return (
                <li
                  key={category.id}
                  className={
                    showCategories === category.name
                      ? "list-group-item click bg-primary text-white"
                      : "list-group-item click"
                  }
                  onClick={() => chooseCategories(category.name)}
                >
                  <h5>
                    <Icon name={category.name} />
                    {category.name}
                  </h5>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
};

export default Category;
