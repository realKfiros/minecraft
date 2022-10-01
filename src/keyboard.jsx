import {useCallback, useEffect, useState} from "react";

const getAction = key =>
{
	switch (key)
	{
		case 'KeyW':
			return 'forward';
		case 'KeyS':
			return 'backward';
		case 'KeyA':
			return 'left';
		case 'KeyD':
			return 'right';
		case 'Space':
			return 'jump';
		case 'Digit1':
			return 'Dirt';
		case 'Digit2':
			return 'Grass';
		case 'Digit3':
			return 'Glass';
		case 'Digit4':
			return 'Wood';
		case 'Digit5':
			return 'Log';
		default:
			return false;
	}
}

export const useKeyboard = () =>
{
	const [action, setAction] = useState({
		forward: false,
		backward: false,
		left: false,
		right: false,
		jump: false,
		Dirt: false,
		Grass: false,
		Glass: false,
		Wood: false,
		Log: false
	});

	const updateAction = (e, newState) =>
	{
		const action = getAction(e.code);
		if (action)
		{
			setAction((state) => ({
				...state,
				[action]: newState
			}))
		}
	}

	const onKeyDown = useCallback(e => updateAction(e, true), []);

	const onKeyUp = useCallback(e => updateAction(e, false), []);

	useEffect(() =>
	{
		document.addEventListener('keydown', onKeyDown);
		document.addEventListener('keyup', onKeyUp);

		return () =>
		{
			document.removeEventListener('keydown', onKeyDown);
			document.removeEventListener('keyup', onKeyUp);
		};
	}, [onKeyDown, onKeyUp]);

	return action;
};