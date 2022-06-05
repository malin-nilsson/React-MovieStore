import axios from 'axios';
import React, { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { ICategory } from '../models/ICategory';
import { IMovie } from '../models/IMovie';

interface IHeaderProps {
    movieSearch: (input: string) => void;
    getCategory: (input: number) => void;
    movies: IMovie[];
}

const url = "https://medieinstitutet-wie-products.azurewebsites.net/api/categories";

export default function Header(props: IHeaderProps) {
    const [input, setInput] = useState("");
    const [select, setSelect] = useState("");
    const [category, setCategory] = useState<ICategory[]>([]);

    useEffect(() => {
        if (category.length !== 0) return;
        axios.get(url)
            .then((response) => {
                setCategory(response.data)
            })
    })

    const searchTitle = () => {
        props.movieSearch(input)
        setInput("");
    }

    const getCategory = (value: string) => {
        setSelect(value)
        let categoryId = parseInt(value);
        props.getCategory(categoryId)
    }

    const categoryDropdown = (
        <>
            <button onClick={(() => { getCategory("1") })}>All movies</button>
            <select value={select}
                onChange={(e) => {
                    getCategory(e.target.value);
                }}>
                <>
                    <option value="1">Category</option>
                    {category.map((categoryItem) => {
                        return (<option value={categoryItem.id} key={categoryItem.id}>{categoryItem.name} </option>)
                    })}
                </>
            </select>


        </>
    )

    const searchField = (
        <div className="header-search">
            <input type="text"
                placeholder="Search movie..."
                className="search-box"
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setInput(e.target.value);
                }}
                onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
                    e.preventDefault();
                    if (e.key === "Enter" && input) {
                        searchTitle()
                    }
                }}
            />
            <button
                onClick={() => {
                    if (input) searchTitle();
                }}>
                <img src="/search.svg" alt="" />
            </button>
        </div>
    )


    return (
        <>
            <header className="header-box">
                <div className="header-row">
                    <div className="header-logo">
                        <h1><span className="logo-color">Movie </span>Shop.</h1>
                    </div>
                    {searchField}
                </div>

                <div className="header-row bottom-row">
                    {categoryDropdown}
                </div>
            </header>
        </>
    )
}
