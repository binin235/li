
import { getUserByUsername } from "@/lib/user-service";
import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { Action } from "./_components/action";
import { isBlockedByUser } from "@/lib/block-service";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
    params: {
        username: string;
    };
}

const UserPage = async (props: UserPageProps) => {
    const params = await props.params;
    
    const { username } = params;
    const user = await getUserByUsername(username);
    if (!user) {
        notFound();
    }

    const isFollowing = await isFollowingUser(user.id);
    const isBlocked = await isBlockedByUser(user.id);
    if(!user){
        return notFound();
    }

    if (!user.stream) {
        return (
            <div className="h-full flex items-center justify-center">
                <p>This user is not currently streaming.</p>
            </div>
        );
    }
    
    return(
        // <div className="flex flex-col justify-center w-full h-full gap-y-4">
        //     <p>username: {user.username}</p>
        //     <p>id: {user.id} </p>
        //     <p>isFollowing: {`${isFollowing}`}</p>
        //     <p>isBlocking: {`${isBlocked}`}</p>
        //     <Action userId={user.id} isFollowing={isFollowing} isBlocked={isBlocked}/>
        // </div>
        <div className="h-full">
            <StreamPlayer
                user={user}
                stream={user.stream}
                isFollowing
            />
        </div>
    )
}

export default UserPage;