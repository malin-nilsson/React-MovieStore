import axios from "axios";
import React, { useEffect, useState } from "react";
import { IMovie } from "../models/IMovie";
import Footer from "./Footer";
import Header from "./Header";
import Movies from "./Movies";

const moviesAPI = "https://medieinstitutet-wie-products.azurewebsites.net/api/products";

export default function MovieStore() {
    const [results, setResults] = useState<IMovie[]>([]);
    const [filteredResults, setFilteredResults] = useState<IMovie[]>([]);
    const [loader, setLoader] = useState(true);
    const [placeholder, setPlaceholder] = useState(false);

    useEffect(() => {
        if (results.length !== 0) return;
        axios.get(moviesAPI)
            .then((response) => {
                response.data.splice(-4, 4);
                setResults(response.data);
                setFilteredResults(response.data);
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

    // Filter movies based on search 
    const searchResults = (input: string) => {
        if (input === "") {
            setFilteredResults(results)
            setPlaceholder(false)
        } else {
            axios.get("https://medieinstitutet-wie-products.azurewebsites.net/api/search?searchText=" + input)
                .then((response) => {
                    setFilteredResults(response.data);
                    setPlaceholder(false);
                    if (filteredResults.length === 0) {
                        setPlaceholder(true);

                    }
                })
        }
    }

    // Filter movies based on category
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
            <Movies movies={filteredResults} placeholder={placeholder} />
            <Footer />
        </>
    )
}