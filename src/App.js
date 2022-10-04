import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import * as Path from "./routeNames";
import Header from "./components/Header/Header";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import BecomeSeller from "./pages/BecomeSeller/BecomeSeller";
import AddBook from "./pages/Books/AddBook/AddBook";
import AllCartList from "./pages/Cart/AllCartList/AllCartList";
import BookDetail from "./pages/Books/BookDetail/BookDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path={Path.HOME} element={<Home />} />
        <Route path={Path.AUTH} element={<Auth />} />
        <Route path={Path.PROFILE} element={<Profile />} />
        <Route path={Path.BECOME_SELLER} element={<BecomeSeller />} />
        <Route path={Path.MY_CARTS} element={<AllCartList />} />
        <Route path={Path.ADD_BOOK} element={<AddBook />} />
        <Route path={Path.BOOK_DETAIL + ":slug"} element={<BookDetail />} />
      </Routes>
    </>
  );
}

export default App;
