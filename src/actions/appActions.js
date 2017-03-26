import {
	STREAMER_ADDED,
	STREAMER_NAME,
	TOGGLE_ADD_STREAMER_MODAL,
	ADD_STREAMER_TO_STORE
} from './actionTypes';

function toggleAddStreamerModal() {
	return {
		type: TOGGLE_ADD_STREAMER_MODAL
	}
}

function checkStreamer(streamerName) {
	return {
		type: STREAMER_NAME,
		streamerName
	}
}

function addVerifiedStreamer(streamerInfo) {
	return {
		type: STREAMER_ADDED,
		streamerInfo
	}
}

function localStorageToStore(streamer) {
	return {
		type: ADD_STREAMER_TO_STORE,
		streamer
	}
}

function testingAction(text) {
	return {
		type: 'TEST_ACTION',
		text
	}
}

function logUser(userObj) {
	return {
		type: 'USER_LOGIN',
		userObj
	}
}

function logOutUser() {
	return {
		type: 'USER_LOGOUT'
	}
}


export {
	testingAction,
	logUser,
	logOutUser,
	checkStreamer,
	addVerifiedStreamer,
	toggleAddStreamerModal,
	localStorageToStore
}