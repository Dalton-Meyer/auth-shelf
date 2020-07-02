import React, { useState } from "react";
import axios from 'axios';

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
  return (
    <div>
      <p>Shelf Page</p>
      <form onSubmit={submitFun}>
        <input
          type="text"
          placeholder="Description"
          onChange={handleChangeForDes}
        />
        <input
          type="text"
          placeholder="Image URL"
          onChange={handleChangeForImg}
        />
        <input type="submit" value="Add Item" onSubmit={submitFun} />
      </form>
      <button onClick={getFun}>Click</button>
      <div>
        {resData !== null ? (
          <div>
            {resData.map((item, index) => (
              <div key={index}>
                <h1>{item.description}</h1>
                <img src={item.image_url} height="300" width="350" />
                <button onClick={()=>axios.delete(`/api/shelf/${item.id}`)}>Delete</button>
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
