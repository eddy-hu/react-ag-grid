import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import DetailCellRenderer from "./detail";
import { message } from 'antd';
import { addAllToApplied } from '../../actions/applied.action';
import { connect } from 'react-redux';

import './index.scss';

class MyGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedRows:[],
      columnDefs: props.columnDefs,
      rowData: props.rowData,
      detailRowHeight: 318,
      detailCellRenderer: "myDetailCellRenderer",
      frameworkComponents: { myDetailCellRenderer: DetailCellRenderer },
      defaultColDef: { resizable: true },
      overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your data is loading</span>',
    };
  }

  addAllToApplied(){
    if(this.state.selectedRows && this.state.selectedRows.length > 0){
      this.props.dispatch(addAllToApplied(this.state.selectedRows));
      message.success("Good job! Applied successfully");
    }else{
      message.error('You did not select any jobs!')
    }
   
  }

  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        columnDefs: nextProps.columnDefs,
        rowData: nextProps.rowData,
      })
     
    }

  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    params.api.sizeColumnsToFit();
    window.addEventListener("resize", function () {
      setTimeout(function () {
        params.api.sizeColumnsToFit();
      }, 500);
    });

    params.api.sizeColumnsToFit();
  };

  onSelectionChanged=()=>{
    this.setState({
      selectedRows:this.gridApi.getSelectedRows()
    })
  }

  render() {
    return (
      <div className="container">
        <div style={{ width: "100%", padding: "24px", height: "540px" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ overflow: "hidden", flexGrow: "1" }}>
              <div
                id="myGrid"
                style={{
                  height: "540px",
                  width: "100%"
                }}
                className="ag-theme-material"
              >
                <AgGridReact
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  onGridReady={this.onGridReady}
                  rowSelection="multiple"
                  suppressRowClickSelection={true}
                  rowMultiSelectWithClick={true}
                  masterDetail={true}
                  reactNext={true}
                  onSelectionChanged={this.onSelectionChanged}
                  defaultColDef={this.state.defaultColDef}
                  detailRowHeight={this.state.detailRowHeight}
                  detailCellRenderer={this.state.detailCellRenderer}
                  frameworkComponents={this.state.frameworkComponents}
                  overlayLoadingTemplate={this.state.overlayLoadingTemplate}
                  overlayNoRowsTemplate={this.state.overlayLoadingTemplate}
                  pagination={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.data
  }
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(MyGrid);
