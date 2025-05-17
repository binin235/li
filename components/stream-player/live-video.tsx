"use client";

import { Participant, Track } from "livekit-client";
import { useState , useRef} from "react";
import { useTracks} from "@livekit/components-react"; 
import { FullscreenControl } from "./fullscreen-control";
import { useEventListener } from "usehooks-ts";
import { wrap } from "module";

interface LiveVideoProps {
    participant: Participant;
};

export const LiveVideo = ({
    participant,
}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const [isFullscreen, setIsFullscreen] = useState(false);

    const togglefullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else if (wrapperRef.current) {
            wrapperRef.current.requestFullscreen();
        }
    }

    const handleFullscreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullscreen(isCurrentlyFullscreen);
    }

    useEventListener("fullscreenchange", handleFullscreenChange, { current: document });

    useTracks([Track.Source.Camera, Track.Source.Microphone])
        .filter((track) => track.participant.identity === participant.identity)
        .forEach((track) => {
            if (videoRef.current) {
                track.publication.track?.attach(videoRef.current!);
            }
        }); 

    return(
        <div
            ref={wrapperRef}
            className="relative h-full flex"
        >
            <video ref={videoRef} className="w-full h-auto object-contain rounded-md" />
            <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-opacity transition duration-300">
                <div className="absolute bottom-0 right-0 flex h-14 items-center justify-end bg-gradient-to-l from-neutral-900/80 to-transparent px-4 w-full">
                    <FullscreenControl
                        isFullscreen={isFullscreen}
                        onToggle={togglefullscreen}
                    />
                </div>
            </div>
        </div>
    )
}