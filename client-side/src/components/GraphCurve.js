import { Component, useState } from 'react';
import { render } from "react-dom";
import CanvasJSReact from '../assets/canvasjs/canvasjs.react';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var dataPoints =[];
var dep = 0;
export const GraphCurve = ({currentDep}) => {
	const [data, setData] = useState({ dataBack : [{key: 0}]});

	const callServerUser = () =>{
		dataPoints = [];
		dep = currentDep;
		let path = "http://localhost:8080/covid_data/heb/dep?dep="+dep;
		fetch(path)
		.then(res => res.json())
		.then(res => { 
			res.forEach(element => {
				console.log(element);
				if(element.cl_age90 == 0){
					
					dataPoints.push({ x: parseInt(element.week.split("S")[1], 10), y: element.P });
				}
			});
			dataPoints.sort((a, b)=> a.x - b.x);
			setData({dataBack : [{key: 0}]});
		});
	}

	var options = {}
	if(dataPoints != [] ){
		options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "white2",
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
				dataPoints: dataPoints
			}]
		}
	} else {
		options = {
			animationEnabled: true,
			exportEnabled: true,
			theme: "white2",
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
				dataPoints: {x:0, y:0}
			}]
		}
	}

	if(dep != currentDep){
		callServerUser();
	}


	return (
		<div>
			<CanvasJSChart options = {options} />
		</div>
	);
}