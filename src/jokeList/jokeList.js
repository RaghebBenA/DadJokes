import React, { useEffect, useState, useCallback } from "react";
import Axios from "axios";
import "./jokeList.scss";
import uuid from "uuid";
import Joke from "../joke/joke";
import AnimateReorder  from 'react-animate-reorder'

const JokeList = () => {
  const [jokesData, setJokes] = useState(
    JSON.parse(window.localStorage.getItem("jokes") || "[]")
  );
  const [loading, setLoading] = useState(false);
  let PrevJokes = new Set(jokesData.map((j) => j.text));
  const fetchData = useCallback(async () => {
    try {
      let jokes = [];
      setLoading(true);
      while (jokes.length < 10) {
        let res = await Axios.get("https://icanhazdadjoke.com/", {
          headers: { Accept: "application/json" }
        });
        if (!PrevJokes.has(res.data.joke)) {
          jokes.push({ id: uuid(), text: res.data.joke, votes: 0 });
        }
      }
      setJokes((jokesData) => [...jokesData, ...jokes]);
      setLoading(false);
      window.localStorage.setItem("jokes", JSON.stringify(jokes));
    } catch (err) {
      alert(err);
      setLoading(false);
    }
  }, [PrevJokes]);

  useEffect(() => {
    window.localStorage.setItem("jokes", JSON.stringify(jokesData));
    if (jokesData.length === 0) {
      fetchData();
    }
      
  

  }, [fetchData, jokesData]);

  const HandleVote = (id, delta) => {
    setJokes((jokesData) =>
      jokesData.map((j) => (j.id === id ? { ...j, votes: j.votes + delta } : j))
    );
  };

  const handleClick = () => {
    setLoading(true);
    fetchData();
  };

  let sorted = jokesData.sort((a,b)=>b.votes - a.votes)
  if (loading) {
    return (
      <div className="spinner-Loading">
        <i className="far fa-8x fa-laugh fa-spin" />
        <h1>...Loading</h1>
      </div>
    );
  }
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
        <button onClick={handleClick}>New Jokes</button>
      </div>
      <div className="JokeList-jokes">
      <AnimateReorder >
        {sorted.map(({ text, votes, id }) => (
          <Joke
            key={id}
            text={text}
            votes={votes}
            upvote={() => HandleVote(id, 1)}
            downvote={() => HandleVote(id, -1)}
          />
        ))}
      </AnimateReorder>
      </div>
    </div>
  );
};

export default JokeList;
