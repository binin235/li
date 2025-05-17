import {Tooltip, TooltipProvider, TooltipTrigger, TooltipContent} from '@/components/ui/tooltip'
interface HintProps {
    label: string;
    children: React.ReactNode;
    asChild?: boolean;
    side?: "top" | "bottom" | "left" | "right";
    allign?: "start" | "center" | "end";
};

export const Hint = ({ label, children, asChild, side, allign }: HintProps) => {
    return (
        <TooltipProvider>
           <Tooltip delayDuration={0}>
            <TooltipTrigger className="cursor-pointer" asChild={asChild}>
                {children}
            </TooltipTrigger>

            <TooltipContent className='text-black bg-white side={side}
            allign={allign}'>
                <p className='font-semibold '>
                    {label}
                </p>
            </TooltipContent>

            </Tooltip>
        </TooltipProvider>
    )
}
