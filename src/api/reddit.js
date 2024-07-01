export const API_BASE = "https://www.reddit.com";

export const getSubredditPosts = async (subreddit) => {
    const res = await fetch(`${API_BASE}${subreddit}.json`);
    const json = await res.json();
    return json.data.children.map(post => post.data);
};

export const getSubreddits = async () => {
    const res = await fetch(`${API_BASE}/subreddits.json`);
    const json = await res.json();
    return json.data.children.map(subreddit => subreddit.data);
};

export const getSubreddit = async (subreddit) => {
    try {
        const res = await fetch(`${API_BASE}/r${subreddit}/about.json`);
        const json = await res.json();
        return json && json.data ? json.data : undefined;
    } catch (error) {
        console.error(`Failed to find subreddit ${subreddit}`, error);
    }
};

export const getPostComments = async (permlink) => {
    const res = await fetch(`${API_BASE}${permlink}.json`);
    const json = await res.json();
    return json[1].data.children.map(subreddit => subreddit.data);
};