import React, { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "./Post.css";
import {
  TiArrowUpOutline,
  TiArrowUpThick,
  TiArrowDownOutline,
  TiArrowDownThick,
  TiMessage,
} from "react-icons/ti";

import ReactMarkdown from "react-markdown";
import moment from "moment";
import shortenNumber from "../../utils/shortenNumber";
import urlisImage from "../../utils/urlisImage";
import convertPostToEmbed from "../../utils/convertPostToEmbed";
import Card from "../../components/Card/Card";
import Comment from "../Comment/Comment";
import Avatar from "../Avatar/Avatar";

export default function Post(props) {
  const { post, onToggleComments } = props;
  const [voteValue, setVoteValue] = useState(0);
  const [votes, setVotes] = useState(post.ups);

  /**
   * @param {number} newValue The new vote value
   */
  const handleVote = (newValue) => {
    if (newValue === voteValue) {
      setVoteValue(0);
      switch (newValue) {
        case 1:
          setVotes((prev) => prev - 1);
          break;
        default:
          setVotes((prev) => prev + 1);
          break;
      }
    } else if (newValue === 1) {
      setVoteValue(1);
      setVotes((prev) => prev + 1);
    } else {
      setVoteValue(-1);
      setVotes((prev) => prev - 1);
    }
  };

  const renderUpvote = () => {
    if (voteValue === 1) {
      return <TiArrowUpThick className="icon-action" />;
    }
    return <TiArrowUpOutline className="icon-action" />;
  };

  const renderDownvote = () => {
    if (voteValue === -1) {
      return <TiArrowDownThick className="icon-action" />;
    }
    return <TiArrowDownOutline className="icon-action" />;
  };

  const getVoteType = () => {
    if (voteValue === 1) {
      return "up-vote";
    }
    if (voteValue === -1) {
      return "down-vote";
    }

    return "";
  };

  const renderComments = () => {
    if (post.errorComments) {
      return (
        <div>
          <h3>Error loading comments</h3>
        </div>
      );
    }

    if (post.loadingComments) {
      return (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      );
    }

    if (post.showingComments) {
      return (
        <div>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }

    return null;
  };
  return (
    <article key={post.id}>
      <Card>
        <div className="post-wrapper">
          <div className="post-votes-container">
            <button
              type="button"
              className={`icon-action-button up-vote ${
                voteValue === 1 && "active"
              }`}
              onClick={() => handleVote(1)}
              aria-label="Up vote"
            >
              {renderUpvote()}
            </button>
            <p className={`post-votes-value ${getVoteType()}`}>
              {shortenNumber(votes, 1)}
            </p>
            <button
              type="button"
              className={`icon-action-button down-vote ${
                voteValue === -1 && "active"
              }`}
              onClick={() => handleVote(-1)}
              aria-label="Down vote"
            >
              {renderDownvote()}
            </button>
          </div>
          <div className="post-container">
            <h3 className="post-title">{post.title}</h3>

            {post.selftext && post.selftext.length > 0 ? (
              <div>
                <ReactMarkdown source={post.selftext} />
              </div>
            ) : (
              <div className="post-image-container">
                {urlisImage(post.url) ? (
                  <img src={post.url} alt="" className="post-image" />
                ) : (
                  convertPostToEmbed(post)
                )}
              </div>
            )}

            <div className="post-details">
              <span className="author-details">
                <Avatar name={post.author} />
                <span className="author-username">{post.author}</span>
              </span>
              <span>{moment.unix(post.created_utc).fromNow()}</span>
              <span className="post-comments-container">
                <button
                  type="button"
                  className={`icon-action-button ${
                    post.showingComments && "showing-comments"
                  }`}
                  onClick={() => onToggleComments(post.permalink)}
                  aria-label="Show comments"
                >
                  <TiMessage className="icon-action" />
                </button>
                {shortenNumber(post.num_comments, 1)}
              </span>
            </div>
            {renderComments()}
          </div>
        </div>
      </Card>
    </article>
  );
}
