import CanvasJSReact from '../assets/canvasjs/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const GraphColumn = ({currentDep, currentSem, mode, input, title, titleX, titleY}) => {	
	var theme = mode ? "dark2" : "white2"
	var options = {}

	options = {
		animationEnabled: true,
		exportEnabled: true,
		theme: theme, 
		title:{
			text: title
		},
		axisY: {
			title: titleY
		},
		axisX: {
			title: titleX,
			includeZero: true
		},
		data: [{
			type: "column",
			indexLabelFontColor: "#5A5757",
			indexLabelPlacement: "outside",
			dataPoints: input
		}]
	}

	return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
	);
}

export default GraphColumn;