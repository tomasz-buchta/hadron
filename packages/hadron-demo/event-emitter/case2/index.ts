import eventsManagerProvider from '../../../hadron-events/src/eventsMaganerProvider';
import { EventEmitter } from 'events';

const emitter = new EventEmitter();
const config = {};

const eventsManager = eventsManagerProvider(emitter, config);

const listeners = [
  {
    name: 'LISTENER',
    event: 'testEvent', // event to listen to
    handler: () => 'test console log',
  },
];

eventsManager.registerEvents(listeners);

const callback = () => 'testcase';

const newCallback = eventsManager.emitEvent('testEvent', callback);
newCallback();