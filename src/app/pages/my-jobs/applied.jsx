import React, { Component } from 'react';
import { Table, Button, message } from 'antd';
import { connect } from 'react-redux';
import { removeFromApplied } from '../../actions/applied.action';

class AppliedTable extends Component {
  constructor(props) {
    super(props);
  }

  handleDeleteButton = (record) => {
    this.props.dispatch(removeFromApplied(record));
  }

  render() {

    let data = this.props.appliedItems.map((item) => {
      return { ...item, key: item.id }
    })

    let columns = [
      {
        title: 'Title',
        dataIndex: 'title',
        key: 'title',
        render: text => <a href="javascript:;">{text}</a>,
      },
      {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
      },
      {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: 'Company',
        key: 'company',
        dataIndex: 'company',
      },
      {
        title: 'Website',
        key: 'company_url',
        dataIndex: 'company_url',
      },
      {
        title: 'Action',
        key: 'action',
        render: (text, record) => (
          <span>
            <Button type="danger" onClick={e => this.handleDeleteButton(record)}>Delete</Button>
          </span>
        ),
      },
    ];
    return (
      <Table 
      columns={columns} 
      dataSource={data}
      pagination={{
        defaultPageSize: 5,
      }}
      />
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    appliedItems: state.applied,
  }
}

export default connect(mapStateToProps)(AppliedTable);