import React from 'react';
import { Row, Col } from 'antd';

const UserProfile = (props, context) => {


	return (
		<div>
			<Row className="user-picture" type="flex" justify="center" align="middle">
				<Col span={8}>
					<img src={`http://graph.facebook.com/${props.id}/picture?width=9999`} />
				</Col>
			</Row>

			<Row className="user-name" type="flex" justify="center" align="middle">
				<Col span={8}>
					<p>{props.name}</p>
				</Col>
			</Row>
		</div>
	)
}

export default UserProfile;