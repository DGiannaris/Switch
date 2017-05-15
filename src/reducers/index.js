import {
	STREAMER_NAME,
	STREAMER_ADDED,
	TOGGLE_ADD_STREAMER_MODAL,
	ADD_STREAMER_TO_LOCALSTORAGE,
	TOGGLE_EDIT_STREAMER_MODAL,
	UPDATE_STREAMER_TO_STORE,
	UPDATE_STORE_TO_LOCALSTORAGE,
	DELETE_STREAMER_FROM_STORE,
	FETCHED_ONLINE_STREAMERS
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
		case ADD_STREAMER_TO_LOCALSTORAGE:
			let streamerId2 = action.streamer.id
			console.log('addding: ' + action.streamer.name)
			return {
				...state,
				['streamers-' + state.suUserId]: {
					...state['streamers-' + state.suUserId],
					[streamerId2]: {
						...action.streamer
					}
				}
			}
		case TOGGLE_EDIT_STREAMER_MODAL:
			return {
				...state,
				editStreamerModal: !state.editStreamerModal
			}
		case UPDATE_STREAMER_TO_STORE:
			let streamerId3 = action.streamer.id
			return {
				...state,
				['streamers-' + state.suUserId]: {
					...state['streamers-' + state.suUserId],
					[streamerId3]: {
						...action.streamer
					}
				}
			}
		case UPDATE_STORE_TO_LOCALSTORAGE:

			return {
				...state,
				['streamers-' + state.suUserId]: {
					...action.streamers
				}
			}
		case DELETE_STREAMER_FROM_STORE:
			/* http://stackoverflow.com/a/35676025 */
			let updatedState = Object.assign({}, state)

			if (state.onlineStreamers === 'offline') {
				//Nobody was online before so just remove the streamer
				return {
					...updatedState,
					onlineStreamers: 'offline',
					onlineStreamersUpdated: true
				}
			} else {
				let onlineStreamersOld = JSON.parse(state.onlineStreamers)
				let updatedOnlineStreamers = onlineStreamersOld.filter(item => {
					return item.ChannelID !== action.streamerId
				})
				delete updatedState['streamers-' + state.suUserId][action.streamerId]
				return {
					...updatedState,
					onlineStreamers: JSON.stringify(updatedOnlineStreamers),
					onlineStreamersUpdated: true
				};
			}
			
		case FETCHED_ONLINE_STREAMERS:
			let onlineStreamers = (action.onlineStreamers === 'offline') ? 'offline' : JSON.stringify(action.onlineStreamers)
			return {
				...state,
				onlineStreamers
			}
		default:
			return state;
	}
}