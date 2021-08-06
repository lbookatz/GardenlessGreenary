import { useState } from "react";
import React from "react";
import Footer from "../footer/footer";
import "./addPlant.css";

const AddPlant = () => {
  const [name, setname] = useState();
  const [maintenance, setmaintenance] = useState();
  const [lighting, setlighting] = useState();
  const [petFriendly, setpetFriendly] = useState();
  const [watering, setwatering] = useState();
  const [indoor, setindoor] = useState();
  const [notes, setnotes] = useState();

  const resetForm = () => {
    setname("")
    setmaintenance("")
    setlighting("")
    setpetFriendly("")
    setwatering("")
    setindoor("")
    setnotes("")
  }

  const fetchLogin = async (
    name,
    maintenance,
    lighting,
    petFriendly,
    watering,
    indoor,
    notes
  ) => {
    const response = await fetch("http://localhost:5000/plant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        maintenance: maintenance,
        lighting: lighting,
        petFriendly: petFriendly,
        watering: watering,
        indoor: indoor,
        notes: notes,
      }),
    });

    try {
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log("an error ocoured in front-end login/register");
    }
  };

  const postPLant = (e) => {
    e.preventDefault();
    fetchLogin(
      name,
      maintenance,
      lighting,
      petFriendly,
      watering,
      indoor,
      notes
    );
  };

  return (
    <div className="addplant">
      <form onSubmit={postPLant}>
        <div className="form-addplant">
          <div>
            <label>Name</label>
            <input onChange={(e) => setname(e.target.value)} value={name} />

            <label>Maintenance</label>
            <select
              value={maintenance}
              onChange={(e) => setmaintenance(e.target.value)}
              name="setmaintenance"
            >
              <option selected value="">
                -- Select maintenance --
              </option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>

            <label>Lighting</label>
            <select
              value={lighting}
              onChange={(e) => setlighting(e.target.value)}
              name="setlighting"
            >
              <option selected value="">
                -- Select lighting --
              </option>
              <option value="low-light">Happy with shadow</option>
              <option value="partial-sun">Likes a mixture</option>
              <option value="sunlight">Happy with direct sun</option>
            </select>

            <label>Pet-friendly</label>
            <select
              value={petFriendly}
              onChange={(e) => setpetFriendly(e.target.value)}
              name="petFriendly"
            >
              <option selected value="">
                -- Select an option --
              </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </div>

          <div>
            <label>Watering</label>
            <select
              value={watering}
              onChange={(e) => setwatering(e.target.value)}
              name="watering"
            >
              <option selected value="">
                -- Select watering --
              </option>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>

            <label>Indoor</label>
            <select
              value={indoor}
              onChange={(e) => setindoor(e.target.value)}
              name="indoor"
            >
              <option selected value=""> 
                -- Select an option --
              </option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>

            <label>Notes</label>
            <textarea
              onChange={(e) => setnotes(e.target.value)}
              value={notes}
            />
          </div>
        </div>
        <button type="submit" className="btt-add">Add your plant</button>
        <button type="reset" className="btt-add" onClick={resetForm}>reset</button>
      </form>

      <Footer />
    </div>
  );
};

export default AddPlant;
