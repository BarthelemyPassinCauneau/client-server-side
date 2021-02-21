import "./Grid.scss";

export const Grid = ({data, mode}) => {
    if (data.length > 0) {
        return (
            <div className={`Grid ${mode ? 'dark' : 'light'}`}>
                <table>
                    <thead>
                        <tr>
                            <th colspan="2">Données en France datant du {data[0].date}</th>
                        </tr>
                    </thead>
                    <tr>
                        <td>Guéris</td>
                        <td>{`${data[0].gueris}`}</td>
                    </tr>
                    <tr>
                        <td>Décès</td>
                        <td>{`${data[0].deces}`}</td>
                    </tr>
                    <tr>
                        <td>Hospitalisés</td>
                        <td>{`${data[0].hospitalises}`}</td>
                    </tr>
                </table>
            </div>
        );
    }
    return (<div className={`Grid ${mode ? 'dark' : 'light'}`}>Accès aux données en cours...</div>);
};