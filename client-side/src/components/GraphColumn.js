import React, { Component } from "react";
import { render } from "react-dom";
import CanvasJSReact from '../assets/canvasjs/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
export class GraphColumn extends Component {	
	render() {
		var options = {}
		if(this.props.input.length > 1){
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
						{ x: this.props.input[0].cl_age90, y: this.props.input[0].P },
						{ x: this.props.input[1].cl_age90, y: this.props.input[1].P },
						{ x: this.props.input[2].cl_age90, y: this.props.input[2].P },
						{ x: this.props.input[3].cl_age90, y: this.props.input[3].P },
						{ x: this.props.input[4].cl_age90, y: this.props.input[4].P },
						{ x: this.props.input[5].cl_age90, y: this.props.input[5].P },
						{ x: this.props.input[6].cl_age90, y: this.props.input[6].P },
						{ x: this.props.input[7].cl_age90, y: this.props.input[7].P },
						{ x: this.props.input[8].cl_age90, y: this.props.input[8].P },
						{ x: this.props.input[9].cl_age90, y: this.props.input[9].P }
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