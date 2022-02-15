import { Store } from 'express-session';
import EventEmitter from 'events';

class RequestObject extends EventEmitter {
    emitError() {
        this.emit('error', new Error('Dummy Error'));
    }
}

export class CustomSessionStore extends Store {
    get(sid, cb) {
        // We don't care about reading
        cb()
    }

    set(sid, data, cb) {
        const request = new RequestObject()
        new Promise(resolve => {
            // Delaying a bit to also trigger the ERR_HTTP_HEADERS_SENT error.
            setTimeout(() => {
                request.emitError();
                cb();
            })
        })
    }

    destroy(sid, cb) {
        cb()
    }
}
