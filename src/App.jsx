import {Canvas} from "@react-three/fiber";
import {Sky} from "@react-three/drei";
import {Physics} from "@react-three/cannon";
import {Ground} from "./components/Ground";
import {Player} from "./components/Player";
import {PlayerView} from "./components/PlayerView";
import {css} from "@emotion/react";
import {Store, StoreContext} from "./store";
import {Cubes} from "./components/Cubes";
import {TextureSelector} from "./components/TextureSelector";
import {Menu} from "./components/Menu";

const styleApp = css`
	height: 100vh;
	width: 100vw;
	
	.cursor {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: white;
;	}
`;
export const App = () =>
{
	return <StoreContext.Provider value={new Store()}>
		<div css={styleApp}>
			<Canvas>
				<Sky sumPosition={[100,100,20]} />
				<ambientLight intensity={0.5} />
				<PlayerView />
				<Physics>
					<Player />
					<Cubes />
					<Ground />
				</Physics>
			</Canvas>
			<div className="cursor">+</div>
			<TextureSelector />
			<Menu />
		</div>
	</StoreContext.Provider>
};
