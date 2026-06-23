import FloatingSecurityCard from "./FloatingSecurityCard";
import {
    Lock,
    Eye,
    Cloud,
    UserRound,
} from "lucide-react";

export default function Shield3D() {
    return (
        <div className="relative flex justify-center">

            <div className="absolute left-0 top-16">
                <FloatingSecurityCard
                    icon={Lock}
                    title="Encrypted Transmission"
                    subtitle="TLS 1.2+"
                />
            </div>

            <div className="absolute right-0 top-8">
                <FloatingSecurityCard
                    icon={Cloud}
                    title="Infrastructure"
                    subtitle="AWS / Azure"
                />
            </div>

            <div className="absolute left-5 bottom-28">
                <FloatingSecurityCard
                    icon={UserRound}
                    title="Secure Access"
                    subtitle="OAuth2"
                />
            </div>

            <div className="absolute right-10 bottom-20">
                <FloatingSecurityCard
                    icon={Eye}
                    title="24×7 Monitoring"
                    subtitle="Continuous"
                />
            </div>

            {/* glow */}

            <div className="
      absolute
      w-[500px]
      h-[500px]
      rounded-full
      bg-pink-200/40
      blur-[140px]
      " />

            <img
                src="/security-shield.webp"
                className="relative w-[600px]"
            />

        </div>
    );
}