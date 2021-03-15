import React, { useState, useEffect } from "react";
import "./favorite.css";
import axios from "axios";
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
          console.log(res.data);
        } else {
          alert("영화 정보를 가져오는 데 실패했습니다.");
        }
      });
  };
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
        <tbody>
          {favorites.map((favorite, index) => {
            return (
              <tr key={index}>
                <td>{favorite.movieTitle}</td>
                <td>{favorite.movieRunTime} mins</td>
                <td>
                  <button>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default FavoritePage;
