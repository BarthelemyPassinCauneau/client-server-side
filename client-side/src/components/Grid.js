import "./Grid.scss";

export const Grid = ({data, mode}) => {
    if (data.length > 1) {
        return (
            <div className={`Grid ${mode ? 'dark' : 'light'}`}>
                <h3>
                    Données en France datant du {data[0].date}
                </h3>
                <table>
                    <tr>
                        <td>Cas confirmés</td>
                        <td>{`${data[0].casConfirmes}`}</td>
                    </tr>
                    <tr>
                        <td>Décès</td>
                        <td>{`${data[0].deces}`}</td>
                    </tr>
                    <tr>
                        <td>Hospitalisés</td>
                        <td>{`${data[0].hospitalises}`}</td>
                    </tr>
                    <tr>
                        <td>Réanimation</td>
                        <td>{`${data[0].reanimation}`}</td>
                    </tr>
                    <tr>
                        <td>Guéris</td>
                        <td>{`${data[0].gueris}`}</td>
                    </tr>
                </table>
            </div>
        );
    }
    return (<div>Accès aux données en cours...</div>);
};