function Movie({ movie }) {
	return (
		<a
			href="#"
			className="block w-64 p-6 bg-primary-500 border border-primary-800 rounded-lg shadow hover:bg-primary-100 ">
			<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
				{movie.title}
			</h5>
			<p className="font-normal text-black">{movie.description}.</p>
		</a>
	);
}

export default Movie;
