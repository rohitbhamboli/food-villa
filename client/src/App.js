import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./actions/userActions";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Main from "./components/Main";
import Login from "./components/Login";
import Contact from "./components/Contact.js";
import About from "./components/About.js";
import Menu from "./components/Menu.js";
import NotFound from "./components/NotFound.js";
import Loader from "./components/Loader.js";
import Reservation from "./components/Reservation.js";
import Cart from "./components/Cart.js";
import PublicRoute from "./components/PublicRoute.js";

function App() {
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    // Dispatch the loadUser action when the app mounts.
    // This checks if a user is already logged in from a previous session.
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      {loading && <Loader />}
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/booking" element={<Reservation />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;