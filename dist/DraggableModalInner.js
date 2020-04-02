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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import { useEffect, useMemo, useCallback, memo } from 'react';
import { Modal } from 'antd';
import { ResizeHandle } from './ResizeHandle';
import { useDrag } from './useDrag';
import { usePrevious } from './usePrevious';
import { useResize } from './useResize';
var modalStyle = { margin: 0, paddingBottom: 0, pointerEvents: 'auto' };
export var DraggableModalInner = memo(function (_a) {
    var id = _a.id, modalState = _a.modalState, dispatch = _a.dispatch, visible = _a.visible, children = _a.children, title = _a.title, otherProps = __rest(_a, ["id", "modalState", "dispatch", "visible", "children", "title"]);
    // Call on mount and unmount.
    useEffect(function () {
        dispatch({ type: 'mount', id: id });
        return function () { return dispatch({ type: 'unmount', id: id }); };
    }, [dispatch, id]);
    // Bring this to the front if it's been opened with props.
    var visiblePrevious = usePrevious(visible);
    useEffect(function () {
        if (visible !== visiblePrevious) {
            if (visible) {
                dispatch({ type: 'show', id: id });
            }
            else {
                dispatch({ type: 'hide', id: id });
            }
        }
    }, [visible, visiblePrevious, id, dispatch]);
    var zIndex = modalState.zIndex, x = modalState.x, y = modalState.y, width = modalState.width, height = modalState.height;
    var style = useMemo(function () { return (__assign(__assign({}, modalStyle), { top: y, left: x, height: height })); }, [y, x, height]);
    var onFocus = useCallback(function () { return dispatch({ type: 'focus', id: id }); }, [id, dispatch]);
    var onDragWithID = useCallback(function (args) { return dispatch(__assign({ type: 'drag', id: id }, args)); }, [
        dispatch,
        id,
    ]);
    var onResizeWithID = useCallback(function (args) { return dispatch(__assign({ type: 'resize', id: id }, args)); }, [
        dispatch,
        id,
    ]);
    var onMouseDrag = useDrag(x, y, onDragWithID);
    var onMouseResize = useResize(x, y, width, height, onResizeWithID);
    var titleElement = useMemo(function () { return (React.createElement("div", { className: "ant-design-draggable-modal-title", onMouseDown: onMouseDrag, onClick: onFocus }, title)); }, [onMouseDrag, onFocus, title]);
    return (React.createElement(Modal, __assign({ wrapClassName: "ant-design-draggable-modal", style: style, width: width, destroyOnClose: true, mask: false, maskClosable: false, zIndex: zIndex, title: titleElement, visible: visible }, otherProps),
        children,
        React.createElement(ResizeHandle, { onMouseDown: onMouseResize })));
});
DraggableModalInner.displayName = 'DraggableModalInner';
//# sourceMappingURL=DraggableModalInner.js.map