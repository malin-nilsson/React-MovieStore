import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IMovie } from '../models/IMovie';

interface IHeaderProps {
    movieSearch: (input: string) => void;
    getCategory: (input: number) => void;
    movies: IMovie[];
}

export default function Header(props: IHeaderProps) {
    const [input, setInput] = useState("");
    const [select, setSelect] = useState("");

    const searchTitle = () => {
        let titleInUppercase = input.toUpperCase();
        props.movieSearch(titleInUppercase)
    }

    const getCategory = (value: string) => {
        setSelect(value)
        let categorynumber = parseInt(value);
        props.getCategory(categorynumber)
    }

    return (
        <>
            <header className="header-box">
                <div className="header-row">
                    <div className="header-logo">
                        <h1><span className="logo-color">Movie </span>Shop.</h1>
                    </div>
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
                            }}>Search</button>
                    </div>
                </div>

                <div className="header-row bottom-row">
                    <span>{props.movies.length} movies</span>
                    <span> Filter by category
                        <select
                            value={select}
                            onChange={(e) => {
                                getCategory(e.target.value);
                            }}>
                            <option value="1">All</option>
                            <option value="5">Action</option>
                            <option value="7">Comedy</option>
                            <option value="6">Thriller</option>
                            <option value="8">Sci-fi</option>
                        </select>
                    </span>
                </div>
            </header>
        </>
    )
}
