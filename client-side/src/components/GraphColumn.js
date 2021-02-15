import React, { Component } from "react";
import { render } from "react-dom";
import CanvasJSReact from '../assets/canvasjs/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
export class GraphColumn extends Component {	
	constructor(props) {
		super(props);
		this.state = { zero6 : [{key: 0}]};
	}

	callServer06(){
		fetch("http://localhost:8080/covid_data/heb/dep?week=2020-S24&dep=06")
		.then(res => res.json())
		.then(res => this.setState({ zero6: res}));
	}

	render() {
		var options = {}
		
		if(this.state.zero6.length > 1 && this.state.zero6 != undefined){
			options = {
				animationEnabled: true,
				exportEnabled: true,
				theme: "light2", //"light1", "dark1", "dark2"
				title:{
					text: "Simple Column Chart with Index Labels"
				},
				axisY: {
					includeZero: true
				},
				data: [{
					type: "column",
					indexLabelFontColor: "#5A5757",
					indexLabelPlacement: "outside",
					dataPoints: [
						{ x: this.state.zero6[0].cl_age90, y: this.state.zero6[0].P },
						{ x: this.state.zero6[1].cl_age90, y: this.state.zero6[1].P },
						{ x: this.state.zero6[2].cl_age90, y: this.state.zero6[2].P },
						{ x: this.state.zero6[3].cl_age90, y: this.state.zero6[3].P },
						{ x: this.state.zero6[4].cl_age90, y: this.state.zero6[4].P },
						{ x: this.state.zero6[5].cl_age90, y: this.state.zero6[5].P },
						{ x: this.state.zero6[6].cl_age90, y: this.state.zero6[6].P },
						{ x: this.state.zero6[7].cl_age90, y: this.state.zero6[7].P },
						{ x: this.state.zero6[8].cl_age90, y: this.state.zero6[8].P },
						{ x: this.state.zero6[9].cl_age90, y: this.state.zero6[9].P },
						{ x: this.state.zero6[10].cl_age90, y: this.state.zero6[10].P }
					]
				}]
			} 
			} else {
				options = {
					animationEnabled: true,
					exportEnabled: true,
					theme: "light2", //"light1", "dark1", "dark2"
					title:{
						text: "Simple Column Chart with Index Labels"
					},
					axisY: {
						includeZero: true
					},
					data: [{
						type: "column",
						indexLabelFontColor: "#5A5757",
						indexLabelPlacement: "outside",
						dataPoints: [
							{ x: 1, y: 1 }
						]
					}]
				}
			}
			
		this.callServer06();

		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}