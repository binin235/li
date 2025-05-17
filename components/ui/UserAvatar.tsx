import {cva, type VariantProps} from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Skeleton } from './skeleton'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { LiveBadge } from './live-badge'
const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: 'h-8 w-8',
                lg: 'h-14 w-14',
                xl: 'h-20 w-20',
            },
        },
        defaultVariants: {
            size: 'default',
        },
    }
);
interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    imageUrl: string;
    username: string;
    isLive?: boolean;
    showBadge?: boolean;
}


export const UserAvatar = ({
    imageUrl,
    username,
    isLive,
    showBadge,
    size,
}: UserAvatarProps) => {
    const canShowBadge = isLive && showBadge;
    return (
        <div className='relative'>
            <Avatar
                className={cn(
                    avatarSizes({ size }), 
                    isLive && "ring-2 ring-rose-500 border border-background" 
                )}
            >
                <AvatarImage

                    src={imageUrl}
                    alt={username}
                    className="object-cover" 
                />
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                 <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                     <LiveBadge />
                 </div>
            )}

        </div>
    )


};

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> {};
export const UserAvatarSkeleton = ({
    size,
}: UserAvatarSkeletonProps) => {
    return (
        <Skeleton className={cn("rounded-full",avatarSizes({ size }))} />
    )
};


