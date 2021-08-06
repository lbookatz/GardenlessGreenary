
import React from 'react';
import "./addPlantToUser.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RemovePlantFromUser(props) {
  const removePlantFromUser = async (name, plant) => {
    try {
      let response = await fetch("http://localhost:5000/user/removeplant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          plantname: plant,
        }),
      });
      toast(plant + " has been removed from your favourites")
      // alert(plant + " has been removed from your favourites")
      const data = await response.json();
      props.setPlants(data);
    } catch (error) {}
  };

  return (
    <div>
      <button className="remove-button" onClick={() => removePlantFromUser(props.username, props.plant)}>
        Remove from favourites
      </button>
      
      <ToastContainer />
    </div>
  );
}

export default RemovePlantFromUser;
