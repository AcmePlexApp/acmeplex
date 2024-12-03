import Movie from "./Movie";
function MovieList(props) {
	return (
		<div className="flex flex-wrap flex-center justify-center gap-1">
			{props.movies.map((movie) => {
				return <Movie key={movie.id} movie={movie} />;
			})}
		</div>
	);
}

export default MovieList;
