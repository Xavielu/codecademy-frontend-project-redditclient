import React from "react";
import moment from "moment";
import ReactMarkdown from "react-markdown";
import "./Comment.css";
import Avatar from "../Avatar/Avatar";

export default function Comment(props) {
  const { comment } = props;
  return (
    <div className="comment">
      {/* comment metadata */}
      <div className="comment-metadata">
        {/* comment author avatar */}
        <Avatar name={comment.author} />
        {/* comment author and created time */}
        <p className="comment-author">{comment.author}</p>
        {/* comment created time */}
        <p className="comment-created-time">
          {/* format the time using moment.js library */}
          {moment.unix(comment.created_utc).fromNow()}
        </p>
      </div>

      <ReactMarkdown source={comment.body} />
    </div>
  );
}
