import React, { useState, useEffect } from 'react';
import './css/result.css';

const Results = ({ title }) => {
    const [res, setRes] = useState([]);  // Store fetched data
    const [page, setPage] = useState(1);  // Store current page
    const [showSolutions, setShowSolutions] = useState({});  // Track solution visibility
    const limit = 10;  // Items per page
    const totalItems = 50;  // Assuming a total of 50 items
    const totalPages = Math.ceil(totalItems / limit);  // Calculate total pages

    // Function to fetch data
    const fetchData = async (pageNum) => {
        try {
            const response = await fetch(`http://localhost:3000/api/psearch?title=${title}&page=${pageNum}&limit=${limit}`);
            const data = await response.json();
            setRes(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [title, page]);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    const toggleSolution = (index) => {
        setShowSolutions((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    return (
        <div>
            <div id='resultsContainer'>
                {res.length > 0 ? (
                    res.map((item, index) => (
                        <div key={index}>
                            <p id='res'>{index + 1}.{item.title} ({item.type})</p>
                            {/* MCQ START */}
                            {item.type === "MCQ" && (
                                <div className="options">
                                    <ol type='a'>
                                        {item.options && item.options.map((option, idx) => (
                                            <li
                                                key={idx}
                                                className={option.isCorrectAnswer ? "correct" : ""}
                                            >
                                                {option.text}
                                            </li>
                                        ))}
                                    </ol>

                                    <button onClick={() => toggleSolution(index)}>
                                        {showSolutions[index] ? 'Hide Solution' : 'View Solution'}
                                    </button>

                                    {showSolutions[index] && (
                                        <p style={{ marginLeft: 0, padding: 0 }}>
                                            Solution: {item.options.find(option => option.isCorrectAnswer)?.text}
                                        </p>
                                    )}
                                </div>
                            )}
                            {/* MCQ END */}
                            {/* Anagram Start */}
                            {item.type === "ANAGRAM" && (() => {
                                const shuffledBlocks = [...item.blocks].sort(() => Math.random() - 0.5);

                                return (
                                    <div>

                                        <div className='options ana'>

                                            {shuffledBlocks.map((block, idx) => (
                                                <p key={idx}>{block.text} </p>
                                            ))}


                                        </div>
                                        <button onClick={() => toggleSolution(index)}>
                                            {showSolutions[index] ? 'Hide Solution' : 'View Solution'}
                                        </button>

                                        {showSolutions[index] && (
                                            <p style={{ marginLeft: 0, padding: 0 }}>
                                                Solution: {item.solution}
                                            </p>
                                        )}
                                    </div>
                                );
                            })()}

                            {/* Anagram end */}
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}
            </div>

            {/* Pagination controls */}
            <div id="pagination">
                <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Prev
                </button>

                {[...Array(totalPages)].map((_, index) => {
                    const pageNum = index + 1;
                    return (
                        <button
                            key={index}
                            onClick={() => handlePageChange(pageNum)}
                            className={page === pageNum ? 'active' : ''}
                        >
                            {pageNum}
                        </button>
                    );
                })}

                <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Results;
