const API = "https://api-adresse.data.gouv.fr/reverse/";

export const FetchLocationUserDep = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(position => {
        fetch(API + "?lat=" + position.coords.latitude + '&lon=' + position.coords.longitude)
          .then(location => location.json())
          .then(location => resolve(location.features[0].properties.context.split(",")[0]));
    });
});