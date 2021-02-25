import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Sun from "../assets/sun.png";
import Moon from "../assets/moon.png";

import "./DarkModeButton.scss";

export const DarkModeButton = ({ mode, onChange }) => (
	<div className="DarkModeButton">
		<img src={`${mode ? Moon : Sun}`}></img>
		<FormControlLabel
			className="FormControlLabel"
			control={
				<Switch 
					checked={mode}
					onChange={onChange}
				/>
			}
		/>
	</div>
);