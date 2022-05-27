import React, { ChangeEvent, KeyboardEvent, useState } from 'react'
import { IMovie } from '../models/IMovie';

interface IHeaderProps {
    movieSearch: (input: string) => void;
    movies: IMovie[];
}

export default function Header(props: IHeaderProps) {
    const [input, setInput] = useState("");

    const searchTitle = () => {
        let titleInUppercase = input.toUpperCase();
        props.movieSearch(titleInUppercase)
    }

    return (
        <>
            <header className="header-box">
                <div className="header-row">
                    <div className="header-logo">
                        <h1><span className="logo-color">Movie </span>Shop.</h1>
                    </div>
                    <div className="header-content">
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

                <div className="header-row">
                    <h3>{props.movies.length} movies</h3>
                    <span> Filter by category
                        <select>
                            <option value="" selected>All</option>
                            <option value="" >Action</option>
                            <option value="" >Comedy</option>
                            <option value="" >Thriller</option>
                            <option value="" >Sci-fi</option>
                        </select>
                    </span>
                </div>
            </header>
        </>
    )
}
