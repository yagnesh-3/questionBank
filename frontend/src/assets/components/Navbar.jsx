import React, { useState, useEffect } from 'react'
import './css/navbar.css'
import Results from './Results'
const Navbar = () => {
    const [title, setTitle] = useState("")
    const [debouncedTitle, setDebouncedTitle] = useState('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedTitle(title);
        }, 500);

        return () => {
            clearTimeout(handler);
        };
    }, [title]);
    return (
        <>
            <h1>Question Bank</h1>
            <div id='search-box'>
                <input type="text" name="" id="" placeholder='Enter a title to Search' onChange={(e) => setTitle(e.target.value)} />

            </div>
            <Results title={debouncedTitle} />
        </>
    )
}

export default Navbar
