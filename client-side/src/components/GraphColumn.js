import React, { Component } from "react";
import { render } from "react-dom";
import CanvasJSReact from '../assets/canvasjs/canvasjs.react';
import Select from 'react-select'
import { GraphCurve } from "./GraphCurve";
import { initialiseAgGridWithAngular1 } from "ag-grid-community";

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
		this.state = { dataBack : [{key: 0}], defaultSemaine : {value : "24", label : "24"}, defaultDepartement : {value : "00", label : "00"}};
	}

	callServerUser(sem, dep){
		let path = "http://localhost:8080/covid_data/heb/dep?week=2020-S"+sem+"&dep="+dep
		fetch(path)
		.then(res => res.json())
		.then(res => this.setState({ dataBack: res}));
	}

	handleChangeSem = defaultSemaine => {
		this.callServerUser(defaultSemaine.value, this.state.defaultDepartement.value);
		this.setState({ defaultSemaine });
		this.setState({ defaultSemaine });
	};

	handleChangeDep = defaultDepartement => {
		this.callServerUser(this.state.defaultSemaine.value, defaultDepartement.value);
		this.setState({ defaultDepartement });
		this.setState({ defaultDepartement });
	};

	Init(){
		if(this.state.defaultDepartement.value == "00" && this.props.currentDep != 0){
			console.log(this.props.currentDep)
			this.callServerUser("24", this.props.currentDep)
			this.state.defaultDepartement.value = this.props.currentDep;
			this.state.defaultDepartement.label = this.props.currentDep;
		}
	}

	render() {
		this.Init();
		var options = {}
		var {selectedSem} = this.state.defaultSemaine.value;
		var {selectedDep} = this.state.defaultDepartement.value;
		if(this.state.dataBack.length > 1 && this.state.dataBack != undefined){
			options = {
				animationEnabled: true,
				exportEnabled: true,
				theme: "white2", 
				title:{
					text: "Nombre d'admission par tranche d'âge dans le département "+this.state.defaultDepartement.value+" lors de la semaine "+this.state.defaultSemaine.value
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
					dataPoints: [
						{ x: this.state.dataBack[0].cl_age90, y: this.state.dataBack[0].P },
						{ x: this.state.dataBack[1].cl_age90, y: this.state.dataBack[1].P },
						{ x: this.state.dataBack[2].cl_age90, y: this.state.dataBack[2].P },
						{ x: this.state.dataBack[3].cl_age90, y: this.state.dataBack[3].P },
						{ x: this.state.dataBack[4].cl_age90, y: this.state.dataBack[4].P },
						{ x: this.state.dataBack[5].cl_age90, y: this.state.dataBack[5].P },
						{ x: this.state.dataBack[6].cl_age90, y: this.state.dataBack[6].P },
						{ x: this.state.dataBack[7].cl_age90, y: this.state.dataBack[7].P },
						{ x: this.state.dataBack[8].cl_age90, y: this.state.dataBack[8].P },
						{ x: this.state.dataBack[9].cl_age90, y: this.state.dataBack[9].P },
						{ x: this.state.dataBack[10].cl_age90, y: this.state.dataBack[10].P }
					]
				}]
			}
		} else {
			options = {
				animationEnabled: true,
				exportEnabled: true,
				theme: "white2",
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
			<CanvasJSChart options = {options} />
			<br></br>
			<GraphCurve dep={this.state.defaultDepartement.value}/>
		</div>
		);
	}
}