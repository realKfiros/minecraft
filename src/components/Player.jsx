import {useFrame, useThree} from "@react-three/fiber";
import {useSphere} from "@react-three/cannon";
import {useEffect, useRef} from "react";
import {Vector3} from "three";
import {useKeyboard} from "../keyboard";
import {JUMP_FORCE, PLAYER_SPEED} from "../consts";

export const Player = () =>
{
	const {forward, backward, left, right, jump} = useKeyboard();
	const {camera} = useThree();
	const [ref, api] = useSphere(() => ({
		mass: 1,
		type: 'Dynamic',
		position: [0, 1, 0]
	}));
	const position = useRef([0, 0, 0]);
	const velocity = useRef([0, 0, 0]);

	useEffect(() =>
	{
		api.position.subscribe(p => position.current = p);
	}, [api.position]);

	useEffect(() =>
	{
		api.velocity.subscribe(p => velocity.current = p);
	}, [api.velocity]);

	useFrame(() =>
	{
		camera.position.copy(new Vector3(position.current[0], position.current[1], position.current[2]));

		const direction = new Vector3();
		const front = new Vector3(0, 0, (backward ? 1 : 0) - (forward ? 1 : 0));
		const side = new Vector3((left ? 1 : 0) - (right ? 1 : 0), 0, 0);

		direction.subVectors(front, side).normalize().multiplyScalar(PLAYER_SPEED).applyEuler(camera.rotation);

		api.velocity.set(direction.x, velocity.current[1], direction.z);

		if (jump && Math.abs(velocity.current[1]) < 0.05)
			api.velocity.set(velocity.current[0], JUMP_FORCE, velocity.current[2]);
	});

	return <mesh ref={ref} />

}