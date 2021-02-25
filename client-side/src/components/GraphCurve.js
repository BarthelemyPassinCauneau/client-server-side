import CanvasJSReact from '../assets/canvasjs/canvasjs.react';

let CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphCurve = ({currentDep, mode, input, title, titleX, titleY}) => {
	let theme = mode ? "dark2" : "white2";
	let options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: theme,
		title: {
			text: title,
		},
		axisX: {
			title: titleX
		},
		axisY: {
			title: titleY
		},
		data: [{
			type: "line",
			dataPoints: input
		}]
	};

	return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
	);
}

export default GraphCurve;