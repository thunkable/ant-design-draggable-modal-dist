var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { getWindowSize } from './getWindowSize';
import { clamp } from './clamp';
var mapObject = function (o, f) {
    return Object.assign.apply(Object, __spreadArrays([{}], Object.keys(o).map(function (k) {
        var _a;
        return (_a = {}, _a[k] = f(o[k]), _a);
    })));
};
export var initialModalsState = {
    maxZIndex: 0,
    windowSize: getWindowSize(),
    modals: {},
};
export var initialModalState = {
    x: 0,
    y: 0,
    width: 660,
    height: 520,
    zIndex: 0,
    visible: false,
};
export var getModalState = function (state, id) {
    return state.modals[id] || initialModalState;
};
var getNextZIndex = function (state, id) {
    return getModalState(state, id).zIndex === state.maxZIndex ? state.maxZIndex : state.maxZIndex + 1;
};
var clampDrag = function (windowWidth, windowHeight, x, y, width, height) {
    var maxX = windowWidth - width;
    var maxY = windowHeight - height;
    var clampedX = clamp(0, maxX, x);
    var clampedY = clamp(0, maxY, y);
    return { x: clampedX, y: clampedY };
};
var clampResize = function (windowWidth, windowHeight, x, y, width, height) {
    var maxWidth = windowWidth - x;
    var maxHeight = windowHeight - y;
    var clampedWidth = clamp(200, maxWidth, width);
    var clampedHeight = clamp(200, maxHeight, height);
    return { width: clampedWidth, height: clampedHeight };
};
export var draggableModalReducer = function (state, action) {
    var _a, _b, _c, _d, _e, _f;
    switch (action.type) {
        case 'resize':
            var size = clampResize(state.windowSize.width, state.windowSize.height, action.x, action.y, action.width, action.height);
            return __assign(__assign({}, state), { maxZIndex: getNextZIndex(state, action.id), modals: __assign(__assign({}, state.modals), (_a = {}, _a[action.id] = __assign(__assign(__assign({}, state.modals[action.id]), size), { zIndex: getNextZIndex(state, action.id) }), _a)) });
        case 'drag':
            return __assign(__assign({}, state), { maxZIndex: getNextZIndex(state, action.id), modals: __assign(__assign({}, state.modals), (_b = {}, _b[action.id] = __assign(__assign(__assign({}, state.modals[action.id]), clampDrag(state.windowSize.width, state.windowSize.height, action.x, action.y, state.modals[action.id].width, state.modals[action.id].height)), { zIndex: getNextZIndex(state, action.id) }), _b)) });
        case 'show': {
            var modalState_1 = state.modals[action.id];
            var centerX = state.windowSize.width / 2 - modalState_1.width / 2;
            var centerY = state.windowSize.height / 2 - modalState_1.height / 2;
            var position = clampDrag(state.windowSize.width, state.windowSize.height, centerX, centerY, modalState_1.width, modalState_1.height);
            var size_1 = clampResize(state.windowSize.width, state.windowSize.height, position.x, position.y, modalState_1.width, modalState_1.height);
            return __assign(__assign({}, state), { maxZIndex: state.maxZIndex + 1, modals: __assign(__assign({}, state.modals), (_c = {}, _c[action.id] = __assign(__assign(__assign(__assign({}, modalState_1), position), size_1), { zIndex: state.maxZIndex + 1, visible: true }), _c)) });
        }
        case 'focus':
            var modalState = state.modals[action.id];
            return __assign(__assign({}, state), { maxZIndex: state.maxZIndex + 1, modals: __assign(__assign({}, state.modals), (_d = {}, _d[action.id] = __assign(__assign({}, modalState), { zIndex: state.maxZIndex + 1 }), _d)) });
        case 'hide': {
            var modalState_2 = state.modals[action.id];
            return __assign(__assign({}, state), { modals: __assign(__assign({}, state.modals), (_e = {}, _e[action.id] = __assign(__assign({}, modalState_2), { visible: false }), _e)) });
        }
        case 'mount':
            return __assign(__assign({}, state), { maxZIndex: state.maxZIndex + 1, modals: __assign(__assign({}, state.modals), (_f = {}, _f[action.id] = __assign(__assign({}, initialModalState), { x: state.windowSize.width / 2 - initialModalState.width / 2, y: state.windowSize.height / 2 - initialModalState.height / 2, zIndex: state.maxZIndex + 1 }), _f)) });
        case 'unmount':
            var modalsClone = __assign({}, state.modals);
            delete modalsClone[action.id];
            return __assign(__assign({}, state), { modals: modalsClone });
        case 'windowResize':
            return __assign(__assign({}, state), { windowSize: action.size, modals: mapObject(state.modals, function (modalState) {
                    if (!modalState.visible) {
                        return modalState;
                    }
                    var position = clampDrag(state.windowSize.width, state.windowSize.height, modalState.x, modalState.y, modalState.width, modalState.height);
                    var size = clampResize(state.windowSize.width, state.windowSize.height, position.x, position.y, modalState.width, modalState.height);
                    return __assign(__assign(__assign({}, modalState), position), size);
                }) });
        default:
            throw new Error();
    }
};
//# sourceMappingURL=draggableModalReducer.js.map