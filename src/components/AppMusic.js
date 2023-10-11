import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function AppMusic() {
    const location = useLocation();
    const [isPlaying, setIsPlaying] = useState(true);
    const [currentTrack, setCurrentTrack] = useState("./elevatorMusic.wav");
    const audioRef = useRef(null);

    useEffect(() => {
        if (location.pathname === "/AdminDashboard") {
            setIsPlaying(true);
            setCurrentTrack("./admin.wav");
        } else {
            setIsPlaying(true);
            setCurrentTrack("./elevatorMusic.wav");
        }
    }, [location.pathname]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

        // Special handling for the alert sound on AdminDashboard to not loop
        if (location.pathname === "/AdminDashboard") {
            audioRef.current.onended = () => {
                setIsPlaying(false);
            };
        }
    }, [isPlaying, location.pathname]);

    const togglePlayback = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(error => {
                console.error("Playback failed:", error);
            });
        }
        setIsPlaying(!isPlaying);
    }; 

    return (
        <>
            <audio ref={audioRef} id="bg-music" loop={location.pathname !== "/AdminDashboard"} src={currentTrack} autoPlay>
                Your browser does not support the audio tag.
            </audio>
            <button onClick={togglePlayback} class="rounded-lg btn btn-secondary"  style={{margin: '15px'}}>
                {isPlaying ? 
                    <i className="bi bi-volume-mute-fill"></i> : 
                    <i className="bi bi-volume-up-fill"></i>}
            </button>
        </>
    );
}

export default AppMusic;
