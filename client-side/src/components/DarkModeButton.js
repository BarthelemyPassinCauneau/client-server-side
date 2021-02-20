import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import "./DarkModeButton.scss";

export const DarkModeButton = ({ mode, onChange }) => (
	<div className="DarkModeButton">
		<FormControlLabel
			value="top"
			control={
				<Switch 
					checked={mode}
					onChange={onChange}
				/>}
			label={`${mode ? 'Mode sombre' : 'Mode normal'}`}
			labelPlacement="top"
			/>
	</div>
);