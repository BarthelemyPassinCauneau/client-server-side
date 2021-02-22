import CanvasJSReact from '../assets/canvasjs/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const GraphCurve = ({currentDep, mode, input, title, titleX, titleY}) => {
	var theme = mode ? "dark2" : "white2"
	var options = {}
	
	if(input.length > 0 && input != undefined && options.data != input){
		options = {
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
		}
	} else {
		options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: theme,
			data: [{
				type: "line",
				dataPoints: input
			}]
		}
	}

	return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
	);
}