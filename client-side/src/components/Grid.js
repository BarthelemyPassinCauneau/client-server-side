import React, { useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const Grid = ({data}) => {

    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);

    const [rowData, setRowData] = useState([
        { Country: "France", Name: "Cas confirmes", Number: data[0].casConfirmes },
        { Country: "France", Name: "Deces", Number: data[0].deces},
        { Country: "France", Name: "Reanimation", Number: data[0].reanimation}
    ]);

    return (
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
            <AgGridReact
                rowData={rowData}>
                <AgGridColumn field="Country"></AgGridColumn>
                <AgGridColumn field="Name"></AgGridColumn>
                <AgGridColumn field="Number"></AgGridColumn>
            </AgGridReact>
        </div>
    );
};