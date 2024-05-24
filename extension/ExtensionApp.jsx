import React, { useState, useRef } from 'react';
import "./style.scss";

const ExtensionApp = () => {
    const [position, setPosition] = useState({
        top: 0,
        left: 0,
    });

    const [dragging, setDragging] = useState(false);
    const [start, setStart] = useState({ x: 0, y: 0 });
    const appRef = useRef(null);

    const handleMouseDown = (e) => {
        setDragging(true);
        setStart({ x: e.clientX - position.left, y: e.clientY - position.top });
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            setPosition({
                left: e.clientX - start.x,
                top: e.clientY - start.y,
            });
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    React.useEffect(() => {
        const appElement = appRef.current;

        if (appElement) {
            appElement.addEventListener('mousemove', handleMouseMove);
            appElement.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            if (appElement) {
                appElement.removeEventListener('mousemove', handleMouseMove);
                appElement.removeEventListener('mouseup', handleMouseUp);
            }
        };
    }, [dragging]);

    return (
        <div
            ref={appRef}
            className="extension-app"
            style={{ top: position.top, left: position.left, position: 'absolute' }}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
        >
            <h4>Drag me!</h4>
        </div>
    );
};

export default ExtensionApp;
