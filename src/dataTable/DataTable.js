import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import { getDataForDataTable } from '../dataHelper';
const columns = [{
    dataField: 'id',
    text: 'Operation ID',
    sort: true
}, {
    dataField: 'name',
    text: 'Operation Name',
    sort: true
}, {
    dataField: 'count',
    text: 'Count',
    sort: true
}];

const defaultSorted = [{
    dataField: 'name',
    order: 'desc'
}];
const DataTable = ({notSelectedLabels}) => {
    return (
        <div>
            <BootstrapTable
                bootstrap4
                keyField="id"
                data={getDataForDataTable(notSelectedLabels)}
                columns={columns}
                defaultSorted={defaultSorted}
            />
        </div>
    )
}
export default DataTable;