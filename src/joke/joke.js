import React from "react";
import "./jokes.scss";

const Joke = ({ text, votes, upvote, downvote }) => {
  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fas fa-arrow-up" onClick={upvote} />
        <span className="Joke-votes">{votes}</span>
        <i className="fas fa-arrow-down" onClick={downvote} />
      </div>
      <div className="Joke-text">{text}</div>
      <div className="Joke-smiley">
        <i className="em em-laughing" />
      </div>
    </div>
  );
};

export default Joke;
