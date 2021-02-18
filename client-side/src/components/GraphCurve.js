import React, { Component } from "react";
import { render } from "react-dom";
import CanvasJSReact from '../assets/canvasjs/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];
var dep = 0;
export class GraphCurve extends Component {
	constructor(props) {
		super(props);
		this.state = { dataBack : [{key: 0}], defaultSemaine : {value : "24", label : "24"}, defaultDepartement : {value : "06", label : "06"}};
	}

	callServerUser(){
		dataPoints = [];
		dep = this.props.dep;
		let path = "http://localhost:8080/covid_data/heb/dep?dep="+dep;
		fetch(path)
		.then(res => res.json())
		.then(res => { 
			this.setState({ dataBack: res});
			this.state.dataBack.forEach(element => {
				if(element.cl_age90 == 0){
					dataPoints.push({ x: parseInt(element.week.split("S")[1], 10), y: element.P });
				}
			});
			dataPoints.sort((a, b)=> a.x - b.x);
			this.setState({dataBack : [{key: 0}]});
		});
	}

	render() {	
		var options = {}
		if(dataPoints != [] ){
			options = {
				animationEnabled: true,
				exportEnabled: true,
				theme: "white2",
				title: {
					text: "Evolution du nombre d'admission pour le département "+this.props.dep,
				},
				axisX: {
					title: "Semaine"
				},
				axisY: {
					title: "Nb admission"
				},
				data: [{
					type: "line",
					dataPoints: dataPoints
				}]
			}
		} else {
			options = {
				animationEnabled: true,
				exportEnabled: true,
				theme: "white2",
				title: {
					text: "Evolution du nombre d'admission pour le département "+this.props.dep,
				},
				axisX: {
					title: "Semaine"
				},
				axisY: {
					title: "Nb admission"
				},
				data: [{
					type: "line",
					dataPoints: {x:0, y:0}
				}]
			}
		}
		if(dep != this.props.dep){
			this.callServerUser();
		}
		return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
		);
	}
}