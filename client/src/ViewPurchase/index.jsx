import React, {useState, useEffect} from "react";
import "./style.css";
import API from '../API.js';

const ViewPurchase = () => {
    const [body, setBody] = useState([]);
  
    useEffect(() => {
        API.getPurchase().then((response) => {
            //console.log(response.data.purchase);
            setBody(response.data.purchase);
        });
    }, []);
    console.log(body)

    async function handleDeletePurchase(index) {
      
      const payload = {
        params: {
          "_id": body[index]._id
        }
      };
      console.log(payload.params);
      await API.deletePurchase(payload);
      //alert("Deleted successfully");

      /*const response = await fetch('purchase/' + body[index]._id, { method: 'DELETE' })
      const json = await response.json()

      if( response.ok ){
        dispatch( {type: DELETE_PURCHASE, payload: json })
      }*/

  };
    
    return (
      <div className="view-container">
        {body != null && body.map((purchase, index) => {
          return (
            <div className="view-item">
              <h1 className="item-title">{purchase.name}</h1>
              <h2 className="item-subtitle">{purchase.description}</h2>
              <div className="item-row">
                <p className="item-text">{purchase.location}</p>
                <p className="item-text">{purchase.date}</p>
              </div>
              <div className="item-row">
                <h2 className="item-subtitle">${purchase.cost}</h2>
                <p className="item-text">{purchase.method}</p>
              </div> 
              <button className="delete-button" onClick={(e) => handleDeletePurchase(index)}>
                Delete Purchase
              </button>
            </div>
          
        );
      })}
    </div>
  );
};

export default ViewPurchase;
