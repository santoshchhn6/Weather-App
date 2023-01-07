import { useEffect, useState } from "react";
import { BsSearch } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { panel } from "../../CustomComponents/style/style";
import { set_coords_data, set_search_term } from "../../redux/action";
import "./Search.css";
const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const handleInput = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSearch = () => {
    dispatch(set_search_term(searchTerm));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="Search" style={panel}>
      <input
        className="SearchInput"
        type="text"
        placeholder="City Name"
        onChange={handleInput}
        onKeyDown={handleKeyDown}
      />
      <BsSearch className="SearchIcon" onClick={handleSearch} />
    </div>
  );
};

export default Search;
