import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface Props {
    icon: LucideIcon;
    title: string;
    subtitle: string;
}

export default function FloatingSecurityCard({
    icon: Icon,
    title,
    subtitle,
}: Props) {
    return (
        <motion.div
            animate={{
                y: [0, -10, 0],
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
            }}
            className="
      backdrop-blur-xl
      bg-white/80
      border
      rounded-3xl
      shadow-xl
      p-6
      w-[220px]
      "
        >
            <Icon className="text-[#E73476] mb-3" />

            <h4 className="font-semibold">
                {title}
            </h4>

            <p className="text-gray-500 mt-2">
                {subtitle}
            </p>
        </motion.div>
    );
}