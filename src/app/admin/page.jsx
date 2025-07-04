import { Eye, Clock, Users, Folder } from "lucide-react";
import StatsCard from "./components/card/statCard";
import SplitText from "@/components/ui/splitText";
import WebsiteTrafficCard from "./components/card/websiteTrafficCard";
import BlurText from "@/components/ui/blurText";
import WebsitePerformanceCard from "./components/card/websitePerformanceCard";

export default function Admin() {
    return (
        <section className="flex flex-col items-start">
            <h2 className="text-3xl font-semibold"><SplitText
                text="Dashboard"
                className=""
                delay={50}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
            /></h2>
            <BlurText
                text="Track your portfolio metrics and visitor engagement."
                delay={50}
                animateBy="words"
                direction="bottom"
                className="text-muted"
            />
            <div className="py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                <StatsCard
                    icon={<Eye size="28" />}
                    label="Total Page Views"
                    value={1234}
                />
                <StatsCard
                    icon={<Users size="28" />}
                    label="Visitors Today"
                    value={127}
                />
                <StatsCard
                    icon={<Folder size="28" />}
                    label="Project Views"
                    value={456}
                />
                <StatsCard
                    icon={<Clock size="28" />}
                    label="Avg. Time on Site"
                    value="2m 45s"
                />
            </div>
            <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-6">
                <WebsiteTrafficCard />
                <WebsitePerformanceCard />
            </div>
        </section>
    )
}

