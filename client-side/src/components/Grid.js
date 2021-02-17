import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const Grid = ({data}) => {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        { Name: "Cas confirmes", Number: data[0].casConfirmes },
        { Name: "Deces", Number: data[0].deces },
        { Name: "Hospitalisés", Number: data[0].hospitalises },
        { Name: "Reanimation", Number: data[0].reanimation },
        { Name: "Guéris", Number: data[0].gueris },
    ]);

    return (
        <div className="ag-theme-alpine" style={{ height: 270, width: 415 }}>
            <h2>
                Données en France du {data[0].date}
            </h2>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="Name"></AgGridColumn>
                <AgGridColumn field="Number"></AgGridColumn>
            </AgGridReact>
        </div>
    );
};