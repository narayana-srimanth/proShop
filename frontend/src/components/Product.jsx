import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";
function Product(props){
    return(
        <div className="card" style={{ width: '18rem', margin : "2.5vh 2.5vw 2.5vh 2.5vw" }}>
        <img src={props.imageURL} className="card-img-top" alt={props.name} />
        <div className="card-body">
          <h5 className="card-title">{props.name}</h5>
          <p className="card-text" style={{marginBottom : "auto"}}>{props.price}</p>
          <Rating value = {props.rating} text = {`   ${props.numOfreveiws} reveiws`}/>
          <Link to={`/product/${props.id}`} className="btn btn-primary stretched-link" style={{marginTop: "4vh"}}> 
            Buy
          </Link>
        </div>
      </div>
    );
}

export default Product;