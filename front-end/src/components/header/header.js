import React, { useEffect, useState } from "react";
import getUser from "../../utils";
import { BrowserRouter as Router } from "react-router-dom";
import "./header.css";
import Login from "../Login/login";
import Register from "../Login/register";
import AddPlant from "../Plants/addPlant";
import About from "../about/About";
import FetchPlants from "../Plants/PlantSearch";
import UserPlants from "../Plants/UserPlants";
import TodoList from"../todolist/TodoList";

const Header = () => {
  const [user, setUser] = useState("");
  const [userAdmin, setUserAdmin] = useState(false);
  const [showPop, setShowPop] = useState(false);
  const [showTask, setShowTask] = useState(false);
  const [showPopReg, setShowPopReg] = useState(false);
  const userPlant = "userSearch";
  const addPlant = "add";
  const aboutPage = "about";
  const [page, setPage] = useState(aboutPage);
  const plantSearch = "search";
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  //run function get user on load
  useEffect(() => {
    getUser(setUser, setUserAdmin);
  }, []);

  const navigatePop = () => {
    setShowPop(true);
  };

  // const navigateTask = () => {
  //   setShowTask(true);
  // }

  const logout = () => {
    if (window.confirm("Are you sure you want to log out?") === true) {
      localStorage.removeItem("MyToken");
      setUser();
      setUserAdmin(false);
      navigatePage(aboutPage);
    } else {
    }
  };

  const loginLogout = () => {
    if (user) {
      return (
        <div>
          <div className="link nabvar-item" onClick={() => logout()}>
            Log Out <br />
          </div>
          <div className="login-greeting">Hello {user}!</div>
        </div>
      );
    } else {
      return (
        <div className="link nabvar-item" onClick={() => navigatePop()}>
          Log In / Register
        </div>
      );
    }
  };

  // const task =() => {
  //   if (user) {
  //   return (
  //     <div className="link nabvar-item" onClick={() => navigateTask()}>
  //       Task
  //     </div>
  //   );
  //   }
  // }

  const showPopulate = () => {
    if (userAdmin) {
      return (
        <div className="link nabvar-item" onClick={() => populate()}>
          populate DB <br />
        </div>
      );
    }
  };

  const showFavorite = () => {
    if (user) {
      return (
        <div
          className="link nabvar-item"
          onClick={() => navigatePage(userPlant)}
        >
          Favourites
        </div>
      );
    }
  };

  const populate = async () => {
    if (window.confirm("Are you sure you want to log out?") === true) {
      try {
        await fetch("http://localhost:5000/populate");
      } catch (error) {}
    }
  };

  const navigatePage = (nextPage) => {
    setPage(nextPage);
  };

  const renderPop = () => {
    return (
      <Login
        setUser={setUser}
        name={name}
        email={email}
        password={password}
        userAdmin={userAdmin}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setUserAdmin={setUserAdmin}
        setShowPop={setShowPop}
        setShowPopReg={setShowPopReg}
      />
    );
  };
  const renderPopReg = () => {
    return (
      <Register
        name={name}
        email={email}
        password={password}
        userAdmin={userAdmin}
        setName={setName}
        setEmail={setEmail}
        setPassword={setPassword}
        setUser={setUser}
        setUserAdmin={setUserAdmin}
        setShowPop={setShowPop}
        setShowPopReg={setShowPopReg}
      />
    );
  };
  const renderTask = () =>{
    return (
      <TodoList
      setShowTask={setShowTask}
      username={user}
      />
    )
  }

  const renderMain = () => {
    return <div></div>;
  };

  const renderAddPlant = () => {
    return <AddPlant />;
  };

  const renderAbout = () => {
    return <About />;
  };

  const renderSearch = () => {
    return <FetchPlants user={user} />;
  };

  const renderUserPlants = () => {
    return <UserPlants user={user} setShowTask={setShowTask} />;
  };

  return (
    <div className="headerTotal">
      <div className={"header"}>
        <div className={"menu"}>
          <div className={"navbar"}>
            <div className="nabvar-links">
              <Router>
                {showPopulate()}
        
                {/* {task()} */}

                <div
                  className="link nabvar-item"
                  onClick={() => navigatePage(aboutPage)}
                >
                  Home
                </div>

                <div
                  className="link nabvar-item"
                  onClick={() => navigatePage(plantSearch)}
                >
                  Plant Search
                </div>

                <div
                  className="link nabvar-item"
                  onClick={() => navigatePage(addPlant)}
                >
                  Add a Plant
                </div>

                {showFavorite()}

                {loginLogout()}
              </Router>
            </div>
          </div>
        </div>
        <p className="sub-header">
          Gardenless Greenery for the Concrete Jungle
        </p>
      </div>
      {showPop ? renderPop() : renderMain()}
      {showPopReg ? renderPopReg() : renderMain()}
      {showTask ? renderTask() : renderMain()}
      {page === addPlant && renderAddPlant()}
      {page === userPlant && renderUserPlants()}
      {page === aboutPage && renderAbout()}
      {page === plantSearch && renderSearch()}
    </div>
  );
};

export default Header;
