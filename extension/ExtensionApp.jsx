import React, {useState, useRef} from 'react';
import "./style.scss";

const ExtensionApp = () => {
    const [position, setPosition] = useState({
        top: 0,
        left: 0,
    });

    const [dragging, setDragging] = useState(false);
    const [isFocus, setFocus] = useState(false);
    const [inMinimise, setMinimise] = useState(false);
    const [seekTime, setSeekTime] = useState(2);
    const [start, setStart] = useState({x: 0, y: 0});

    const handleMouseDown = (e) => {
        setDragging(true);
        setStart({x: e.clientX - position.left, y: e.clientY - position.top});
    };

    const videoRef = useRef([]);

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
        setFocus(false)
    };

    React.useEffect(() => {
        let videos = document.querySelectorAll("video")
        let v = []
        if (videos && videos.length > 0) {
            for (let i = 0; i < videos.length; i++) {
                if (videos[i]?.duration >= 1000) {
                    v.push(videos[i]);
                }
            }
        }
        videoRef.current = v
    }, []);

    function handleBack(e) {
        e.preventDefault()
        const videos = videoRef?.current
        if (videos) {
            videos.forEach(video => {
                video.currentTime -= Number(seekTime);
            })
        }
    }

    function handleForward(e) {
        e.preventDefault()
        const videos = videoRef?.current
        if (videos) {
            videos.forEach(video => {
                video.currentTime += Number(seekTime);
            })
        }
    }

    return (
        <>
            {
                isFocus && (
                    <div className="rs-overlay" onClick={() => {
                        setFocus(false)
                        setDragging(false)
                    }}></div>
                )
            }

            <div
                className="extension-app"
                style={{top: position.top, left: position.left, position: 'absolute'}}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onClick={() => setFocus(true)}
                onMouseUp={handleMouseUp}
            >{!inMinimise ? (
                    <>
                        <div className="rs-icon " onClick={handleBack}>
                            <i className="fa-solid fa-backward"></i>
                        </div>
                        <input
                            className="rs-input"
                            onChange={(e) => setSeekTime(e.target.value)}
                            type="number"
                            min={1}
                            value={seekTime}
                        />
                        <div onClick={handleForward} className="rs-icon ">
                            <i className="fa-solid fa-forward"></i>
                        </div>

                        <div onClick={() => setMinimise(true)}
                             className="rs-icon">
                            <i className="fa-solid fa-angle-down"></i>
                        </div>
                    </>

                ) :
                (

                    <div
                        onClick={() => setMinimise(false)}
                        className="rs-icon"><i className="fa-solid
                        fa-up-right-and-down-left-from-center"></i></div>

                )


            }
            </div>
        </>
    )
}
export default ExtensionApp;
