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
                        <td className="warning_5">  </td>
                        <td>&gt; 3,125‰</td>
                    </tr>
                    <tr>
                        <td className="warning_4">  </td>
                        <td>&lt; 3,125‰</td>
                    </tr>
                    <tr>
                        <td className="warning_3">  </td>
                        <td>&lt; 2,5‰</td>
                    </tr>
                    <tr>
                        <td className="warning_2">  </td>
                        <td>&lt; 1,25‰</td>
                    </tr>
                    <tr>
                        <td className="warning_1">  </td>
                        <td>&lt; 0.625‰</td>
                    </tr>
                    <tr>
                        <td className="warning_0">  </td>
                        <td>&lt; 0.3125‰</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};
