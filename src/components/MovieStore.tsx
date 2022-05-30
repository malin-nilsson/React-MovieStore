import axios from "axios";
import React, { useEffect, useState } from "react";
import { IMovie } from "../models/IMovie";
import Header from "./Header";
import Movies from "./Movies";

const baseURL = "https://medieinstitutet-wie-products.azurewebsites.net/api/products";

export default function MovieStore() {
    const [results, setResults] = useState<IMovie[]>([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (results.length !== 0) return;
        axios.get(baseURL)
            .then((response) => {
                response.data.splice(-4, 4);
                setResults(response.data)
                setLoader(false)
            })
    });

    let loaderHTML = (
        <div className="loader-container">
            <div className="loader"></div>
            <p className="loader-text">Loading movie store...</p>
        </div>
    );

    if (loader) {
        return loaderHTML
    }

    // Work in progress - search/filter stuff
    const searchResults = (input: string) => {
        let titlesFromAPI = []
        for (let i = 0; i < results.length; i++) {
            let titleName = results[i].name.toUpperCase();
            titlesFromAPI.push(titleName)
        }

        let searchResult = titlesFromAPI.filter((movie) => movie === input)
        const test = titlesFromAPI.filter((movie) => movie.startsWith(input));
        console.log(test)
        console.log(searchResult)
    }

    const displayCategory = (categoryId: number) => {
        if (categoryId === 1) {
            let temp = [...results];
            setResults(temp)
            console.log(temp)
        }
        let moviesFromCategory = results.filter((movie) => movie.productCategory[0].categoryId === categoryId);
        setResults(moviesFromCategory)
        console.log(moviesFromCategory)
    }

    return (
        <>
            <Header movieSearch={searchResults} movies={results}
                getCategory={displayCategory} />
            <Movies movies={results} />
        </>
    )
}
