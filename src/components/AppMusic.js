// Import necessary React hooks and router functionalities
import { useLocation } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

function AppMusic() {
    // Hook to get the current route's location
    const location = useLocation();

    // Local state to manage whether music is currently playing
    const [isPlaying, setIsPlaying] = useState(true);
    // Local state to store the current audio track's path
    const [currentTrack, setCurrentTrack] = useState("./elevatorMusic.wav");

    // Reference to the audio HTML element for controlling playback
    const audioRef = useRef(null);

    // Effect hook to set the music track based on the current route
    useEffect(() => {
        // If the user is on the AdminDashboard page
        if (location.pathname === "/AdminDashboard") {
            setIsPlaying(true);
            setCurrentTrack("./admin.wav");
        } else {
            // For all other pages
            setIsPlaying(true);
            setCurrentTrack("./elevatorMusic.wav");
        }
    }, [location.pathname]);

    // Effect hook to manage playback of the audio
    useEffect(() => {
        // If the music is supposed to be playing
        if (isPlaying) {
            audioRef.current.play();
        } else {
            // If the music is supposed to be paused
            audioRef.current.pause();
        }

        // Special handling for the AdminDashboard page
        // If the alert sound finishes playing, stop the playback
        if (location.pathname === "/AdminDashboard") {
            audioRef.current.onended = () => {
                setIsPlaying(false);
            };
        }
    }, [isPlaying, location.pathname]);

    // Function to toggle audio playback
    const togglePlayback = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(error => {
                console.error("Playback failed:", error);
            });
        }
        // Toggle the isPlaying state
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            {/* The audio element for playing background music */}
            <audio ref={audioRef} id="bg-music" loop={location.pathname !== "/AdminDashboard"} src={currentTrack} autoPlay>
                Your browser does not support the audio tag.
            </audio>

            {/* Button to mute/unmute the audio */}
            <button onClick={togglePlayback} className="rounded-lg btn btn-secondary" style={{margin: '15px'}}>
                {isPlaying ? 
                    // Icon for muting the audio
                    <i className="bi bi-volume-mute-fill"></i> : 
                    // Icon for unmuting the audio
                    <i className="bi bi-volume-up-fill"></i>}
            </button>
        </>
    );
}

export default AppMusic;
