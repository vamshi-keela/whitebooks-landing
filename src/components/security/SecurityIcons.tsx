export default function SecureLockIcon({
    size = 48,
    color = "#E63973",
}: {
    size?: number;
    color?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Shackle */}
            <path
                d="M16 20V14C16 9.58 19.58 6 24 6C28.42 6 32 9.58 32 14V20"
                stroke={color}
                strokeWidth="2.4"
                strokeLinecap="round"
            />

            {/* Body */}
            <rect
                x="12"
                y="20"
                width="24"
                height="20"
                rx="5"
                stroke={color}
                strokeWidth="2.4"
            />

            {/* Keyhole */}
            <circle
                cx="24"
                cy="28"
                r="2.5"
                fill={color}
            />

            <path
                d="M24 30.5V34"
                stroke={color}
                strokeWidth="2"
                strokeLinecap="round"
            />

            {/* Inner body highlight */}
            <rect
                x="15"
                y="23"
                width="18"
                height="14"
                rx="3"
                stroke={color}
                strokeOpacity="0.25"
                strokeWidth="1"
            />
        </svg>
    );
}