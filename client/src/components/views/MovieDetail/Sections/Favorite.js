import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "antd";

function Favorite(props) {
  const [favoriteNumber, setFavoriteNumber] = useState(0);
  const [favorited, setFavorited] = useState(false);

  const movieId = props.movieId;
  const movieTitle = props.movieInfo.title;
  const userFrom = props.userFrom;
  const moviePost = props.movieInfo.backdrop_path;
  const movieRunTime = props.movieInfo.runtime;

  let variables = {
    userFrom,
    movieId,
    movieTitle,
    moviePost,
    movieRunTime,
  };

  useEffect(() => {
    axios
      .post("/api/favorite/favoriteNumber", variables) //
      .then((res) => {
        if (res.data.success) {
          setFavoriteNumber(res.data.favoriteNumber);
        } else {
          alert("숫자 정보를 가져오는 데 실패했습니다.");
        }
      });

    axios
      .post("/api/favorite/favorited", variables) //
      .then((res) => {
        if (res.data.success) {
          setFavorited(res.data.favorited);
        } else {
          alert("정보를 가져오는 데 실패했습니다.");
        }
      });
  }, []);

  const onClickFavorite = () => {
    if (favorited) {
      axios.post("/api/favorite/removeFromFavorite").then((res) => {
        if (res.data.success) {
          setFavoriteNumber(favoriteNumber - 1);
          setFavorited(!favorited);
        } else {
          alert("Favorite 리스트에서 지우는 것을 실패했습니다");
        }
      });
    } else {
      axios.post("/api/favorite/addToFavorite").then((res) => {
        if (res.data.success) {
          setFavoriteNumber(favoriteNumber + 1);
          setFavorited(!favorited);
        } else {
          alert("Favorite 리스트에 추가하는 것을 실패했습니다");
        }
      });
    }
  };

  return (
    <>
      <Button onClick={onClickFavorite}>
        {favorited ? "Not Favorite" : "Add Favorite "} {favoriteNumber}
      </Button>
    </>
  );
}

export default Favorite;
