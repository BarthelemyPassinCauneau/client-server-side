import CanvasJSReact from '../assets/canvasjs/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

export const GraphColumn = ({currentDep, currentSem, mode, input, title, titleX, titleY}) => {	
	var theme = mode ? "dark2" : "white2"
	var options = {}

	//If input isn't empty, set the graph data with it
	if(input.length > 0 && input != undefined && options.data != input){
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
	} else {
		options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: theme,
			data: [{
				type: "column",
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
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