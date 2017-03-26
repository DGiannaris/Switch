import {
	STREAMER_ADDED,
	STREAMER_NAME,
	TOGGLE_ADD_STREAMER_MODAL,
	ADD_STREAMER_TO_LOCALSTORAGE,
	TOGGLE_EDIT_STREAMER_MODAL,
	UPDATE_STREAMER_TO_STORE,
	UPDATE_STORE_TO_LOCALSTORAGE,
	DELETE_STREAMER_FROM_STORE
} from './actionTypes';

function updateStoreToLocalstorage(streamers) {
	return {
		type: UPDATE_STORE_TO_LOCALSTORAGE,
		streamers
	}
}

function deleteStreamerFromStore(streamerId) {
	return {
		type: DELETE_STREAMER_FROM_STORE,
		streamerId
	}
}


function updateStreamerToStore(streamer) {
	return {
		type: UPDATE_STREAMER_TO_STORE,
		streamer
	}
}
function toggleAddStreamerModal() {
	return {
		type: TOGGLE_ADD_STREAMER_MODAL
	}
}

function toggleEditStreamerModal() {
	return {
		type: TOGGLE_EDIT_STREAMER_MODAL
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
		type: ADD_STREAMER_TO_LOCALSTORAGE,
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
	toggleEditStreamerModal,
	localStorageToStore,
	updateStoreToLocalstorage,
	deleteStreamerFromStore
}