import React, {Component} from 'react';
import { Row, Col, Button, Icon, Progress, Spin } from 'antd';

export default class Settings extends Component {
    constructor(props) {
        super(props)
        //let ipc = this.props.ipc
    }
    state = {
        downloadingUpdate: false,
        downloadProgress: 0,
        downloadUpdateDone: false
    }


    handleClick = () => {
        let ipc = this.props.ipc
        this.setState({
            downloadingUpdate: true
        })
        ipc.send('getUpdate');
        ipc.on('updateStarted', () => {
            console.log('Updated started')
        })
    }

    installUpdate = () => {
        let ipc = this.props.ipc
        ipc.send('installUpdate')
    }

    componentDidMount() {
        let ipc = this.props.ipc
        ipc.on('updateProgressReply', (event, arg) => {
            console.log(arg)
            this.setState({
                downloadProgress: parseInt(arg.percent),
                downloadUpdateDone: arg.percent === 100
            })


        })
    }

    render() {
        let appVersion = localStorage.getItem('appVersion')
        let latestVersion = localStorage.getItem('latestVersion')
        return (
            <div className="settings-wrapper">
                <Row>
                    <Col span={12}>
                        <h1>Switch Info</h1>
                        <p>Version: {appVersion}</p>
                        <p>Latest Version: {latestVersion}</p>
                        {
                            appVersion == latestVersion
                            ? <p>You're up-to-date!</p>
                            :
                                <Button
                                    type="primary"
                                    icon="download"
                                    onClick={this.handleClick}
                                >
                                    Download Update
                                </Button>
                        }
                    </Col>

                    <Col span={12}>
                        {
                            this.state.downloadingUpdate
                            ?
                                <div className="progress-wrapper">
                                    <Progress
                                        type="circle"
                                        percent={this.state.downloadProgress}
                                    />
                                    <Spin spinning={!this.state.downloadUpdateDone}>
                                        <Button
                                            type="primary"
                                            icon="reload"
                                            onClick={this.installUpdate}
                                        >
                                            Install Update
                                        </Button>
                                    </Spin>
                                </div>
                            : null
                        }                        
                    </Col>
                </Row>
            </div>
        )
    }
}