import axios from "axios";
import React, { useEffect, useState } from "react";
import { IMovie } from "../models/IMovie";
import Header from "./Header";
import Movies from "./Movies";

const productsAPI = "https://medieinstitutet-wie-products.azurewebsites.net/api/products";

export default function MovieStore() {
    const [results, setResults] = useState<IMovie[]>([]);
    const [filteredResults, setFilteredResults] = useState<IMovie[]>([]);
    const [loader, setLoader] = useState(true);

    useEffect(() => {
        if (results.length !== 0) return;
        axios.get(productsAPI)
            .then((response) => {
                response.data.splice(-4, 4);
                setResults(response.data);
                setFilteredResults(response.data)
                setLoader(false)
            })
    });

    let loaderHTML = (
        <div className="loader-container">
            <div className="loader"></div>
            <p className="loader-text">Loading...</p>
        </div>
    );

    if (loader) {
        return loaderHTML
    }

    // Work in progress - filter based on search 
    const searchResults = (input: string) => {
        if (input === "") {
            setFilteredResults(results)
        } else {
            axios.get('https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=' + input)
                .then((response) => {
                    setFilteredResults(response.data)
                })
        }
    }

    /* Filter based on category */
    const displayCategory = (categoryId: number) => {
        if (categoryId === 1) {
            setFilteredResults(results)
        } else {
            let moviesFromCategory = results.filter((movie) => movie.productCategory[0].categoryId === categoryId);
            setFilteredResults(moviesFromCategory)
        }
    }

    return (
        <>
            <Header movieSearch={searchResults} movies={results}
                getCategory={displayCategory} />
            <Movies movies={filteredResults} />
        </>
    )
}
