import React from "react";

function Logo({ imgLink }) {
    return (
        <div className="main-logo">
            <img src={imgLink} alt="logo" />
        </div>
    );
}

export default Logo;
