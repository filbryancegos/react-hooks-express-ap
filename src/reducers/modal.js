import { IS_LOGGED_MODAL } from '../actions/type.js'


export default function isModal(state = false, action) {
	const { type } = action;

	switch (type) {
		case IS_LOGGED_MODAL:
			return state = !state;
		default:
			return state;
	}
}