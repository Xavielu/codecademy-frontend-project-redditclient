import React from "react";
import "./Card.css";



// this loads all the cars for reddit and subreddit
export default function Card(props) {
  return <div className={`card ${props.className}`}>{props.children}</div>;
}
