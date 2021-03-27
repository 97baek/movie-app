import React, { useState, useEffect } from "react";
import "./favorite.css";
import axios from "axios";
import { Popover } from "antd";
import { IMAGE_BASE_URL } from "../../Config";
function FavoritePage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavoredMovie();
  }, []);

  const fetchFavoredMovie = () => {
    axios
      .post("/api/favorite/getFavoredMovie", { userFrom: localStorage.getItem("userId") })
      .then((res) => {
        if (res.data.success) {
          setFavorites(res.data.favorites);
          console.log(favorites);
        } else {
          alert("영화 정보를 가져오는 데 실패했습니다.");
        }
      });
  };

  const renderCards = favorites.map((favorite, index) => {
    const content = (
      <div>
        {favorite.moviePost ? (
          <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} alt={favorite.movieTitle} />
        ) : (
          "no image"
        )}
      </div>
    );
    return (
      <tr key={index}>
        <Popover content={content} title={`${favorite.movieTitle}`}>
          <td>{favorite.movieTitle}</td>
        </Popover>
        <td>{favorite.movieRunTime} mins</td>
        <td>
          <button>Remove</button>
        </td>
      </tr>
    );
  });

  return (
    <div style={{ width: "85%", margin: "3rem auto" }}>
      <h2>Favorite Movies</h2>
      <hr />

      <table>
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Movie Runtime</th>
            <td>Remove from favorites</td>
          </tr>
        </thead>
        <tbody>{renderCards}</tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
