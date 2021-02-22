const API = "http://localhost:8080/covid_data/heb/dep?cl_age90=0";

export const FetchServerMapData = new Promise((resolve, reject) => {
    fetch(API)
        .then(res => res.json())
        .then(res => resolve(res));
});