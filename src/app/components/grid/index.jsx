import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";

class MyGrid extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      columnDefs: [
        {
          headerName: "Make",
          field: "make",
          checkboxSelection: true,
          sortable: true,
          filter: true
        },
        {
          headerName: "Model",
          field: "model",
          sortable: true
        },
        {
          headerName: "Price",
          field: "price",
          sortable: true
        }
      ],
      rowData: [
        {
          make: "Toyota",
          model: "Celica",
          price: 35000
        },
        {
          make: "Ford",
          model: "Mondeo",
          price: 32000
        },
        {
          make: "Porsche",
          model: "Boxter",
          price: 72000
        }
      ]
    };
  }

  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;

    params.api.sizeColumnsToFit();
    window.addEventListener("resize", function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });

    params.api.sizeColumnsToFit();
  };

  render() {
    return (
      <div className="container">
        <div style={{ width: "100%", padding: "24px", height: "100%" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ overflow: "hidden", flexGrow: "1" }}>
              <div
                id="myGrid"
                style={{
                  height: "600px",
                  width: "100%"
                }}
                className="ag-theme-material"
              >
                <AgGridReact
                  columnDefs={this.state.columnDefs}
                  rowData={this.state.rowData}
                  onGridReady={this.onGridReady}
                  rowSelection="multiple"
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
