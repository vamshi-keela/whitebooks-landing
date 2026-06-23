export default function ComplianceBar() {
    return (
        <div className="
    mt-32
    rounded-[40px]
    bg-white
    shadow-xl
    p-12
    ">

            <div className="grid md:grid-cols-6 gap-10 items-center">

                <div>

                    <h2 className="text-2xl font-semibold">
                        Compliant with
                        <br />
                        Industry Standards
                    </h2>

                </div>

                <ComplianceLogo title="ISO 27001" />
                <ComplianceLogo title="SOC 2 TYPE II" />
                <ComplianceLogo title="GDPR" />
                <ComplianceLogo title="DPDPA" />
                <ComplianceLogo title="MeitY" />

            </div>

        </div>
    );
}

function ComplianceLogo({
    title,
}: {
    title: string;
}) {
    return (
        <div className="
    border-l
    text-center
    py-8
    text-xl
    font-semibold
    text-gray-700
    ">
            {title}
        </div>
    );
}