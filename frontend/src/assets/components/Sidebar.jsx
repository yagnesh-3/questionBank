import React from 'react';
import './css/Sidebar.css';

const Sidebar = () => {
    return (
        <div id='main1'>
            <p id='heading'>Filters</p>
            <div id='container'>
                <h1>Question Type</h1>
                <br />
                <label>
                    <input type="checkbox" name="Anagrams" className="filter" /> Anagrams
                </label>
                <br />
                <label>
                    <input type="checkbox" name="MCQ" className="filter" /> MCQ
                </label>
                <br />
                <label>
                    <input type="checkbox" name="Read Along" className="filter" /> Read Along
                </label>
            </div>
        </div>
    );
};

export default Sidebar;
