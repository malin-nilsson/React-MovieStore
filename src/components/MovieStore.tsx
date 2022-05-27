import axios from "axios";
import React, { useEffect, useState } from "react";
import { IMovie } from "../models/IMovie";
import Header from "./Header";
import Movies from "./Movies";

const baseURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/products";

export default function MovieStore() {
    const [results, setResults] = useState<IMovie[]>([]);
    const [loader, setLoader] = useState(true);

    let loaderHTML = (
        <div className="loader-container">
            <p className="loader-text">Loading movie store...</p>
            <div className="loader"></div>
        </div>
    );

    useEffect(() => {
        if (results.length !== 0) return;
        axios.get(baseURL)
            .then((response) => {
                response.data.splice(-4, 4);
                setResults(response.data)
                setLoader(false)
            })
    });

    if (loader) {
        return loaderHTML
    }

    const searchResults = (input: string) => {
        let titlesFromAPI = []
        for (let i = 0; i < results.length; i++) {
            let titleName = results[i].name.toUpperCase();
            titlesFromAPI.push(titleName)
        }

        let searchResult = titlesFromAPI.filter((movie) => movie === input)

        const test = titlesFromAPI.filter((movie) => movie.startsWith(input));

        console.log(test)
        return searchResult;
    }

    return (
        <>
            <Header movieSearch={searchResults} movies={results} />
            <Movies movies={results} />
        </>
    )
}
