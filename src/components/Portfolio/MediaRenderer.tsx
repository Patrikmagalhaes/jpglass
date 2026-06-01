import styled from "styled-components";

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

export const GalleryMedia = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;

  display: block;
  border-radius: inherit;
`;
export const GalleryVideo = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;

  display: block;
  border-radius: inherit;
`;
export default function MediaRenderer({ item }: MediaRendererProps) {
    if (item.type === 'video') {
        return (
            <GalleryVideo
                autoPlay
                loop
                muted
                playsInline
            >
                <source src={item.src} type="video/mp4" />
            </GalleryVideo>
        );
    }

    return (
        <GalleryMedia
            src={item.src}
            alt={item.alt}
            referrerPolicy="no-referrer"
        />
    );
}