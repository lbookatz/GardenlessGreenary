import React from 'react';
import "./addPlantToUser.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddPlantToUser(props) {
  const addPlantToUser = async (name, plant) => {
    try {
      await fetch("http://localhost:5000/user/addplant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: name,
          plantname: plant,
        }),
      });

      toast(plant + " has been added to your favourites");
      // alert(plant + " has been added to your favourites")

    } catch (error) {}
  };

  return (
    <div>
      
      <button className="fav-button" onClick={() => addPlantToUser(props.username, props.plant)}>
        Add to favourites
      </button>
      <ToastContainer />
    </div>
  );
}

export default AddPlantToUser;

