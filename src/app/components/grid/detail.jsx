import React, { Component } from 'react';
import { Card, Descriptions, message, Button } from 'antd';
import "ag-grid-enterprise";
import './detail.scss';
import { connect } from 'react-redux';
import { addToLiked } from '../../actions/liked.action';
import { addToApplied } from '../../actions/applied.action';

class DetailCellRenderer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
      likedItems: [],
      size: 'default',
    };

    this.state.rowIndex = props.rowIndex;
    this.state.masterGridApi = props.api;
  }
  handleApplyButton() {
    message.success('Congrats! Apllied successfully')
    this.props.dispatch(addToApplied(this.props.data));
  }

  addToLiked() {
    message.success('Added to liked list successfully')
    this.props.dispatch(addToLiked(this.props.data));
  }

  componentDidMount() {
    console.log("detail ", this.props);
  }

  render() {
    return (
      <div className="full-width-panel">
        <Card >
          <Descriptions bordered title={this.props.data.title} border size={this.state.size}>
            <Descriptions.Item label="Type">{this.props.data.type}</Descriptions.Item>
            <Descriptions.Item label="Company">{this.props.data.company}</Descriptions.Item>
            <Descriptions.Item label="Posted">{this.props.data.created_at}</Descriptions.Item>
            <Descriptions.Item label="Location">{this.props.data.location}</Descriptions.Item>
            <Descriptions.Item label="Website">{this.props.data.company_ur}</Descriptions.Item>
            <Descriptions.Item label="Action">

              <Button
                onClick={() => this.handleApplyButton()}
                type="secondary" icon="user-add">Apply</Button>
              <Button
                className="likeButton"
                type="secondary"
                icon="heart"
                onClick={() => this.addToLiked()}
              >Like</Button>

            </Descriptions.Item>
            <Descriptions.Item label="Description">
              {/* below is dummy description */}
              As a Software Engineer in the Special Projects Group, <br />
              you will work with a world-class team that focuses new product development of a complex system. <br />
              You’ll be challenged daily with respect to your technical knowledge and apply your creativity to solving complex problems in innovative ways. <br />
              The ideal candidate is an individual with a deep understanding of testing frameworks, automation strategies and technologies.<br />
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

    console.log("unmount", this.props.newLikedItem)
    // ag-Grid is automatically destroyed
    console.log("removing detail grid info with id: ", detailGridId);
    this.state.masterGridApi.removeDetailGridInfo(detailGridId);
  };

  createDetailGridId = () => {
    return "detail_" + this.state.rowIndex;
  }
}

const mapStateToProps = (state) => {
  return {
    newLikedItem: state.data
  }
}

export default connect(mapStateToProps, null, null, { forwardRef: true })(DetailCellRenderer);