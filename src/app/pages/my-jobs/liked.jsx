import React, { Component } from 'react';
import { Table, Button, message, Divider } from 'antd';
import { connect } from 'react-redux';
import { addToApplied } from '../../actions/applied.action';
import { removeFromLiked } from '../../actions/liked.action';

class LikedTable extends Component {
  constructor(props) {
    super(props);
  }

  handleDeleteButton = (record) => {
    this.props.dispatch(removeFromLiked(record));
  }

  handleApplyButton = (record) => {
    message.success('Congrats! Apllied successfully')
    this.props.dispatch(addToApplied(record));
  }

  render() {

    let data = this.props.likedItems.map((item) => {
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
            <Button type="primary" onClick={e => this.handleApplyButton(record)}>Apply</Button>
            <Divider type="vertical" />
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
      }} />
    )
  }
}

const mapStateToProps = (state, props) => {
  return {
    likedItems: state.liked,
  }
}

export default connect(mapStateToProps)(LikedTable);