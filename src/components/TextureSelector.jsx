import {useContext, useEffect, useState} from "react";
import {observer as observerLite} from "mobx-react-lite";
import {StoreContext} from "../store";
import {css} from "@emotion/react";
import {useKeyboard} from "../keyboard";
import DirtImage from "../assets/dirt.jpeg";
import GrassImage from "../assets/grass.jpeg";
import GlassImage from "../assets/glass.png";
import WoodImage from "../assets/wood.png";
import LogImage from "../assets/log.jpeg";

const images = {
	Dirt: DirtImage,
	Grass: GrassImage,
	Glass: GlassImage,
	Wood: WoodImage,
	Log: LogImage,
};

const styleTextureSelector = css`
	position: absolute;
	bottom: 10%;
	left: 50%;
	transform: translate(-50%, -50%) scale(4);
	
	> img {
		margin: 0 5px;
	}
	
	> .active {
		border: 2px solid yellow;
		transform: translateY(1px);
	}
`;
export const TextureSelector = observerLite(() =>
{
	const {texture, setTexture} = useContext(StoreContext);
	const [visible, setVisible] = useState(false);
	const {Dirt, Grass, Glass, Wood, Log} = useKeyboard();

	useEffect(() =>
	{
		const pressed = Object.entries({Dirt, Grass, Glass, Wood, Log}).find(([, v]) => v);
		if (pressed)
			setTexture(pressed[0]);
	}, [setTexture, Dirt, Grass, Glass, Wood, Log]);

	useEffect(() =>
	{
		const effectTimeout = setTimeout(() => setVisible(false), 2000);
		setVisible(true);
		return () => clearTimeout(effectTimeout);
	}, [texture]);

	return visible ? <div css={styleTextureSelector}>
		{Object.entries(images).map(([k, src]) => <img key={k} src={src} alt={k} className={k === texture ? 'active' : ''}/>)}
	</div> : null;
});