"use client";

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@supabase/auth-helpers-react";
import useUploadModal from "@/hooks/useUploadModal";

const Library = () => {
    const  authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const user = useUser();

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
                    <p className="text-neutral-400 font-medium text-md">Your Library</p>
                </div>
                <div onClick={onClick} className="cursor-pointer rounded-full flex items-center justify-center bg-neutral-900 p-1 hover:bg-neutral-800 group">
                    <AiOutlinePlus size={22} className="text-neutral-400 transition group-hover:text-white"/>
                </div>
            </div>

            <div className="flex flex-col gap-y-2 mt-4 px-3">List of Songs</div>

        </div>
    </div>
    );
};

export default Library;
