import {
	STREAMER_ADDED,
	STREAMER_NAME,
	TOGGLE_ADD_STREAMER_MODAL,
	ADD_STREAMER_TO_LOCALSTORAGE,
	TOGGLE_EDIT_STREAMER_MODAL,
	UPDATE_STREAMER_TO_STORE,
	UPDATE_STORE_TO_LOCALSTORAGE,
	DELETE_STREAMER_FROM_STORE,
	FETCHED_ONLINE_STREAMERS
} from './actionTypes';

function fetchedFromServer(onlineStreamers) {
	return {
		type: FETCHED_ONLINE_STREAMERS,
		onlineStreamers
	}
}

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
export function toggleAddStreamerModal() {
	return {
		type: TOGGLE_ADD_STREAMER_MODAL
	}
}

export function toggleEditStreamerModal() {
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


export function logUser(userObj) {
	return {
		type: 'USER_LOGIN',
		userObj
	}
}

export function logOutUser() {
	return {
		type: 'USER_LOGOUT'
	}
}


export {
	checkStreamer,
	addVerifiedStreamer,
	localStorageToStore,
	updateStoreToLocalstorage,
	deleteStreamerFromStore,
	fetchedFromServer
}