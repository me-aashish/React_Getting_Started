import { ResaturantCard } from "../constants/RestaurantCard";
import { useState, useEffect } from "react";
import { RestaurantList } from "../constants/RestaurantList";
import Shimmer from "./shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";

/**
 * useState
 *  - used to create local react variable or local react state variable
 *  - for optimisation and readability purposes, to make variables in sync with the UI
 *  - react can't track normal variables in the virtual DOM, so we have to use special react "state variables" for that.
 *  - eg
 *      const stext = "hello" -->JS
 *      const [stext, setStext] = useState("hello") --> React
 *        - first argument is name of variable, second argument is fucntion to update the variable
 *              (it returns array of two arguments)
 *  -
 */

/**
 * useEffect(()=>{
 * },[]);
 *          - empty dependency array ([]) -> called once after render
 *          - dependency array eg. [serachText] -> called once after initial render + everytime after re-render i.e.
 *              when serachText is changed.
 *          - if dependency array is not passed then useEffect will be called after very re-render.
 *
 *
 */

const Body = () => {
  const [searchText, setSerachText] = useState("");
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [allRestaurants, setAllRestaurants] = useState([]);

  useEffect(() => {
    getRestaurants();
  }, []);

  async function getRestaurants() {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=30.7333148&lng=76.7794179&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();
    // console.log(
    //   json.data.cards[5].card.card.gridElements.infoWithStyle.restaurants
    // );
    setAllRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
    setFilteredRestaurants(
      json?.data?.cards[5]?.card?.card?.gridElements?.infoWithStyle?.restaurants
    );
  }

  const isOnline = useOnline();

  if(!isOnline) return <h1>Oops! You're Offline</h1>

  if (!allRestaurants) return null;
  return allRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="serach-input"
          value={searchText}
          onChange={(e) => {
            setSerachText(e.target.value);
          }}
        />
        <button
          className="serach-btn"
          onClick={() => {
            const newData = filterData(searchText, allRestaurants);
            setFilteredRestaurants(newData);
          }}
        >
          Search
        </button>
      </div>
      <div className="restaurant-list">
        {filteredRestaurants.map((restro) => {
          console.log(restro.info);
          return (
            <Link to={"/restaurant/" + restro?.info?.id} key={restro?.info?.id}>
              <ResaturantCard {...restro} />
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Body;
