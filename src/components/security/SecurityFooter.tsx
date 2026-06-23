import { Lock } from "lucide-react";

export default function SecurityFooter() {
    return (
        <div className="
    mt-12
    rounded-3xl
    bg-white
    p-8
    shadow-sm
    flex
    gap-5
    items-center
    ">

            <div className="
      h-14
      w-14
      rounded-full
      bg-pink-100
      flex
      items-center
      justify-center
      ">

                <Lock className="text-[#E73476]" />

            </div>

            <p className="text-gray-500 text-lg leading-8">
                Security isn't just a feature—it's our foundation.
                WhiteBooks follows a security-first approach with
                regular audits, vulnerability assessments and
                continuous improvements.
            </p>

        </div>
    );
}