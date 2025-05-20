import store from './store';

const socket = new WebSocket('ws://localhost:3000/ws');

socket.onopen = () => {
  console.log('[WebSocket] Connected');
};

socket.onmessage = (event) => {
  try {
    const message = JSON.parse(event.data);

    // project messages
    if (message.model === 'Project') {
      if (message.type === 'INSERT') store.dispatch('addProject', message.data);
      if (message.type === 'DELETE') store.dispatch('removeProject', message.data._id);
      if (message.type === 'UPDATE') store.dispatch('updateProject', message.data);
    }

    // tasks related messages
    if (message.model === 'Task') {
      if (message.type === 'INSERT') store.dispatch('addTask', message.data);
      if (message.type === 'DELETE') store.dispatch('removeTask', message.data._id);
      if (message.type === 'UPDATE') store.dispatch('updateTask', message.data);
    }
  } catch (e) {
    console.error('[WebSocket] Invalid message', e);
  }
};

socket.onerror = (err) => {
  console.error('[WebSocket] Error:', err);
};

export default socket;
