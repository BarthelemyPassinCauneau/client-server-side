const API = "https://coronavirusapi-france.now.sh/FranceLiveGlobalData";

export const FetchFranceLiveGlobalData = new Promise((resolve, reject) => {
    fetch(API)
        .then(res => res.json())
        .then(res => resolve(res.FranceGlobalLiveData));
});
