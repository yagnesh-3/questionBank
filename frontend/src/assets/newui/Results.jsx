import React, { useState } from 'react'
import './css/results.css'
const Results = ({ data }) => {
    const [page, setPage] = useState(1);
    const limit = 10;  // Items per page
    const totalItems = 50;  // Assuming a total of 50 items
    const totalPages = Math.ceil(totalItems / limit);  // Calculate total pages
    console.log("called in Resukts")
    return (
        <div className='questions'>
            {

                data.map((item) => (
                    <div className='question-card'>
                        <h3>{item.title}{'('}{item.type}{')'}</h3>
                        {/* MCQ START */}
                        {item.type === "MCQ" && (
                            <>

                                {item.options && item.options.map((option, idx) => (
                                    <p
                                        key={idx}
                                        className={option.isCorrectAnswer ? "correct-answer" : ""}
                                    >
                                        {String.fromCharCode(idx + 97)}{') '}{option.text}
                                    </p>
                                ))}
                            </>
                        )}
                        {/* MCQ END */}
                        {/* Anagram Start */}
                        {item.type === "ANAGRAM" && (() => {
                            const shuffledBlocks = [...item.blocks].sort(() => Math.random() - 0.5);

                            return (
                                <>


                                    {shuffledBlocks.map((block, idx) => (
                                        <p key={idx}>{block.text}</p>
                                    ))}


                                    <p className='correct-answer'>Answer: {item.solution}</p>

                                </>
                            );
                        })()}
                        {/* Anagram End */}

                    </div>
                ))


            }


        </div>
    )
}

export default Results