import React, { useState } from "react";
import axios from 'axios';

// script.js
import "nes.css/css/nes.min.css";

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const InfoPage = () => {
  const [resData, setResData] = useState(null);
  const [description, setDescription] = useState(null);
  const [imageURL, setImageURL] = useState(null);
  const getFun = () => {
    axios
      .get("/api/shelf")
      .then((response) => {
        setResData(response.data);
      }
      );
  }
  const handleChangeForDes = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeForImg = (e) => {
    setImageURL(e.target.value);
  };
  const submitFun = () => {
    axios.post('/api/shelf', {description, imageURL}).then(()=>{console.log(`adding new item to server`)}).catch((error)=>{console.log(error)});
  }
  const editPage = () => {
    // function that takes you to the edit page
    // will have to push props to edit 
    // but might have problems refreshing...
  }
  return (
    <div>
      
      <form onSubmit={submitFun} class="nes-container with-title is-centered">
        <input
          type="text"
          placeholder="Description"
          class="nes-input"
          onChange={handleChangeForDes}
        />
        <input
          type="text"
          placeholder="Image URL"
          class="nes-input"
          onChange={handleChangeForImg}
        />
        <input
          type="button"
          class="nes-btn is-success"
          type="submit"
          value="Add Item"
          onSubmit={submitFun}
        />
      </form>
      <div class="nes-container with-title is-centered">
        <button type="button" class="nes-btn is-primary" onClick={getFun}>
          Click
        </button>
        <div>
          {resData !== null ? (
            <div>
              {resData.map((item, index) => (
                <div class="nes-container is-dark with-title" key={index}>
                  <h1>{item.description}</h1>
                  <img src={item.image_url} height="300" width="350" />
                  <button
                    class="nes-btn is-error"
                    onClick={() => axios.delete(`/api/shelf/${item.id}`)}
                  >
                    Delete
                  </button>
                  <button
                    class="nes-btn"
                    onClick={editPage}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>?</p>
          )}
        </div>
      </div>
    </div>
  );
}
export default InfoPage;
