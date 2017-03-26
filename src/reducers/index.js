import {
	STREAMER_NAME,
	STREAMER_ADDED,
	TOGGLE_ADD_STREAMER_MODAL,
	ADD_STREAMER_TO_STORE
} from '../actions/actionTypes';

export default function rootReducer( state = {}, action) {
	switch(action.type) {
		case 'TEST_ACTION':
			return {
				...state,
				text: action.text
			}
		case 'USER_LOGIN':
			let userObject = JSON.stringify(action.userObj)
			return {
				...state,
				userName: action.userObj.name,
				userObject: userObject,
				suUserId: action.userObj.id
			}
		case 'USER_LOGOUT':
			return {
				...state,
				userName: false
			}
		case STREAMER_NAME:
			return {
				...state,
				addStreamer: action.streamerName
			}
		case STREAMER_ADDED:
			//let streamerInfo = JSON.stringify(action.streamerInfo)
			let streamerId = action.streamerInfo.id
			return {
				...state,
				// streamers: [
				// 	...state.streamers,
				// 	action.streamerInfo
				// ],
				['streamers-' + state.suUserId]: {
					...state['streamers-' + state.suUserId],
					[streamerId]: {
						...action.streamerInfo
					}
				},
				addStreamerModal: false
			}
		case TOGGLE_ADD_STREAMER_MODAL:
			return {
				...state,
				addStreamerModal: !state.addStreamerModal
			}
		case ADD_STREAMER_TO_STORE:
			let streamerId2 = action.streamer.id
			return {
				...state,
				// streamers: [
				// 	...state.streamers,
				// 	action.streamer
				// ]

				['streamers-' + state.suUserId]: {
					...state['streamers-' + state.suUserId],
					[streamerId2]: {
						...action.streamer
					}
				}
			}
		default:
			return state;
	}
}