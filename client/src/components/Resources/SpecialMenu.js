import pizza from "../../images/pizza-img.jpg";
import noodle from "../../images/noodle-img.jpg";
import burger from "../../images/burger-img.jpg";
import sandwich from "../../images/sandwich-img.jpg";
import wrap from "../../images/wrap-img.jpg";
import shake from "../../images/shake-img.jpg";

const specialMenu = [
  {
    image: pizza,
    name: "Pizza's",
    type1: "Single Topping",
    type2: "Double Topping",
    type3: "Cheese & Specials",
    price1: 60,
    price2: 80,
    price3: 150,
  },
  {
    image: noodle,
    name: "Noodles",
    type1: "Simple Veg",
    type2: "Paneer Noodles",
    type3: "Hakka Noodles",
    price1: 50,
    price2: 80,
    price3: 100,
  },
  {
    image: burger,
    name: "Burgers",
    type1: "Aloo Tikki",
    type2: "Cheese Burger",
    type3: "Maharaja Burger",
    price1: 30,
    price2: 50,
    price3: 90,
  },
  {
    image: sandwich,
    name: "Sandwich",
    type1: "Veggie Grilled",
    type2: "Grilled Corn",
    type3: "Cheese Grilled",
    price1: 50,
    price2: 60,
    price3: 90,
  },
  {
    image: wrap,
    name: "Wraps",
    type1: "Veg Wrap",
    type2: "Paneer Wrap",
    type3: "Spicy Jalapeno",
    price1: 60,
    price2: 70,
    price3: 80,
  },
  {
    image: shake,
    name: "Beverages",
    type1: "Flavoured Shakes",
    type2: "Chocolate Shakes",
    type3: "Cold Coffee",
    price1: 60,
    price2: 70,
    price3: 90,
  },
];

export default specialMenu;
