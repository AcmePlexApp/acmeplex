import { useParams } from "react-router-dom";

function MovieDetail({ children }) {
	const { movieId } = useParams(); // Extract the "id" parameter from the URL
	return (
		<div className="container">
			<h1>Browse Theatres for Movie {movieId}</h1>
			{children}
		</div>
	);
}

export default MovieDetail;
