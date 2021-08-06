import { useState } from "react";
import React from "react";
import "./Plant.css";
import Plant from "./Plant";
import Footer from "../footer/footer";

const FetchPlants = ({ user }) => {
  const allPlants = "all";
  const [page, setPage] = useState();
  const [plantjson, setPlantJson] = useState([]);
  const [name, setName] = useState();
  const [maintenance, setMaintenance] = useState();
  const [petFriendly, setPetFriendly] = useState();
  const [lighting, setLighting] = useState();

  const reset = () => {
    setName("");
    setMaintenance("");
    setPetFriendly("");
    setLighting("");
  };

  const renderSearch = async (name, maintenance, petFriendly, lighting) => {
    let listForSearch = "{";
    if (name) {
      listForSearch += '"name":"' + name + '",';
    }
    if (maintenance) {
      listForSearch += '"maintenance":"' + maintenance + '",';
    }
    if (petFriendly) {
      listForSearch += '"petFriendly":"' + petFriendly + '",';
    }
    if (lighting) {
      listForSearch += '"lighting":"' + lighting + '",';
    }
    listForSearch = listForSearch.replace(/,\s*$/, "");
    listForSearch += "}";

    const response = await fetch("http://localhost:5000/plant/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: listForSearch,
    });
    const data = await response.json();
    setPlantJson(data);
  };

  const renderAll = async () => {
    const response = await fetch("http://localhost:5000/plant");
    const data = await response.json();
    setPlantJson(data);
  };

  const getrenderSearch = (r) => {
    r.preventDefault();
    renderSearch(name, maintenance, petFriendly, lighting);
  };

  return (
    <div className={"plantheading"}>
      <header></header>
      
      <form className="form-searchplant" onSubmit={getrenderSearch}>
        
    

        <div className="form-sp">
          <div className="searchOption">
            <label>Search by Name:</label>
            <input onChange={(n) => setName(n.target.value)} />
          </div>
          <div className="searchOption">
            <label>Search by Maintenance:</label>
            <select
              value={maintenance}
              onChange={(m) => setMaintenance(m.target.value)}
              name="setMaintenance"
            >
              <option selected value="">
                -- Select maintenance --
              </option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="searchOption">
            <label>Search for Pet Friendly Plants:</label>
            <select
              value={petFriendly}
              onChange={(e) => setPetFriendly(e.target.value)}
              name="petFriendly"
            >
              <option selected value="">
                -- Select an option --
              </option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>
          <div className="searchOption">
            <label>Search by Light Requirements:</label>
            <select
              value={lighting}
              onChange={(l) => setLighting(l.target.value)}
              name="setlighting"
            >
              <option selected value="">
                -- Select lighting --
              </option>
              <option value="low-light">Happy with shadow</option>
              <option value="partial-sun">Likes a mixture</option>
              <option value="sunlight">Happy with direct sun</option>
            </select>
          </div>
        </div>

        <div className="buttons-area">

          <div className="all-btt">
            <button onClick={renderAll}>View All</button>{" "}
          </div>

          <div className="sbt-btt">
            <button type="submit">Submit</button>
          </div>

          <div className="rst-btt">
            <button type="reset" onClick={reset}>Reset</button>
          </div>

        </div>
       
      </form>

      <div className="searchComponents">
        {plantjson.map((item, index) => {
          return (
            <Plant
              item={item}
              index={index}
              key={index}
              user={user}
              addRemove="add"
            />
          );
        })}
        {page === allPlants}
      </div>

      <Footer />
    </div>
  );
};

export default FetchPlants;
