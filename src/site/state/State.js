// state/State.js
export class State {
    constructor(initialState = {}) {
        this._state = initialState;
        this._listeners = new Set();
    }

    get state() {
        return this._state;
    }

    setState(newState) {
        this._state = { ...this._state, ...newState };
        this._notifyListeners();
    }

    subscribe(listener) {
        this._listeners.add(listener);
        return () => this._listeners.delete(listener);
    }

    _notifyListeners() {
        for (const listener of this._listeners) {
            listener(this._state);
        }
    }
}