import React from "react";
import axios from "axios";

const REST_URL = "https://jobs.github.com/positions.json";

export default class JobsService extends React.Component {
  getJobs(param) {
    console.log("getJobs",param);
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        headers: {
            "Content-Type":"application/json"
          },
        withCredentials : true,
        url: REST_URL + param
      })
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
