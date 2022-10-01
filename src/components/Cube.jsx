import {useBox} from "@react-three/cannon";
import * as textures from '../textures';
import {observer as observerLite} from "mobx-react-lite";
import {useContext, useState} from "react";
import {StoreContext} from "../store.jsx";

export const Cube = observerLite(({position, texture}) =>
{
	const [hovered, setHovered] = useState(false);
	const {addCube, removeCube} = useContext(StoreContext);
	const [box] = useBox(() => ({
		type: 'Static',
		position
	}));

	const activeTexture = textures[texture + 'Texture'];

	const onPointerMove = e =>
	{
		e.stopPropagation();
		setHovered(true);
	}

	const onPointerOut = e =>
	{
		e.stopPropagation();
		setHovered(false);
	}

	const onClick = e =>
	{
		const clickedFace = Math.floor(e.faceIndex / 2);
		const {x, y, z} = box.current.position;
		if (e.altKey)
			removeCube(x, y, z);
		else if (clickedFace === 0)
			addCube(x + 1, y, z);
		else if (clickedFace === 1)
			addCube(x - 1, y, z);
		else if (clickedFace === 2)
			addCube(x, y + 1, z);
		else if (clickedFace === 3)
			addCube(x, y - 1, z);
		else if (clickedFace === 4)
			addCube(x, y, z + 1);
		else if (clickedFace === 5)
			addCube(x - 1, y, z - 1);
	}

	return <mesh ref={box} onClick={onClick} onPointerMove={onPointerMove} onPointerOut={onPointerOut}>
		<boxGeometry attach="geometry" />
		<meshStandardMaterial attach="material"
		                      color={hovered ? 'grey' : 'white'}
		                      transparent
		                      opacity={texture === 'Glass' ? 0.7 : 1}
		                      map={activeTexture} />
	</mesh>
});