import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function TradeTable(rows) {
    const columns = [
        { field: 'buy_date', headerName: 'Date de transaction', flex: 1.5 },
        { field: 'symbol', headerName: 'Symbole', flex: 1 },
        { field: 'quantity', headerName: 'Quantité', type: 'number', flex: 1 },
        { field: 'buy_price', headerName: 'Prix d\'achat', type: 'number', flex: 1 },
    ];

    return (
        // TODO: Rendre le width reponsive au lieu de hardcoded
        <div style={{ width: 1000 }}>
            <DataGrid rows={rows.rows} columns={columns} autoPageSize autoHeight />
        </div>
    );
}