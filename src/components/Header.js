import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../utils/store";
export const Title = () => {
  return (
    <a href="/">
      <img
        src="data:image/png;base64,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"
        className="h-28 pr-2"
        alt="logo"
      ></img>
    </a>
  );
};

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex justify-between bg-pink-50 shadow-xl sticky top-0">
      <Title />
      <div className="nav-items">
        <ul className="flex py-9">
          <li className="px-2 hover:bg-pink-200 rounded-lg">
            <Link to="/">Home</Link>
          </li>
          <li className="px-2 hover:bg-pink-200 rounded-lg">
            <Link to="/about">About</Link>
          </li>
          <li className="px-2 hover:bg-pink-200 rounded-lg">
            <Link to="/contact">Contact</Link>
          </li>
          <li className="px-2 hover:bg-pink-200 rounded-lg">
            <Link to="/restaurant/instamart">Instamart</Link>
          </li>
          {/* <li className="px-2 hover:bg-pink-200 rounded-lg 2xl:">
            <Link to="/cart">🛒 - {cartItems.length} items</Link>
          </li> */}
          <li className="px-2 hover:bg-pink-200 rounded-lg">
          <Link to="/cart">  
            <div>
              <strong className="relative inline-flex items-center  border-gray-200 px-2.5 py-1.5 text-xs font-medium">
                {cartItems.length > 0 && <span class="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 flex justify-center items-center items">
                  <span>{cartItems.length}</span>
                </span>}
                <span className="drop-shadow-lg"> 🛒 </span>
              </strong>
            </div>
            </Link>
          </li>
        </ul>
      </div>
      {isLoggedIn ? (
        <button
          className="w-16 h-12 mt-5 mr-4 hover:bg-pink-200 rounded-lg bg-purple-200 shadow-lg"
          onClick={() => setIsLoggedIn(false)}
        >
          Log Out
        </button>
      ) : (
        <button
          className="w-16 h-12 mt-5 mr-4 hover:bg-pink-200 rounded-lg bg-purple-200 shadow-lg"
          onClick={() => setIsLoggedIn(true)}
        >
          Log In
        </button>
      )}
    </div>
  );
};

export default Header;
