import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { FaReddit } from "react-icons/fa"; //imports the icons
import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm } from "../../stores/redditSlice";

export default function Header() {
  const [searchTermLocal, setSearchTermLocal] = useState("");
  const searchTerm = useSelector((state) => state.reddit.searchTerm);
  const dispatch = useDispatch();

  useEffect(() => {
    setSearchTermLocal(searchTerm);
  }, [searchTerm]);

  const handleTermChange = (evt) => {
    setSearchTermLocal(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    dispatch(setSearchTerm(searchTermLocal));
  };

  return (
    <header>
      <div className="logo">
        <FaReddit className="logo-icon" />
        <p>
          Reddit<span>Minimal</span>
        </p>
      </div>

      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search -> made by xaviel"
          aria-label="Search posts"
          value={searchTermLocal}
          onChange={handleTermChange}
        />
        <button type="submit" aria-label="Search" onClick={handleSubmit}>
          <HiOutlineSearch />
        </button>
      </form>
    </header>
  );
}
