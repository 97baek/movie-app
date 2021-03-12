import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, API_KEY, IMAGE_BASE_URL } from "../../Config";
import MainImage from "../LandingPage/Sections/MainImage";
import MovieInfo from "./Sections/MovieInfo";

function MovieDetail() {
  const [movie, setMovie] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    const endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
    const endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
    fetch(endpointInfo)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, []);
  return (
    <div>
      {/* Header */}
      <MainImage
        image={`${IMAGE_BASE_URL}w1280${movie.backdrop_path}`}
        title={movie.original_title}
        text={movie.overview}
      />
      {/* Body */}
      <div style={{ width: "85%", margin: "1rem auto" }}>
        {/* Movie Info */}
        <MovieInfo movie={movie} />
        <br />
        <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
          <button>Toggle Actor View</button>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
