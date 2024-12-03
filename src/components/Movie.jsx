import { truncateDescription } from "../utils/textUtils";
import { TMDB_BASE_IMAGE_URL } from "../utils/APIUtils";
function Movie({ movie }) {
	const MAX_DESCRIPTION_LENGTH = 100;
	const MAX_TITLE_LENGTH = 20;
	return (
		<a
			href={`/movies/${movie.id}`}
			className="block w-64 h-[32rem] p-2 bg-primary-500 border border-primary-800 rounded-lg shadow hover:bg-primary-400 ">
			<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
				{truncateDescription(movie.title, MAX_TITLE_LENGTH)}
			</h5>
			<img
				className="w-full"
				src={TMDB_BASE_IMAGE_URL + movie.posterURL}
				alt={movie.title}
			/>
			<p className="text-overflow:ellipsis font-normal text-black">
				{truncateDescription(movie.description, MAX_DESCRIPTION_LENGTH)}.
			</p>
		</a>
	);
}

export default Movie;
