import { db } from './db';
import { getSelf } from './auth-service';

export const isBlockedByUser = async (id: string): Promise<boolean> => {
    try {
        const self = await getSelf();

        const otherUser = await db.user.findUnique({
            where: {
                id
            }
        });

        if (!otherUser) {
            throw new Error("User not found");
        }

        if (self.id === otherUser.id) {
            return false;
        }

        const existingBlock = await db.block.findFirst({
            where: {
                    blockerId: self.id,
                    blockedId: otherUser.id,
                }
        });

        return !!existingBlock;

    } catch (err) {
        return false;
    }
};

export const blockUser = async (id: string) => {
    const self = await getSelf();

    if (self.id === id) {
        throw new Error("Cannot block yourself");
    }

    const otherUser = await db.user.findUnique({
        where: { id }
    });

    if (!otherUser) {
        throw new Error("User not found to block");
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockedId_blockerId: {
                blockerId: self.id,
                blockedId: otherUser.id,
            }
        }
    });

    if (existingBlock) {
        throw new Error("User already blocked by you");
    }

    const block = await db.block.create({
        data: {
            blockerId: self.id,
            blockedId: otherUser.id,
        },
        include: {
            blocked: true,
        }
    });

    return block;
};

export const unblockUser = async (id: string) => {
    const self = await getSelf();

    if (self.id === id) {
        throw new Error("Cannot unblock yourself");
    }

    const otherUser = await db.user.findUnique({
        where: { id }
    });

    if (!otherUser) {
        throw new Error("User not found to unblock");
    }

    const existingBlockBySelf = await db.block.findUnique({
        where: {
            blockedId_blockerId: {
                blockerId: self.id,
                blockedId: otherUser.id,
            }
        }
    });

    if (!existingBlockBySelf) {
        throw new Error("You are not currently blocking this user");
    }

    const unblock = await db.block.delete({
        where: {
            id: existingBlockBySelf.id,
        },
        include: {
            blocked: true,
        }
    });

    return unblock;
};