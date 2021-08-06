import React from 'react';

const Logout = (item) => {


    return (
        <div> 
         <div>Name: {item.name}</div>
         <form onSubmit={Logout}>
         <button type="submit" className="btt-login">Logout</button>
         </form>           
         </div>
      )
}

export default Logout;