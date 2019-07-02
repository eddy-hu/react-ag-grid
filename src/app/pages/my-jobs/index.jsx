import React, { Component } from 'react';
import { Card,Table, Divider, Tag } from 'antd';
import LikedTable from './liked';
import AppliedTbale from './applied';
import './index.scss';

const tabList = [
    {
        key: 'Applied',
        tab: 'Applied',
    },
    {
        key: 'Liked',
        tab: 'Liked',
    },
];

export default class MyJobs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: 'Applied',
        };
    }

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };

    render() {

        let contentList = {
            Applied: <AppliedTbale/>,
            Liked: < LikedTable/>,
        };

        
        return (
            <div className="myjobs-card-container">
                <Card
                    style={{ width: '100%' }}
                    tabList={tabList}
                    activeTabKey={this.state.key}
                    onTabChange={key => {
                        this.onTabChange(key, 'key');
                    }}
                >
                    {contentList[this.state.key]}
                </Card>
            </div>
        )
    }


}