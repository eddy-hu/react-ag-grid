import React from "react";
import "./index.scss";
import { Input, Checkbox, Button, Row, Col, Slider } from "antd";
import MyGrid from "../../components/grid";
import JobsService from "../../services/jobs.service";

const jobsService = new JobsService();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobDescription: "",
      location: "",
      fullTimeOnly: false,
      data: []
    };
  }
  onChange = e => {
    console.log(`checked = ${e.target.checked}`);
  };

  componentDidMount() {
    this.loadJobs();
  }

  loadJobs(){
    jobsService
    .getJobs('')
    .then(
      res => {
        console.log(res);
        this.setState({
          data: res.data,
        });
      },
      err => {
        console.log(err);
      }
    );
}

  

  render() {
    return (
      <div className="container">
        <div className="searchInput">
          <Row gutter={16}>
            <Col span={8}>
              <Input
                addonBefore="Job Description"
                placeholder="Filter by title, benefits, companies, expertise"
              />
            </Col>
            <Col span={8}>
              <Input
                addonBefore="Location"
                placeholder="Filter by city, state, zip code or country"
              />
            </Col>
            <Col span={3}>
              {" "}
              <Checkbox onChange={this.onChange}>Full Time Only</Checkbox>{" "}
            </Col>
            <Col span={5}>
              {" "}
              <Button type="primary" icon="search">
                Search
              </Button>
            </Col>
          </Row>
        </div>

        <MyGrid />
      </div>
    );
  }
}

export default Home;
