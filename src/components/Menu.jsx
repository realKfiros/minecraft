import {observer} from "mobx-react-lite";
import {useContext} from "react";
import {StoreContext} from "../store.jsx";
import {css} from "@emotion/react";

const styleMenu = css`
	position: absolute;
	top: 10px;
	left: 10px;
	display: flex;
	flex-direction: column;
	button {
		margin: 10px;
	}
`
export const Menu = observer(() =>
{
	const {save, reset} = useContext(StoreContext);

	return <div css={styleMenu}>
		<button onClick={save}>Save</button>
		<button onClick={reset}>Reset</button>
	</div>;
})