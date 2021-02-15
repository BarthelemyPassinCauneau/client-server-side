import React, { Component } from "react";
import { render } from "react-dom";
import CanvasJSReact from '../assets/canvasjs/canvasjs.react';
import Select from 'react-select'

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
const semaine = [
	{ value: '22', label: '22' },
	{ value: '23', label: '23' },
	{ value: '24', label: '24' }
]
const departement = [
	{ value: '04', label: '04' },
	{ value: '05', label: '05' },
	{ value: '06', label: '06' }
] 

export class GraphColumn extends Component {	
	constructor(props) {
		super(props);
		this.state = { zero6 : [{key: 0}], defaultSemaine : {value : "24", label : "24"}, defaultDepartement : {value : "06", label : "06"}};
	}

	componentDidMount() {
		this.callServerUser("24", "06")
	}

	callServerUser(sem, dep){
		let path = "http://localhost:8080/covid_data/heb/dep?week=2020-S"+sem+"&dep="+dep
		console.log(path);
		fetch(path)
		.then(res => res.json())
		.then(res => this.setState({ zero6: res}));
	}

	handleChangeSem = defaultSemaine => {
		console.log(defaultSemaine.value);
		this.callServerUser(defaultSemaine.value, this.state.defaultDepartement.value);
		this.setState({ defaultSemaine });
	};

	handleChangeDep = defaultDepartement => {
		this.callServerUser(this.state.defaultSemaine.value, defaultDepartement.value);
		this.setState({ defaultDepartement });
	};

	render() {
		var options = {}
		var {selectedSem} = this.state.defaultSemaine.value;
		var {selectedDep} = this.state.defaultDepartement.value;
		console.log(selectedSem);
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
		return (
		<div>
			<p>Sélectionnez une semaine</p>
			<Select options={semaine} value={selectedSem} onChange={this.handleChangeSem} defaultValue = {this.state.defaultSemaine} />
			<p>Sélectionnez un département</p>
			<Select options={departement} value={selectedDep} onChange={this.handleChangeDep} defaultValue = {this.state.defaultDepartement}/>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}