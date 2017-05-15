import React, { Component } from 'react';
import { Icon, Tabs } from 'antd';

import EditStreamersTab from './EditStreamersTab';
const TabPane = Tabs.TabPane;
const HeartsOnTabs = ({love}) => {
	let hearts = [];
	for (let i = 0; i < love; i++) {
		hearts.push(<Icon type="heart" key={i} />)
	}
	return (
		<div>
			{hearts}
		</div>
	)
}



class EditStreamers extends Component {
	
	render() {
		return (
			 <div>
			 	<Tabs defaultActiveKey="3">
			 		<TabPane tab={<HeartsOnTabs love="3" />} key="3">
			 			<EditStreamersTab
			 				{
			 					...this.props
			 				}
			 				love="3"
			 			/>
			 		</TabPane>
			 		<TabPane tab={<HeartsOnTabs love="2" />} key="2">
			 			<EditStreamersTab
			 				{
			 					...this.props
			 				}
			 				love="2"
			 			/>
			 		</TabPane>
			 		<TabPane tab={<HeartsOnTabs love="1" />} key="1">
			 			<EditStreamersTab
			 				{
			 					...this.props
			 				}
			 				love="1"
			 			/>
			 		</TabPane>
			 	</Tabs>
			 </div>
		)
	}
}

export default EditStreamers;