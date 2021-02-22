import { Component, useState } from 'react';
import { render } from "react-dom";
import CanvasJSReact from '../assets/canvasjs/canvasjs.react';
import Select from 'react-select'
import { GraphColumn } from './GraphColumn'
import { GraphCurve } from "./GraphCurve";
import { initialiseAgGridWithAngular1 } from "ag-grid-community";

var pointsCurve =[];
var pointsColumn =[];
var dep = 0;
export const Graph = ({currentDep, mode}) => {
    const [dataColumn, setDataColumn] = useState({ dataBack : [{key: 0}]});
    const [dataCurve, setDataCurve] = useState({ dataBack : [{key: 0}]});
	const [departement, setDepartement] = useState({ defaultDepartement : {value : "00", label : "00"}});
	const [semaine, setSemaine] = useState({ defaultSemaine : {value : "24", label : "24"}});
	var {selectedSem} = semaine.defaultSemaine.value;
	var {selectedDep} = departement.defaultDepartement.value;

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

    const callServerColumn = (sem, dep) => {
		let path = "http://localhost:8080/covid_data/heb/dep?week=2020-S"+sem+"&dep="+dep
		fetch(path)
		.then(res => res.json())
		.then(res => setDataColumn({ dataBack: res}));
	}

    const callServerCurve = () =>{
		pointsCurve = [];
		dep = departement.defaultDepartement.value;
		let path = "http://localhost:8080/covid_data/heb/dep?dep="+departement.defaultDepartement.value;
        console.log(path);
		fetch(path)
		.then(res => res.json())
		.then(res => { 
			res.forEach(element => {
				if(element.cl_age90 == 0){
					pointsCurve.push({ x: parseInt(element.week.split("S")[1], 10), y: element.P });
				}
			});
			pointsCurve.sort((a, b)=> a.x - b.x);
			setDataCurve({dataBack : [{key: 0}]});
		});
	}

    if(departement.defaultDepartement.value == "00" && currentDep != 0){
		callServerColumn("24", currentDep)
		departement.defaultDepartement.value = currentDep;
		departement.defaultDepartement.label = currentDep;
	}

    const handleChangeSem = defaultSemaine => {
		callServerColumn(defaultSemaine.value, departement.defaultDepartement.value);
		setSemaine({ defaultSemaine });
	};

	const handleChangeDep = defaultDepartement => {
		callServerColumn(semaine.defaultSemaine.value, defaultDepartement.value);
		setDepartement({ defaultDepartement });
	};

    if(dataColumn.dataBack.length > 1 && dataColumn.dataBack != undefined){
        pointsColumn = [
            { x: dataColumn.dataBack[0].cl_age90, y: dataColumn.dataBack[0].P },
            { x: dataColumn.dataBack[1].cl_age90, y: dataColumn.dataBack[1].P },
            { x: dataColumn.dataBack[2].cl_age90, y: dataColumn.dataBack[2].P },
            { x: dataColumn.dataBack[3].cl_age90, y: dataColumn.dataBack[3].P },
            { x: dataColumn.dataBack[4].cl_age90, y: dataColumn.dataBack[4].P },
            { x: dataColumn.dataBack[5].cl_age90, y: dataColumn.dataBack[5].P },
            { x: dataColumn.dataBack[6].cl_age90, y: dataColumn.dataBack[6].P },
            { x: dataColumn.dataBack[7].cl_age90, y: dataColumn.dataBack[7].P },
            { x: dataColumn.dataBack[8].cl_age90, y: dataColumn.dataBack[8].P },
            { x: dataColumn.dataBack[9].cl_age90, y: dataColumn.dataBack[9].P },
            { x: dataColumn.dataBack[10].cl_age90, y: dataColumn.dataBack[10].P }
        ]
    } else {
        pointsColumn = [
            { x: 1, y: 1 }
        ]
    }

    if(dep != departement.defaultDepartement.value){
		callServerCurve();
	}

    const colourStyles = {
		control: styles => ({ ...styles, backgroundColor: mode ? 'black' : 'white', width:100 }),
		option: (styles, { data, isDisabled, isFocused, isSelected }) => {
			return {
				...styles,
				backgroundColor: isSelected ? "#3f51b5" : isFocused ? "#757de8" : mode ? "black" : "white",
				color: mode ? 'white' : 'black',
				width: 100
			};
		},
		container: styles => ({...styles, width: 100})
	};

    return (
		<div>
            <p>Sélectionnez un département</p>
			<Select styles={colourStyles} options={departementBase} value={selectedDep} onChange={handleChangeDep} defaultValue = {departement.defaultDepartement} />
			<p>Sélectionnez une semaine</p>
			<Select styles={colourStyles} options={semaineBase} value={selectedSem} onChange={handleChangeSem} defaultValue = {semaine.defaultSemaine} />
			<GraphColumn currentDep={departement.defaultDepartement.value} currentSem={semaine.defaultSemaine.value} mode={mode} input={pointsColumn}/>
			<br></br>
			<GraphCurve currentDep={departement.defaultDepartement.value} mode={mode} input={pointsCurve}/>
		</div>
	);
}
