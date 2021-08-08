import React, { Component } from 'react';
import { useLocation } from "react-router-dom";

const GroceriesPage = (props) => {
    const location = useLocation();
    const groceryInfo = location.state;
    console.log(groceryInfo);
    return (
        <div>Shrigma</div>
    )
}

export default GroceriesPage
