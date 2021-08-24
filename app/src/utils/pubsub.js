let subscribers = {}

export const EVENT_NAVIGATION_OVERLAY_CLOCKED = 'event_navigation_overlay_clicked'

export const subscribe = (event, callback) => {
    let index;
    if (!subscribers[event]) {
        subscribers[event] = [];
    }
    index = subscribers[event].push(callback) - 1;

    return {
        unsubscribe() {
            subscribers[event].splice(index, 1);
        }
    };
}

export const publish = (event, data) => {
    if (!subscribers[event]) {
        return
    }
    subscribers[event].forEach(subscriberCallback =>
        subscriberCallback(data));
}