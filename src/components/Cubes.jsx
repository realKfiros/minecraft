import {observer as observerLite} from "mobx-react-lite";
import {useContext} from "react";
import {StoreContext} from "../store.jsx";
import {Cube} from "./Cube.jsx";

export const Cubes = observerLite(() =>
{
	const {cubes} = useContext(StoreContext);

	return cubes.map(cube => <Cube {...cube} />);
});