import React from "react";
import "./jokes.scss";

const Joke = ({ text, votes, upvote, downvote }) => {
  const compare = (x, v) => {
    if (v >= x) {
      return v;
    }
  };

  const getobj = () => {
    let obj;
    switch (votes) {
      case compare(15, votes):
        obj = {
          color: "#4CAF50",
          emoji: "em em-rolling_on_the_floor_laughing"
        };
        break;
      case compare(12, votes):
        obj = { color: "#8BC34A", emoji: "em em-laughing" };
        break;
      case compare(9, votes):
        obj = { color: "#CDDC39", emoji: "em em-smiley" };
        break;
      case compare(6, votes):
        obj = { color: "#FFEB3B", emoji: "em em-slightly_smiling_face" };
        break;
      case compare(3, votes):
        obj = { color: "#FFC107", emoji: "em em-neutral_face" };
        break;
      case compare(0, votes):
        obj = { color: "#FF9800", emoji: "em em-confused" };
        break;
      default:
        obj = { color: "#f44336", emoji: "em em-angry" };
    }
    return obj;
  };

  return (
    <div className="Joke">
      <div className="Joke-buttons">
        <i className="fas fa-arrow-up" onClick={upvote} />
        <span className="Joke-votes" style={{ borderColor: getobj().color }}>
          {votes}
        </span>
        <i className="fas fa-arrow-down" onClick={downvote} />
      </div>
      <div className="Joke-text">{text}</div>
      <div className="Joke-smiley">
        <i className={getobj().emoji} />
      </div>
    </div>
  );
};

export default Joke;
