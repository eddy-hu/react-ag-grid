import React from "react";
import "./index.scss";
import { Input, Checkbox, Button, Row, Col, Icon, Upload, message, Modal, Form } from "antd";
import MyGrid from "../../components/grid";
import JobsService from '../../services/jobs.service';
import { connect } from 'react-redux';

const jobsService = new JobsService();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.jobListGrid=React.createRef()
    this.state = {
      jobDescription: "",
      location: "",
      fullTimeOnly: false,
      visible: false,
      applyBtnClicked:false,
      columnDefs: [
        {
          headerName: "Title",
          field: "title",
          checkboxSelection: true,
          headerCheckboxSelection: true,
          headerCheckboxSelectionFilteredOnly: true,
          checkboxSelection: true,
          sortable: true,
          filter: true,
          width: 300
        },
        {
          headerName: "Location",
          field: "location",
          sortable: true,
          filter: true,
          width: 250
        },
        {
          headerName: "Type",
          field: "type",
          filter: true,
          width: 150
        },
        {
          headerName: "Company",
          field: "company",
          sortable: true,
          filter: true,
          width: 250
        },
        {
          headerName: "Website",
          field: "company_url",
          width: 300
        },
        {
          headerName: "Detail",
          field: "description",
          valueFormatter: "'  '+''",
          cellRenderer: "agGroupCellRenderer",
          width: 150
        }
      ],
      rowData: []
    };
  }
  onInputChange = e => {
    console.log(e.target);
    if (e.target.name === 'jobDescription') {
      this.setState({
        jobDescription: e.target.value
      });
    } else if (e.target.name === 'location') {
      this.setState({
        location: e.target.value
      });
    } else if (e.target.name === 'fullTimeOnlyCheckbox') {
      this.setState({
        fullTimeOnly: e.target.checked
      });
    }
  };

  handleClick = (e) => {
    console.log("clcick", e.rowData);

  }

  showModal = () => {
    this.setState({
      visible: true,
      applyBtnClicked:false
    });
  };

  handleOk = e => {
    message.warning('Not implemented yet')
  };

  handleCancel = e => {
    this.setState({
      visible: false,
    });
  };


  handleSearchButton = () => {
    let param = {};
    if (this.state.jobDescription !== '') {
      param = {...param,description:this.state.jobDescription};
    }
    if (this.state.location !== '') {
      param = {...param,location:this.state.location};
    }
    if (this.state.fullTimeOnly) {
      param = {...param,full_time:this.state.fullTimeOnly};
    }
    this.setState({
      rowData: []
    });
    this.loadJobs(param);

  }

  componentDidMount() {
    this.loadJobs();
    this.loadFromLocalStorage();
    this.setState({
      applyBtnClicked:false
    })
  }

  loadFromLocalStorage(){
    if(localStorage.getItem('likedItems')){
      this.setState({
        likedItems: JSON.parse(localStorage.getItem('likedItems'))
      })
    }
  }

  loadJobs(param) {
    for (let i = 0; i < 8; i++) {
      param={...param,page:i};
      jobsService
        .getJobs(param)
        .then(
          res => {
            let allData = [...this.state.rowData, ...res.data];
            this.setState({
              rowData: allData
            });
          },
          err => {
            console.log(err);
          }
        );
    }

  }

  render() {
    return (
      <div className="container">

        <div className="searchInput">
          <Row gutter={16}>
            <Col span={8}>
              <Input
                onChange={this.onInputChange}
                name="jobDescription"
                addonBefore="Description"
                placeholder="Filter by title, benefits, companies, expertise"
              />
            </Col>
            <Col span={8}>
              <Input
                onChange={this.onInputChange}
                name="location"
                addonBefore="Location"
                placeholder="Filter by city, state, zip code or country"
              />
            </Col>
            <Col span={3}>

              <Checkbox className='fullTimeOnlyCheckbox' name="fullTimeOnlyCheckbox" onChange={this.onInputChange}>Full Time Only</Checkbox>{" "}
            </Col>
            <Col span={2}>

              <Button type="secondary" icon="search" onClick={this.handleSearchButton}>
                Search
              </Button>
            </Col>
            <Col span={3}>
              <Button type="primary" icon="user-add" onClick={this.showModal}>
                Apply
              </Button>
            </Col>
          </Row>
        </div>

        <Modal
          title="Apply"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="Name"><Input placeholder="Please input your name" /></Form.Item>
            <Form.Item label="Email"><Input placeholder="Please input your email" /></Form.Item>
            <Upload.Dragger name="files" action="/upload.do">
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-hint">Click or drag your resume to this area to upload</p>

            </Upload.Dragger>
          </Form>
        </Modal>

        <MyGrid 
        columnDefs={this.state.columnDefs} 
        rowData={this.state.rowData} />
      </div>
    );
  }
}

export default connect(null, null, null, { forwardRef: true })(Home);