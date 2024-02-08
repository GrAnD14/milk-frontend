import "./SearchBar.sass"
import {Dispatch} from "react";
import {FaSearch} from "react-icons/fa";

const SearchBar = ({ query, setQuery }: {query:string, setQuery: Dispatch<string>}) => {

    const handleChange = (value: string) => {
        setQuery(value)
    }

    return (
        <div className="search-bar-wrapper" >

            <input
                type="text"
                placeholder="Поиск..."
                name="query"
                autoComplete="off"
                value={query}
                onChange={(e) => handleChange(e.target.value)}
            />

            <button type="submit">
                <FaSearch className={"search-icon"}/>
            </button>

        </div>
    )
}

export default SearchBar;