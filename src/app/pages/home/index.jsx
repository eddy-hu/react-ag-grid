import React from "react";
import "./index.scss";
import { Input, Checkbox, Button, Row, Col, message } from "antd";
import MyGrid from "../../components/grid";
import JobsService from '../../services/jobs.service';

const jobsService = new JobsService();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDescription: "",
      location: "",
      fullTimeOnly: false,
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


  handleSearchButton = () => {
    let param = '';
    if (this.state.jobDescription !== '') {
      console.log('this.state.jobDescription.trim', this.state.jobDescription.trim);
      param = param + 'description=' + this.state.jobDescription + '&';
    }
    if (this.state.location !== '') {
      param = param + 'location=' + this.state.location + '&';
    }
    if (this.state.fullTimeOnly) {
      param = param + 'full_time=' + this.state.fullTimeOnly + '&';
    }
    this.setState({
      rowData: []
    });
    if (param !== '') {
      this.loadJobs('?' + param);
    } else {
      this.loadJobs('?');
    }

  }

  handleApplyButton = () => {
    message.info('Function not implemented yet');
  }

  componentDidMount() {
    this.loadJobs('?');
  }

  loadJobs(param) {
    console.log(param);
    for (let i = 0; i < 8; i++) {
      jobsService
        .getJobs(`${param}page=${i}`)
        .then(
          res => {
            console.log(res.data);
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
              <Button type="primary" icon="user-add" onClick={this.handleApplyButton}>
                Apply
              </Button>
            </Col>
          </Row>
        </div>

        <MyGrid columnDefs={this.state.columnDefs} rowData={this.state.rowData} />
      </div>
    );
  }
}

export default Home;
