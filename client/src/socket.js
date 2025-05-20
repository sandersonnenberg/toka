import { changeTypes, userActions, EntityTypes } from './constants';
import store from './store';

const socket = new WebSocket('ws://localhost:3000/ws');

socket.onopen = () => {
  console.log('[WebSocket] Connected');
};

socket.onmessage = (event) => {
  try {
    const message = JSON.parse(event.data);

    // project messages
    if (message.model === EntityTypes.PROJECT) {
      if (message.type === changeTypes.INSERT)
        store.dispatch(userActions.ADD_PROJECT, message.data);
      if (message.type === changeTypes.DELETE)
        store.dispatch(userActions.REMOVE_PROJECT, message.data._id);
      if (message.type === changeTypes.UPDATE)
        store.dispatch(userActions.UPDATE_PROJECT, message.data);
    }

    // tasks related messages
    if (message.model === EntityTypes.TASK) {
      if (message.type === changeTypes.INSERT) store.dispatch(userActions.ADD_TASK, message.data);
      if (message.type === changeTypes.DELETE)
        store.dispatch(userActions.REMOVE_TASK, message.data._id);
      if (message.type === changeTypes.UPDATE)
        store.dispatch(userActions.update_TASK, message.data);
    }
  } catch (e) {
    console.error('[WebSocket] Invalid message', e);
  }
};

socket.onerror = (err) => {
  console.error('[WebSocket] Error:', err);
};

export default socket;
