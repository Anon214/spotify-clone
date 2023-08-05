"use client";

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import useAuthModal from "@/hooks/useAuthModal";
import useUploadModal from "@/hooks/useUploadModal";
import { Song } from "@/types";
import MediaItem from "./MediaItem";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useOnPlay from "@/hooks/useOnPlay";
import { useUser } from "@/hooks/useUser";


interface LibraryProps {
    songs: Song[];
}
const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const  authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const router = useRouter();
    const onPlay = useOnPlay(songs);

    const pushLiked = () => {
        if (!user) {
            authModal.onOpen();
            return;
        }

        router.push('liked');
    }

    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }
        return uploadModal.onOpen();
    };

  return (
    <div>
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size = {26}/>
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>
                <div onClick={onClick} className="cursor-pointer rounded-full flex items-center justify-center bg-neutral-900 p-1 hover:bg-neutral-800">
                    <AiOutlinePlus size={22} className="text-neutral-400 transition group-hover:text-white"/>
                </div>
            </div>


            <div className="flex flex-col gap-y-2 mt-4 px-3">

                <div onClick={pushLiked} className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-800/5 w-full p-2 rounded" >
                    <div className="relative rounded-md min-h-[48px] min-w-[48px] overflow-hidden">
                        <Image className="object-cover" src= '/images/liked.png' fill alt="Image" />
                    </div>
                    <div className="flex flex-col gap-y-1 overflow-hidden">
                        <p className="text-white truncate">
                            Liked Songs
                        </p>
                    </div>
                </div>

                {songs.map((item) => (
                    <MediaItem onClick={(id: string) => onPlay(id)} data={item} key={item.id}/>
                ))}
                
            </div>

        </div>
    </div>
    );
};

export default Library;
