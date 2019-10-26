import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./jokeList.scss";
import uuid from "uuid";
import Joke from "../joke/joke";

const JokeList = () => {
  const [jokesData, setJokes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      let jokes = [];

      while (jokes.length < 10) {
        let res = await Axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
        });
        jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
      }

      setJokes(jokes);
    };
    fetchData();
  }, []);

  const HandleVote = (id, delta) => {
    setJokes((jokesData) =>
      jokesData.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  };

  return (
    <div className="JokeList">
      <div className="JokeList-sidebar">
        <h1>
          <span>Dad</span> Jokes
        </h1>

        <img
          alt="emoji"
          src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
        />
        <button>New Jokes</button>
      </div>
      <div className="JokeList-jokes">
        {jokesData.map(({ text, votes, id }) => (
          <Joke
            key={id}
            text={text}
            votes={votes}
            upvote={() => HandleVote(id, 1)}
            downvote={() => HandleVote(id, -1)}
          />
        ))}
      </div>
    </div>
  );
};

export default JokeList;
