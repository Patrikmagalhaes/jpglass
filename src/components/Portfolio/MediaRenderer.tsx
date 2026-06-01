
export type MediaItem =
    | {
        id: string;
        type: 'image';
        src: string;
        alt: string;
    }
    | {
        id: string;
        type: 'video';
        src: string;
        poster?: string;
    };


type MediaRendererProps = {
    item: MediaItem;
};

export default function MediaRenderer({ item }: MediaRendererProps) {
    if (item.type === 'video') {
        return (
            <video
                controls
                playsInline
                preload="metadata"
                poster={item.poster}
            >
                <source src={item.src} type="video/mp4" />
            </video>
        );
    }

    return (
        <img
            src={item.src}
            alt={item.alt}
            referrerPolicy="no-referrer"
        />
    );
}