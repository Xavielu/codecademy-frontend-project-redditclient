import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HiOutlineSearch } from "react-icons/hi";
import Card from '../../components/Card/Card';
import { getSubreddit } from '../../api/reddit';
import { fetchSubreddits, selectSubreddits, addSubreddit } from '../../stores/subRedditSlice';
import './Subreddits.css';
import {
    setSelectedSubreddit,
    selectSelectedSubreddit,
} from '../../stores/redditSlice';
const ICON_URL = "https://ui-avatars.com/api/?background=ededed&color=3d5af1&bold=true&name=";

export default function Subreddits() {
    const [searchTerm, setSearchTerm] = useState("");

    const subreddits = useSelector(selectSubreddits);
    const selectedSubreddit = useSelector(selectSelectedSubreddit);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSubreddits());
    }, [dispatch]);

    const searchTermChange = evt => {
        setSearchTerm(evt.target.value);
    };

    const searchTermSubmit = evt => {
        evt.preventDefault();
        findSubreddit();
        setSearchTerm("");
    };

    const findSubreddit = async () => {
        const subreddit = await getSubreddit(`/${searchTerm}`);
        const subredditNames = subreddits.map(sub => sub.display_name);
        if (subreddit
            && !subredditNames.includes(subreddit.display_name)) {
            dispatch(addSubreddit(subreddit));
        }
    }

    return (
        <Card className="subreddit-card">
            <h2>Subreddits</h2>
            <ul className="subreddits-list">
                {subreddits.map((subreddit) => (
                    <li
                        key={subreddit.id}
                        className={`${selectedSubreddit === subreddit.url && `selected-subreddit`
                            }`}
                    >
                        <button
                            type="button"
                            onClick={() => dispatch(setSelectedSubreddit(subreddit.url))}
                        >
                            <img
                                src={
                                    subreddit.icon_img || `${ICON_URL}${subreddit.display_name}`
                                }
                                alt={`${subreddit.display_name}`}
                                className="subreddit-icon"
                                style={{ border: `3px solid ${subreddit.primary_color}` }}
                            />
                            {subreddit.display_name}
                        </button>
                    </li>
                ))}
                <form className="subsearch" onSubmit={searchTermSubmit}>
                    <input
                        type="text"
                        placeholder="Search"
                        aria-label="Search subreddits"
                        value={searchTerm}
                        onChange={searchTermChange}
                    />
                    <button type="submit" aria-label="Search" onClick={searchTermSubmit}>
                        <HiOutlineSearch />
                    </button>
                </form>
            </ul>
        </Card>
    );
};