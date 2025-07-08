import { Card, CardContent } from "@/components/ui/card";
import CountUp from "@/components/ui/countUp"; // Make sure to import CountUp

type statsCardProps = {
    icon: React.ReactNode;
    label: string | React.ReactNode;
    value: string | number;
}

export default function StatsCard({ icon, label, value }: statsCardProps) {
    return (
        <Card className="justify-center">
            <CardContent className="flex items-center gap-4">
                <div>
                    {icon}
                </div>
                <div>
                    <p className="text-muted mb-[1px]">{label}</p>
                    <p className="text-2xl font-semibold">
                        {typeof value === "number" ? (
                            <CountUp
                                from={0}
                                to={value}
                                separator=","
                                duration={0.1}
                                className="count-up-text"
                            />
                        ) : (
                            value
                        )}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}
