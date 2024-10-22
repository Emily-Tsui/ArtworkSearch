import React, { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_APP_API_KEY;

const TotalArt = ({total, mean, median}) => {


    return (
        <div>
            <h2>Total Items: {total}</h2>
            <h2>Mean of characters in all the titles: {mean}</h2>
            <h2>Median of items: {median}</h2>

        </div>
    )
};


export default TotalArt;