import React from 'react';
import './Avatar.css';
// loads the plain url for pfp and then with the help of the api we add the needed info after the name= symblo in the url and this function Avatar fetches it and sets its alt for screen readers as the naem for the user  and each user name is given a classname
const AVATAR_URL = "https://ui-avatars.com/api/?background=ededed&color=3d5af1&bold=true&name=";

export default function Avatar(props) {
    return (
        <img
            src={`${AVATAR_URL}${props.name}`}
            alt={props.name}
            className="avatar-profile-image"
        />
    );
};