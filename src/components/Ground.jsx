import {usePlane} from "@react-three/cannon";
import {GrassTexture} from '../textures.jsx';
import {RepeatWrapping} from "three";
import {observer as observerLite} from "mobx-react-lite";
import {useContext} from "react";
import {StoreContext} from "../store.jsx";

export const Ground = observerLite(() =>
{
	const [plane] = usePlane(() => ({
		rotation: [-Math.PI / 2, 0, 0],
		position: [0, 0, 0]
	}));
	const {addCube} = useContext(StoreContext);

	GrassTexture.wrapS = RepeatWrapping;
	GrassTexture.wrapT = RepeatWrapping;
	GrassTexture.repeat.set(100, 100);

	const onClick = e =>
	{
		e.stopPropagation();
		const [x, y, z] = Object.values(e.point).map(val => Math.floor(val) + 0.5);
		addCube(x, y, z);
	}

	return <mesh ref={plane} onClick={onClick}>
		<planeGeometry attach="geometry" args={[100, 100]} />
		<meshStandardMaterial attach="material" map={GrassTexture}/>
	</mesh>
});