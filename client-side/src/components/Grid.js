import "./Grid.scss";

export const Grid = ({data, mode}) => {
    if (data.length > 0) {
        return (
            <div className={`Grid ${mode ? 'dark' : 'light'}`}>
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">Données en France datant du {new Intl.DateTimeFormat('fr-FR', {day: 'numeric', month: 'long', year: 'numeric'}).format(Date.UTC(parseInt(data[0].date.split("-")[0]), parseInt(data[0].date.split("-")[1])-1, parseInt(data[0].date.split("-")[2])))}</th>
                        </tr>
                    </thead>
                    <tr>
                        <td>Guéris</td>
                        <td>{`${new Intl.NumberFormat('fr-FR').format(data[0].gueris)}`}</td>
                    </tr>
                    <tr>
                        <td>Décès</td>
                        <td>{`${new Intl.NumberFormat('fr-FR').format(data[0].deces)}`}</td>
                    </tr>
                    <tr>
                        <td>Hospitalisés</td>
                        <td>{`${new Intl.NumberFormat('fr-FR').format(data[0].hospitalises)}`}</td>
                    </tr>
                </table>
            </div>
        );
    }
    return (
    <div className={`Grid ${mode ? 'dark' : 'light'}`}>
        <p>Accès aux données en cours...</p>
        <div class="loader"></div>
    </div>);
};