import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-enterprise";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import DetailCellRenderer from "./detail";
import './index.scss';



class MyGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: props.columnDefs,
      rowData: props.rowData,
      detailRowHeight: 400,
      detailCellRenderer: "myDetailCellRenderer",
      frameworkComponents: { myDetailCellRenderer: DetailCellRenderer },
      defaultColDef: { resizable: true },
      overlayLoadingTemplate: '<span class="ag-overlay-loading-center">Please wait while your data is loading</span>',
      overlayNoRowsTemplate: "<span style=\"padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow;\">This is a custom 'no rows' overlay</span>"
    };
  }

  componentDidMount() {
    console.log(this.state.rowData);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.rowData);
    if (this.props !== nextProps) {
      this.setState({
        columnDefs: nextProps.columnDefs,
        rowData: nextProps.rowData
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
      },500);
    });

    params.api.sizeColumnsToFit();
  };

  onBtShowLoading() {
    this.gridApi.showLoadingOverlay();
  }
  onBtShowNoRows() {
    this.gridApi.showNoRowsOverlay();
  }
  onBtHide() {
    this.gridApi.hideOverlay();
  }
  printDetailGridInfo() {
    console.log("Currently registered detail grid's: ");
    this.gridApi.forEachDetailGridInfo(function(detailGridInfo) {
      console.log(detailGridInfo);
    });
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
                  rowMultiSelectWithClick={true}
                  masterDetail={true}
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
            {/* 
            <div style={{ backgroundColor: "#ccc", padding: "2rem" }}>right side column</div> */}
          </div>
        </div>
      </div>
    );
  }
}

export default MyGrid;
