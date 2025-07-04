'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export default function WebsiteTrafficCard() {
    const chartData = [
        { month: "January", visitors: 80, pageViews: 186 },
        { month: "February", visitors: 200, pageViews: 305 },
        { month: "March", visitors: 120, pageViews: 237 },
        { month: "April", visitors: 190, pageViews: 273 },
        { month: "May", visitors: 130, pageViews: 209 },
        { month: "June", visitors: 140, pageViews: 214 },
        { month: "July", visitors: 160, pageViews: 256 },
        { month: "August", visitors: 220, pageViews: 329 },
        { month: "September", visitors: 170, pageViews: 283 },
        { month: "October", visitors: 150, pageViews: 245 },
        { month: "November", visitors: 180, pageViews: 291 },
        { month: "December", visitors: 210, pageViews: 312 }
    ]

    const chartConfig = {
        visitors: {
            label: "Unique Vist",
            color: "var(--chart-1)",
        },
        pageViews: {
            label: "Page Views",
            color: "var(--chart-3)",
        },
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Website Traffic</CardTitle>
                <CardDescription className="text-muted">
                    Visitors and page views over the last year
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full px-2 sm:px-4">
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            left: 6,
                            right: 6,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="visitors"
                            type="natural"
                            fill="var(--color-visitors)"
                            fillOpacity={0.4}
                            stroke="var(--color-visitors)"
                            stackId="a"
                        />
                        <Area
                            dataKey="pageViews"
                            type="natural"
                            fill="var(--chart-2)"
                            fillOpacity={0.4}
                            stroke="var(--chart-2)"
                            stackId="a"
                        />
                        <ChartLegend
                            content={
                                <ChartLegendContent
                                    payload={[
                                        { value: 'Unique Vist', color: 'var(--chart-1)' },
                                        { value: 'Page Views', color: 'var(--chart-3)' }
                                    ]}
                                />
                            }
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
