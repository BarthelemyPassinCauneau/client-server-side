const APIDep = "http://localhost:8080/covid_data/heb/dep?cl_age90=0";
const APIReg = "http://localhost:8080/covid_data/heb/reg?cl_age90=0";
const APIRegId = "http://localhost:8080/regions";

export const FetchServerMapDataDep = new Promise((resolve, reject) => {
    fetch(APIDep)
        .then(res => res.json())
        .then(res => resolve(res));
});

export const FetchServerMapDataReg = new Promise((resolve, reject) => {
    fetch(APIReg)
        .then(res => res.json())
        .then(res => resolve(res));
});

export const FetchRegsId = new Promise((resolve, reject) => {
    fetch(APIRegId)
      .then(res => res.json())
      .then(res => resolve(res));
  });