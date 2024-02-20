import { useState } from "react";
import { TbSearch } from "react-icons/tb"
import './LegoListSearch.css'

const LegoListSearch = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('')

    const handleInputChange = e => {
        const value = e.target.value;
        setSearchTerm(value)
        onSearch(value);
    }

    return (
        <div className="lego-search">
            <TbSearch/>
            <input
                type="text"
                id="placeholder-text"
                value={searchTerm}
                onChange={handleInputChange}
                placeholder="Filter by age, theme, keyword..."
                />
        </div>
    )
}

export default LegoListSearch
