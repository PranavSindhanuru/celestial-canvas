import { memo } from "react";

interface ToolbarProps {
    stars: boolean;
    comets: boolean;
    color: string;
    onStarsToggle: () => void;
    onCometsToggle: () => void;
    onColorChange: (value: string) => void;
    onClear: () => void;
    getContrastColor: (color: string) => string;
}

const Toolbar = memo(({ stars, comets, color, onStarsToggle, onCometsToggle, onColorChange, onClear, getContrastColor }: ToolbarProps) => (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="bg-black/40 border border-black/50 rounded-full flex items-center gap-5 justify-center w-fit h-fit px-3 py-1 transition-all group-hover:bg-white/50">
            <div className="text-[#EEEEEE] w-[20px] h-[20px] hover:scale-[1.4] transition-all cursor-pointer" onClick={onStarsToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" style={{
                    filter: stars ? 'drop-shadow(0 0 8px #FFFFFF) drop-shadow(0 0 16px #FF0)' : ''
                }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7.45284 2.71266C7.8276 1.76244 9.1724 1.76245 9.54716 2.71267L10.7085 5.65732C10.8229 5.94743 11.0526 6.17707 11.3427 6.29148L14.2873 7.45284C15.2376 7.8276 15.2376 9.1724 14.2873 9.54716L11.3427 10.7085C11.0526 10.8229 10.8229 11.0526 10.7085 11.3427L9.54716 14.2873C9.1724 15.2376 7.8276 15.2376 7.45284 14.2873L6.29148 11.3427C6.17707 11.0526 5.94743 10.8229 5.65732 10.7085L2.71266 9.54716C1.76244 9.1724 1.76245 7.8276 2.71267 7.45284L5.65732 6.29148C5.94743 6.17707 6.17707 5.94743 6.29148 5.65732L7.45284 2.71266Z" fill="currentColor" />
                    <path d="M16.9245 13.3916C17.1305 12.8695 17.8695 12.8695 18.0755 13.3916L18.9761 15.6753C19.039 15.8348 19.1652 15.961 19.3247 16.0239L21.6084 16.9245C22.1305 17.1305 22.1305 17.8695 21.6084 18.0755L19.3247 18.9761C19.1652 19.039 19.039 19.1652 18.9761 19.3247L18.0755 21.6084C17.8695 22.1305 17.1305 22.1305 16.9245 21.6084L16.0239 19.3247C15.961 19.1652 15.8348 19.039 15.6753 18.9761L13.3916 18.0755C12.8695 17.8695 12.8695 17.1305 13.3916 16.9245L15.6753 16.0239C15.8348 15.961 15.961 15.8348 16.0239 15.6753L16.9245 13.3916Z" fill="currentColor" />
                </svg>
            </div>
            <div className="text-[#FFFFFF] -rotate-90 w-[30px] h-[30px] hover:scale-[1.4] transition-all cursor-pointer" onClick={onCometsToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" fill="none" style={{
                    filter: comets ? 'drop-shadow(0 0 8px #FFFFFF) drop-shadow(0 0 8px #888) drop-shadow(0 0 4px #888) drop-shadow(0 0 16px #FF0)' : ''
                }}>
                    <path d="M86.2026 285.317C95.7078 273.785 104.521 274.665 116.485 280.55C157.298 300.623 76.686 360.034 80.752 296.04" stroke="currentColor" stroke-opacity="0.9" stroke-width="16" stroke-linecap="round" stroke-linejoin="round" />
                    <path opacity="0.503384" d="M137.064 204.565C127.407 219.233 115.042 231.881 104.257 245.805C92.1563 261.432 79.9402 270.298 73.1757 289.708C62.0402 321.66 95.8025 341.491 125.52 327.09C164.566 308.167 190.343 267.954 227.582 246.405" stroke="#EEEEEE" stroke-opacity="0.9" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
                    <path opacity="0.503384" d="M152.953 216.844C182.156 193.999 197.49 134.407 211.902 134.407C215.083 134.407 190.644 164.164 201.668 166.901C213.49 169.834 294.535 84.7844 309.751 68" stroke="currentColor" stroke-opacity="0.9" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
                    <path opacity="0.503384" d="M329.428 93.4614C296.983 120.867 268.767 153.149 239.156 182.576" stroke="currentColor" stroke-opacity="0.9" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
                    <path opacity="0.503384" d="M276.855 182.576C249.288 199.274 226.995 214.725 206.751 239.285" stroke="currentColor" stroke-opacity="0.9" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </div>
            <div className="h-[20px] w-[1px] border border-white rounded-full"></div>
            <div className="relative w-[25px] h-[25px] hover:scale-[1.4] transition-all cursor-pointer">
                <input
                    type="color"
                    className="absolute inset-0 opacity-0 cursor-pointer w-[25px] h-[25px]"
                    value={color}
                    onChange={(e) => onColorChange(e.target.value)}
                />
                <div
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{ backgroundColor: color, border: `1px solid ${getContrastColor(color)}` }}
                >
                    <svg fill={getContrastColor(color)} width="15px" height="15px" viewBox="0 0 24 24"><path d="m20.71 5.63-2.34-2.34a.996.996 0 0 0-1.41 0l-3.12 3.12-1.23-1.21c-.39-.39-1.02-.38-1.41 0-.39.39-.39 1.02 0 1.41l.72.72-8.77 8.77q-.15.15-.15.36v4.04c0 .28.22.5.5.5h4.04c.13 0 .26-.05.35-.15l8.77-8.77.72.72c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41l-1.22-1.22 3.12-3.12c.41-.4.41-1.03.02-1.42M6.92 19 5 17.08l8.06-8.06 1.92 1.92z"></path></svg>
                </div>
            </div>
            <div className="text-[#EEEEEE] w-[25px] h-[25px] hover:scale-[1.4] transition-all cursor-pointer" onClick={onClear}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" aria-hidden="true" viewBox="0 0 24 24"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9m-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8z"></path></svg>
            </div>
        </div>
    </div>
));

export default Toolbar;