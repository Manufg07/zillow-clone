import { useState } from "react";

import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Home from "./components/Home";

function App({ account, homes, home, toggle, togglePop }) {
  return (
    <div>
      <Navigation account={account} />
      <Search />

      <div className="cards__section">
        <h3>Homes For You</h3>
        <hr />

        <div className="cards">
          {/* {homes.map((home, index) => ( */}
          <div className="card" onClick={() => togglePop(home)}>
            <div className="card__image">
              <img alt="Home" />
            </div>
            <div className="card__info">
              <h4> ETH</h4>
              <p>
                <strong></strong> bds |<strong></strong> ba |<strong></strong>{" "}
                sqft
              </p>
              <p></p>
            </div>
          </div>
          {/* ))} */}
        </div>
      </div>

      {toggle && <Home home={home} />}
    </div>
  );
}

export default App;
