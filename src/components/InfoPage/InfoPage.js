import React, { useState } from "react";
import axios from 'axios';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => {
  const [resData, setResData] = useState(null);
  const getFun = () => {
    axios
      .get("/api/shelf")
      .then((response) => {
        setResData(response.data);
      }
      );
  }
  return (
    <div>
      <p>Shelf Page</p>
      <button onClick={getFun}>Click</button>
      <div>
        {resData !== null ? (
          <div>
            {resData.map((item, index) => (
              <div key={index}>
                <h1>{item.description}</h1>
                <img src={item.image_url} height='300' width='350'/>
              </div>
            ))}
          </div>
        ) : (
          <p>?</p>
        )}
      </div>
    </div> 
  );
}
export default InfoPage;
