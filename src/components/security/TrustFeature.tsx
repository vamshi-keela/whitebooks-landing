import { LucideIcon } from "lucide-react";

interface Props {
    icon: LucideIcon;
    title: string;
    desc: string;
}

export default function TrustFeature({
    icon: Icon,
    title,
    desc,
}: Props) {
    return (
        <div className="flex gap-4">

            <div className="mt-1">
                <Icon className="text-[#E73476]" />
            </div>

            <div>

                <h4 className="font-semibold text-[#111827]">
                    {title}
                </h4>

                <p className="text-gray-500 mt-2">
                    {desc}
                </p>

            </div>
        </div>
    );
}