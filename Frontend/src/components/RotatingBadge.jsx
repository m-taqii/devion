import React from 'react';

const RotatingBadge = () => {
    return (
        <div className="pointer-events-none fixed md:bottom-10 md:right-10 bottom-5 right-3 z-50 mix-blend-difference">
            <div className="relative md:w-32 md:h-32 w-20 h-20 flex items-center justify-center">
                {/* Rotating Text Ring */}
                <div className="absolute inset-0 animate-[spin_10s_linear_infinite]">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                        <defs>
                            <path
                                id="circlePath"
                                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                            />
                        </defs>
                        <text className="fill-white text-[10px] font-bold uppercase tracking-[4px]">
                            <textPath href="#circlePath" startOffset="0%">
                                DEVION • AI • DEVELOPER •
                            </textPath>
                        </text>
                    </svg>
                </div>
                {/* Center Icon/Dot */}
                <div className="absolute w-12 h-12 bg-blue-950 rounded-full flex items-center justify-center">
                    <span className="text-gray-400 text-xl font-bold">D</span>
                </div>
            </div>
        </div>
    );
};

export default RotatingBadge;
