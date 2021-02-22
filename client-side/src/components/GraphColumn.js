import CanvasJSReact from '../assets/canvasjs/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export const GraphColumn = ({currentDep, currentSem, mode, input}) => {	
	var theme = mode ? "dark2" : "white2"
	var options = {}

	if(input.length > 0 && input != undefined && options.data != input){
		options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: theme, 
			title:{
				text: "Nombre d'admission par tranche d'âge dans le département "+currentDep+" lors de la semaine "+currentSem
			},
			axisY: {
				title: "Nb admission"
			},
			axisX: {
				title: "Tranche d'âge",
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
			title:{
				text: "Nombre d'admission par tranche d'âge"
			},
			axisY: {
				includeZero: true
			},
			data: [{
				type: "column",
				indexLabelFontColor: "#5A5757",
				indexLabelPlacement: "outside",
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