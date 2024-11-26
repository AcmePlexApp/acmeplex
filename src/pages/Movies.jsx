import { useEffect } from "react";
import useNavTitle from "../hooks/useNavTitle";

function Movies(props) {
	const { setNavTitle } = useNavTitle();
	/* eslint-disable react-hooks/exhaustive-deps */
	useEffect(() => {
		setNavTitle("Browse Movies");
	}, []);
	return <>{props.children}</>;
}

export default Movies;
