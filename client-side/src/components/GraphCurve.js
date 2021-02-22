import CanvasJSReact from '../assets/canvasjs/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export const GraphCurve = ({currentDep, mode, input}) => {
	var theme = mode ? "dark2" : "white2"
	var options = {}
	
	if(input.length > 0 && input != undefined && options.data != input){
		options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: theme,
			title: {
				text: "Evolution du nombre d'admission pour le département "+currentDep,
			},
			axisX: {
				title: "Semaine"
			},
			axisY: {
				title: "Nb admission"
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
			title: {
				text: "Evolution du nombre d'admission pour le département "+currentDep,
			},
			axisX: {
				title: "Semaine"
			},
			axisY: {
				title: "Nb admission"
			},
			data: [{
				type: "line",
				dataPoints: [{x:1, y:1}]
			}]
		}
	}

	return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
	);
}