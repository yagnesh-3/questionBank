import React, { useEffect, useState } from 'react'
import './css/search.css'
import Results from './Results'
const Search = () => {

    const [title, setTitle] = useState("")
    const [result, setResult] = useState([])
    const [page, setPage] = useState(1)
    const limit = 10;  // Items per page
    const [totalItems, setTotalItems] = useState(50);  // Assuming a total of 50 items
    const totalPages = Math.ceil(totalItems / limit);
    const [filters, setFilters] = useState({
        MCQ: false,
        READ_ALONG: false,
        ANAGRAM: false,
        CONTENT_ONLY: false,
        CONVERSATION: false,
    });
    function handleFilterChange(e) {
        const { name, checked } = e.target;
        setFilters((prevFilters) => {
            const updatedFilters = { ...prevFilters, [name]: checked };
            // Trigger fetch when a filter is changed
            fetchData(updatedFilters);
            return updatedFilters;
        });
    }
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };
    useEffect(() => {
        fetchData(filters);
        fetchCount();
    }, [title, page, filters]);

    function handleSubmit(e) {
        e.preventDefault();
        console.log(title)
        fetchData();
        fetchCount();
    }

    async function fetchData(filters = {}) {
        console.log("called");
        const filterParams = Object.keys(filters).reduce((acc, filter) => {
            if (filters[filter]) acc.push(filter);
            return acc;
        }, []);
        const filtersChecked = JSON.stringify(filterParams)
        console.log(filtersChecked)
        try {
            // let response = await fetch(`http://localhost:3000/api/psearch?title=${title}&page=${page}&limit=${10}&filters=${filtersChecked}`);
            let response = await fetch(`https://questionbank-2jva.onrender.com/api/psearch?title=${title}&page=${page}&limit=${10}&filters=${filtersChecked}`);
            let data = await response.json();
            let count = parseInt(data)
            console.log(count)
            setResult(data);
        } catch (error) {
            console.log("error fetching data", error)
        }
    }
    async function fetchCount() {
        console.log("count is called")
        try {
            // let response = await fetch(`http://localhost:3000/api/count`);
            let response = await fetch(`https://questionbank-2jva.onrender.com/api/count`);
            let data = await response.json();
            console.log(data)
            setTotalItems(data);
        } catch (error) {
            console.log("error fetching data", error)
        }
    }


    return (
        <>
            <div className='search-bar'>

                <input type="text" name="title" id="" onChange={(e) => setTitle(e.target.value)} />
                <button onClick={handleSubmit}>search</button>

            </div>
            <div className='container'>

                <div className='filters'>
                    <p>page {page} of {totalPages}</p>
                    <div id="pagination">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                        >
                            Prev
                        </button>

                        {[...Array(totalPages)].map((_, index) => {
                            const pageNum = index + 1;
                            const minPage = Math.max(1, page - 2);
                            const maxPage = Math.min(totalPages, page + 2);

                            if (pageNum >= minPage && pageNum <= maxPage) {
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => handlePageChange(pageNum)}
                                        className={page === pageNum ? 'active' : ''}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            }
                            return null;
                        })}

                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>

                    <h2>Filters</h2>
                    <div className='filter-group'>
                        <label>
                            <input type="checkbox" name="MCQ" className="filter"
                                checked={filters["MCQ"]}
                                onChange={handleFilterChange} /> MCQ
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="READ_ALONG" className="filter"
                                checked={filters["READ_ALONG"]}
                                onChange={handleFilterChange} /> READ_ALONG
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="ANAGRAM" className="filter"
                                checked={filters["ANAGRAM"]}
                                onChange={handleFilterChange} /> ANAGRAM
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="CONTENT_ONLY" className="filter"
                                checked={filters["CONTENT_ONLY"]}
                                onChange={handleFilterChange} /> CONTENT_ONLY
                        </label>
                        <br />
                        <label>
                            <input type="checkbox" name="CONVERSATION" className="filter"
                                checked={filters["CONVERSATION"]}
                                onChange={handleFilterChange} /> CONVERSATION
                        </label>
                    </div>

                </div>
                <Results data={result} />

            </div>

        </>
    )
}

export default Search