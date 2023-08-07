import { Song } from "@/types"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/dist/client/components/headers"
import getSongs from "./getSongs"

const getSongsByTitleAuthor = async (search: string): Promise<Song[]> => {
    const supabase = createServerComponentClient({
        cookies: cookies
    })

    if (!search) {
        const allSongs = await getSongs();
        return allSongs;
    }

    const { data, error } = await supabase.from('songs').select('*').or(`title.ilike.%${search}%,author.ilike.%${search}%`).order('created_at', {ascending: false});

    if (error) {
        console.log(error)
    }

    return (data as any) || [];
}

export default getSongsByTitleAuthor;