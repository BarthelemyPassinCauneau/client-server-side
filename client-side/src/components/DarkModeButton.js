import Switch from '@material-ui/core/Switch';
import Sun from "../assets/sun.png";
import Moon from "../assets/moon.png";

import "./DarkModeButton.scss";

export const DarkModeButton = ({ mode, onChange }) => (
	<div className="DarkModeButton">
		<img src={`${mode ? Moon : Sun}`}></img>
		<Switch className="Switch"
			checked={mode}
			onChange={onChange}
		/>
	</div>
);