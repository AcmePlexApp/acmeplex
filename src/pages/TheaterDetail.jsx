import { useParams } from "react-router-dom";

function TheaterDetail({ children }) {
	const { theatreId } = useParams();
	return (
		<div>
			<h1>Browse Movies for Theatre {theatreId}</h1>
			{children}
		</div>
	);
}

export default TheaterDetail;
