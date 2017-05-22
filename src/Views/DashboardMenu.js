import React, { Component } from 'react';
import { Row, Col, Button, Modal, Icon, message, notification } from 'antd';
import UserProfile from '../components/UserProfile';
import AddStreamer from '../components/AddStreamer';
import EditStreamersList from '../components/EditStreamersList';
import Settings from '../components/Settings';



class Dashboard extends Component {

	state = {
		visible: false,
		openSettings: false,
	}	
	

	showModal = () => {
		this.setState({
		  visible: true,
		});
	}

	openSettingsToggle = () => {
		this.setState({
			openSettings: true
		})
	}

	handleOk = (e) => {
		console.log(e);
		message.success('Settings saved', 2.5)
		this.setState({
		  visible: false,
		  openSettings: false
		});
	}


	handleCancel = (e) => {
		console.log('cancel');
		this.setState({
		  visible: false,
		  addStreamerModal: false,
		  openSettings: false
		});
	}

	openNotification = () => {
		notification.open({
	    message: 'Notification Title',
	    description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
	  });
	}


	addStreamerModal = () => {
		this.props.toggleAddStreamerModal();		
	}

	editStreamersModal = () => {
		this.props.toggleEditStreamerModal();
		if (this.props.editStreamerModal && this.props.streamers) {
			this.props.updateStoreToLocalstorage(this.props.streamers)
			let updatedStreamersFromStore = this.props.streamers
			console.log(this.props.streamers);
			let updatedStreamersArr = Object.keys(updatedStreamersFromStore).map( streamer => {
				return JSON.stringify(updatedStreamersFromStore[streamer])
			})
			localStorage.setItem('streamers-' + this.props.userId, JSON.stringify(updatedStreamersArr))
			
		}
	}




	render() {
		return (
			<div>
				<Row>
					<UserProfile
						name={JSON.parse(this.props.userObject).name}
						id={JSON.parse(this.props.userObject).id}
					/>
				</Row>
				<Row type="flex" className="menu-items-wrapper">
					<Col span={24}>
						<Row className="menu-item" type="flex">
							<Col span={6} className="menu-item-icon">
								<Icon type="user-add" />
							</Col>
							<Col span={18} className="menu-item-setting">
								<a onClick={this.addStreamerModal}>Add Streamer</a>
							</Col>
						</Row>
						<Row className="menu-item" type="flex">
							<Col span={6} className="menu-item-icon">
								<Icon type="edit" />
							</Col>
							<Col span={18} className="menu-item-setting">
								<a onClick={this.editStreamersModal}>Edit Streamers</a>
							</Col>
						</Row>
						<Row className="menu-item" type="flex">
							<Col span={6} className="menu-item-icon">
								<Icon type="setting" />
							</Col>
							<Col span={18} className="menu-item-setting">
								<a onClick={this.openSettingsToggle}>Settings</a>
							</Col>
						</Row>
					</Col>
				</Row>				

				<Modal
					className="cs-add-streamer-modal"
					title="Add a streamer"
					visible={this.props.addStreamerModal}
					width="70vw"
					onCancel={this.addStreamerModal}
					footer={[
		          		<Button key="back" size="default" onClick={this.addStreamerModal}>
		          			Cancel
		          		</Button>,
		          		<Button
		          			key="submit"
		          			size="default"
		          			type="primary"
		          			onClick={this.handleOk}
		          		>
		          			Add Streamer
		          		</Button>
		          	]}
				>
					<AddStreamer
						checkStreamer={this.props.checkStreamer}
						addStreamer={this.props.addStreamer}
						addStreamerModal={this.props.addStreamerModal}
						toggleAddStreamerModal={this.props.toggleAddStreamerModal}
						streamers={this.props.streamers}
						userId={this.props.userId}
						socket={this.props.socket}
					/>
				</Modal>

				<Modal
					className="cs-edit-streamers-modal"
					title="Edit your streamers"
					visible={this.props.editStreamerModal}
					width="70vw"
					onCancel={this.editStreamersModal}
					footer={
						[
			          		<Button
			          			key="submit"
			          			size="default"
			          			type="primary"
			          			onClick={this.editStreamersModal}
			          		>
			          			OK
			          			<Icon type="check"/>
			          		</Button>
						]
					}
				>
					<EditStreamersList
						streamers={this.props.streamers}
						editStreamersModal={this.props.editStreamersModal}
						addStreamer={this.props.addStreamer}
						updateStoreToLocalstorage={this.props.updateStoreToLocalstorage}
						deleteStreamerFromStore={this.props.deleteStreamerFromStore}
						socket={this.props.socket}
					/>
				</Modal>
				
		        <Modal
		        	title="Settings"
		        	visible={this.state.openSettings}
		          	onOk={this.handleOk}
		          	onCancel={this.handleCancel}
		          	okText="Save settings"
		          	width="70vw"
		        >
		          <Settings
		          	ipc={this.props.ipc}
		          />
		        </Modal>
			</div>
		);
	}
}



export default Dashboard;