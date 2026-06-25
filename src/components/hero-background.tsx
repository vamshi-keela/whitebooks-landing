
export default function HeroBackground() {
    return (
        <div className="absolute inset-0 overflow-hidden bg-white">
            {/* Top border */}
            <div className="absolute top-0 left-[-50vw] w-[200vw] h-px bg-gray-200" />

            {/* Bottom border */}
            <div className="absolute bottom-0 left-[-50vw] w-[200vw] h-px bg-gray-200" />

            {/* Wave layer 1 */}
            <div className="wave wave-primary" />

            {/* Wave layer 2 */}
            <div className="wave wave-secondary" />

            {/* Glow */}
            <div className="glow glow-left" />
            <div className="glow glow-right" />

            {/* Noise overlay */}
            <div className="noise" />
        </div>
    );
}