import React, {Component} from 'react';
import { Card ,Descriptions } from 'antd';
import "ag-grid-enterprise";
import './detail.scss';

export default class DetailCellRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      size: 'default',
    };

    this.state.rowIndex = props.rowIndex;
    this.state.masterGridApi = props.api;
  }

  render() {
    return (
      <div className="full-width-panel">
        <Card >
        <Descriptions bordered title={this.props.data.title} border size={this.state.size}>
          <Descriptions.Item label="Product">Cloud Database</Descriptions.Item>
          <Descriptions.Item label="Billing">Prepaid</Descriptions.Item>
          <Descriptions.Item label="time">18:00:00</Descriptions.Item>
          <Descriptions.Item label="Amount">$80.00</Descriptions.Item>
          <Descriptions.Item label="Discount">$20.00</Descriptions.Item>
          <Descriptions.Item label="Official">$60.00</Descriptions.Item>
          <Descriptions.Item label="Config Info">
            Data disk type: MongoDB
            <br />
            Database version: 3.4
            <br />
            Package: dds.mongo.mid
            <br />
            Storage space: 10 GB
            <br />
            Replication_factor:3
            <br />
            Region: East China 1<br />
          </Descriptions.Item>
        </Descriptions>
        </Card>
      </div>
    );
  }

  onGridReady = params => {
    let detailGridId = this.createDetailGridId();

    let gridInfo = {
      id: detailGridId,
      api: params.api,
      columnApi: params.columnApi
    };

    console.log("adding detail grid info with id: ", detailGridId);
    this.state.masterGridApi.addDetailGridInfo(detailGridId, gridInfo);
  };

  componentWillUnmount = () => {
    let detailGridId = this.createDetailGridId();

    // ag-Grid is automatically destroyed
    console.log('unmount',this.props.data);
    console.log("removing detail grid info with id: ", detailGridId);
    this.state.masterGridApi.removeDetailGridInfo(detailGridId);
  };

  createDetailGridId = () => {
    return "detail_" + this.state.rowIndex;
  }
}