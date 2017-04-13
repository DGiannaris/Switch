import React, { Component } from 'react';
import 'antd/dist/antd.css';
import './assets/fonts.css';
import './App.css';
import Login from './Login';
import LoginScreen from './Views/LoginScreen';
import DashboardMenu from './Views/DashboardMenu';
import MainScreen from './Views/MainScreen';
import {bindActionCreators} from 'redux';
import * as appActions from './actions/appActions';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
import { browserHistory } from 'react-router';
import io from 'socket.io-client';

let socket = io('http://localhost:2039')
const { Header, Sider, Content } = Layout;

class App extends Component {
  constructor(props, context) {
    super(props, context)
    this.testAction = this.testAction.bind(this) 
  }

  testAction() {
    this.props.actions.testingAction('testme');
  }

  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }


  componentWillMount() {
      
    

      if (localStorage.getItem('userObject')) {  

          let userObject = JSON.parse(localStorage.getItem('userObject'))
          let userId = userObject.id    
          this.props.actions.logUser(userObject)
          browserHistory.push('/dashboard')
        
        if (localStorage.getItem('streamers-' + userId)) {    
          let savedStreamers = JSON.parse(localStorage.getItem('streamers-'  + userId))
          debugger;
          
          savedStreamers.map(streamer => {
            return this.props.actions.localStorageToStore(JSON.parse(streamer))
          })   
        }
      }

      
    

  }

  render() {
    return (
        <div className={`App ${this.props.state.userName ? 'user-logged' : 'login-screen'}`}>
          <Layout className="app-container">
            <Sider
              trigger={null}
              collapsible
              collapsed={this.state.collapsed}
              collapsedWidth={0}
              width={window.outerWidth / 5 }
              className='appSidebar'
              breakpoint='xs'
            >
              {
                this.props.state.userName
                ? 
                  <div>
                    <DashboardMenu
                      userObject={this.props.state.userObject}
                      //addStreamerStepsCompleted={this.props.state.addStreamerStepsCompleted}
                      checkStreamer={this.props.actions.checkStreamer}
                      addStreamer={this.props.actions.addVerifiedStreamer}
                      addStreamerModal={this.props.state.addStreamerModal}
                      toggleAddStreamerModal={this.props.actions.toggleAddStreamerModal}
                      streamers={this.props.state['streamers-' + this.props.state.suUserId]}
                      userId={this.props.state.suUserId}
                      editStreamerModal={this.props.state.editStreamerModal}
                      toggleEditStreamerModal={this.props.actions.toggleEditStreamerModal}
                      updateStoreToLocalstorage={this.props.actions.updateStoreToLocalstorage}
                      deleteStreamerFromStore={this.props.actions.deleteStreamerFromStore}
                      socket={socket}
                    />
                    <Login
                      logUserAction={this.props.actions.logOutUser}
                      logUserState={this.props.state.userName}
                    />
                  </div>
                : 
                  <div>
                    <LoginScreen />
                    <Login
                      logUserAction={this.props.actions.logUser}
                      logUserState={this.props.state.userName}
                    />
                  </div>
              }
            </Sider>
            <Layout className='hidden-content-login-screen'>
              <Header style={{background: "#fff", padding: 0}}>
                  <Icon
                  className="trigger menuCustomIcon"
                  type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                  onClick={this.toggle}
                />
              </Header>
              <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 280 }}>
                {
                  this.props.state['streamers-' + this.props.state.suUserId]
                  ? <MainScreen
                      streamers={this.props.state['streamers-' + this.props.state.suUserId]}
                      addStreamers={this.props.actions.addVerifiedStreamer}
                      socket={socket}
                      fetchedStreamers={this.props.actions.fetchedFromServer}
                      onlineStreamers={this.props.state.onlineStreamers}
                    />
                  : null
                }
                
              </Content>
            </Layout>
          </Layout>         
        </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(appActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);