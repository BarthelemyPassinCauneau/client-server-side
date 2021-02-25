import "./Legend.scss";

export const Legend = () => {
    return (
        <div className={`Legend`}>
            <table>
                <thead>
                    <tr>
                        <th colSpan="2">Légende :</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="warning_high">  </td>
                        <td>&gt; 2,5‰</td>
                    </tr>
                    <tr>
                        <td className="warning_medium">  </td>
                        <td>&lt; 2,5‰</td>
                    </tr>
                    <tr>
                        <td className="warning_low">  </td>
                        <td>&lt; 1,25‰</td>
                    </tr>
                    <tr>
                        <td className="warning_very_low">  </td>
                        <td>&lt; 0.625‰</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
