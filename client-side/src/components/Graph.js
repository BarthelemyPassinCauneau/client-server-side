import { Component, useState } from 'react';
import Select from 'react-select'
import { GraphColumn } from './GraphColumn'
import { GraphCurve } from "./GraphCurve";

import { FetchServerColumnData } from "../lib/FetchServerInputData";
import { stringToArray } from 'ag-grid-community';

var pointsCurve = [{x:1, y:1}];
var pointsColumn = [{x:1, y:1}];
var semaineBase = [];
var dep = 0;
var SEM = 21;
var NB_DEP = 96;

export const Graph = ({currentDep, mode}) => {
    const [dataColumn, setDataColumn] = useState({ dataBack : [{key: 0}]});
    const [dataCurve, setDataCurve] = useState({ dataBack : [{key: 0}]});
	const [departement, setDepartement] = useState({ defaultDepartement : {value : "00", label : "00"}});
	const [semaine, setSemaine] = useState({ defaultSemaine : {value : SEM.toString(), label : SEM.toString()}});
	var {selectedSem} = semaine.defaultSemaine.value;
	var {selectedDep} = departement.defaultDepartement.value;

    
	const departementBase = [];
    for(var i = 0; i <= NB_DEP; i++){
        var val = i>9 ? ''+i.toString() : '0'+i.toString()
        departementBase.push({value : val, label: val})
    }

    const callServerColumn = (sem, dep) => {
		let path = "http://localhost:8080/covid_data/heb/dep?week=2020-S"+sem+"&dep="+dep
		FetchServerColumnData(path).then(data => setDataColumn({dataBack : data}));
	}

    const callServerCurve = () =>{
		pointsCurve = [];
        semaineBase= [];
		dep = departement.defaultDepartement.value;
		let path = "http://localhost:8080/covid_data/heb/dep?dep="+departement.defaultDepartement.value;
        FetchServerColumnData(path).then(res => {
			res.forEach(element => {
                val = parseInt(element.week.split("S")[1], 10)
				if(element.cl_age90 == 0 && val >= SEM){
					pointsCurve.push({ x: val, y: element.P });
                    semaineBase.push({value: val, label: val})
				}
			});
			pointsCurve.sort((a, b)=> a.x - b.x);
            semaineBase.sort((a, b) => a.value - b.label);
			setDataCurve({dataBack : [{key: 0}]});
        });
	}

    if(departement.defaultDepartement.value == "00" && currentDep != 0){
		callServerColumn(SEM, currentDep)
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

    if(dataColumn.dataBack != undefined && dataColumn.dataBack.length > 1 ){
        pointsColumn = [];
        for(var i = 0; i<11; i++){  
            if(dataColumn.dataBack[i].cl_age90 != 0 && dataColumn.dataBack[i].cl_age90 != 1 && dataColumn.dataBack[i].cl_age90 != 90){
                pointsColumn.push({ x: (dataColumn.dataBack[i].cl_age90-4), y: dataColumn.dataBack[i].P })
            }
        }
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
