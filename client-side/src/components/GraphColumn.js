import { Component, useState } from 'react';
import { render } from "react-dom";
import CanvasJSReact from '../assets/canvasjs/canvasjs.react';
import Select from 'react-select'
import { GraphCurve } from "./GraphCurve";
import { initialiseAgGridWithAngular1 } from "ag-grid-community";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
export const GraphColumn = ({currentDep, mode}) => {	
	const [data, setData] = useState({ dataBack : [{key: 0}]});
	const [departement, setDepartement] = useState({ defaultDepartement : {value : "00", label : "00"}});
	const [semaine, setSemaine] = useState({ defaultSemaine : {value : "24", label : "24"}});
	const semaineBase = [
		{ value: '22', label: '22' },
		{ value: '23', label: '23' },
		{ value: '24', label: '24' }
	]
	const departementBase = [
		{ value: '04', label: '04' },
		{ value: '05', label: '05' },
		{ value: '06', label: '06' }
	] 

	const callServerUser = (sem, dep) => {
		let path = "http://localhost:8080/covid_data/heb/dep?week=2020-S"+sem+"&dep="+dep
		fetch(path)
		.then(res => res.json())
		.then(res => setData({ dataBack: res}));
	}

	const handleChangeSem = defaultSemaine => {
		callServerUser(defaultSemaine.value, departement.defaultDepartement.value);
		setSemaine({ defaultSemaine });
	};

	const handleChangeDep = defaultDepartement => {
		callServerUser(semaine.defaultSemaine.value, defaultDepartement.value);
		setDepartement({ defaultDepartement });
	};

	if(departement.defaultDepartement.value == "00" && currentDep != 0){
		callServerUser("24", currentDep)
		departement.defaultDepartement.value = currentDep;
		departement.defaultDepartement.label = currentDep;
	}
	var theme = mode ? "dark2" : "white2"
	var options = {}
	var {selectedSem} = semaine.defaultSemaine.value;
	var {selectedDep} = departement.defaultDepartement.value;
	if(data.dataBack.length > 1 && data.dataBack != undefined){
		options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: theme, 
			title:{
				text: "Nombre d'admission par tranche d'âge dans le département "+departement.defaultDepartement.value+" lors de la semaine "+semaine.defaultSemaine.value
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
					{ x: data.dataBack[0].cl_age90, y: data.dataBack[0].P },
					{ x: data.dataBack[1].cl_age90, y: data.dataBack[1].P },
					{ x: data.dataBack[2].cl_age90, y: data.dataBack[2].P },
					{ x: data.dataBack[3].cl_age90, y: data.dataBack[3].P },
					{ x: data.dataBack[4].cl_age90, y: data.dataBack[4].P },
					{ x: data.dataBack[5].cl_age90, y: data.dataBack[5].P },
					{ x: data.dataBack[6].cl_age90, y: data.dataBack[6].P },
					{ x: data.dataBack[7].cl_age90, y: data.dataBack[7].P },
					{ x: data.dataBack[8].cl_age90, y: data.dataBack[8].P },
					{ x: data.dataBack[9].cl_age90, y: data.dataBack[9].P },
					{ x: data.dataBack[10].cl_age90, y: data.dataBack[10].P }
				]
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
				dataPoints: [
					{ x: 1, y: 1 }
				]
			}]
		}
	}	

	return (
		<div>
			<p>Sélectionnez une semaine</p>
			<Select options={semaineBase} value={selectedSem} onChange={handleChangeSem} defaultValue = {semaine.defaultSemaine} />
			<p>Sélectionnez un département</p>
			<Select options={departementBase} value={selectedDep} onChange={handleChangeDep} defaultValue = {departement.defaultDepartement} />
			<CanvasJSChart options = {options} />
			<br></br>
			<GraphCurve currentDep={departement.defaultDepartement.value} mode={mode}/>
		</div>
	);


}