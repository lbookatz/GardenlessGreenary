import AddPlantToUser from "./addPlantToUser";
import RemovePlantFromUser from "./removePlantFromUser";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import "./Plant.css";
import { useState } from "react";

const Plant = ({ item, user, addRemove, setPlants }) => {
 
  const [pop, setPop] = useState(false);

  const plantingString =
    "/images/" + item.name.toLowerCase().replace(/ /g, "_") + ".jpg";

  const showadd = () => {
    if (user && addRemove === "add") {
      return (
        <AddPlantToUser
          username={user}
          plant={item.name}
          setPlants={setPlants}
        />
      );
    }
  };

  const showremove = () => {
    if (user && addRemove === "remove") {
      return (
        <RemovePlantFromUser
          username={user}
          plant={item.name}
          setPlants={setPlants}
        />
      );
    }
  };
  const renderNothing = () => {
    return <div></div>
  }
  const renderInfo = () => {
    console.log(item)
    return (
      <div className="info-pop">
        <HighlightOffIcon
          className="info-close-icon"
          onClick={() => setPop(false)}
        />
        <p>
          <b>Lighting:</b> {item.lighting}
        </p>
        <p>
          <b>Pet friendly:</b> {item.petFriendly}{" "}
        </p>
        <p>
          <b>Watering:</b> {item.watering}
        </p>
        <p>
          <b>Indoor:</b> {item.indoor ? "Yes" : "No"}
        </p>
        <p>
          <b>Notes:</b>
          <div className="scroll-note">
            <p>
              {item.notes}
            </p>
        </div>
      </p>
      </div>
    );
  };

  return (
    <div className="fullComponent">
      <div className="componentText">
        <p className="plantName">
          <b>Name:</b> {item.name}{" "}
        </p>
        <div>
         
          <img className="plantImage" src={plantingString} alt="plant"width="100px" height="100px"></img>
          
        </div>
        <p>
          <b>Maintenance Requirements:</b> {item.maintenance}
        </p>
      </div>
      <div>
        <button className="info-button" onClick={() => setPop(true)}>More Info</button>
        {pop ? renderInfo() : renderNothing()}
        {showadd()}
        {showremove()}
      </div>
    </div>
  );
};

export default Plant;
