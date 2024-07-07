//state/State.js
const createState = (initialState) => {
    const listeners = new Set();
    const state = new Proxy(initialState, {
        set: (target, property, value) => {
            target[property] = value;
            listeners.forEach(listener => listener());
            return true;
        }
    });

    const subscribe = (listener) => {
        listeners.add(listener);
        return () => listeners.delete(listener);
    };

    return { state, subscribe };
};

export const { state, subscribe } = createState({
    currentSection: 'profile',
    categories: [],
    currentPost: null,
});
