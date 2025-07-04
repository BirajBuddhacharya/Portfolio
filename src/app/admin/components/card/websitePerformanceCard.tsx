'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CartesianGrid, Dot, Line, LineChart, XAxis } from "recharts"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

export default function WebsitePerformanceCard() {
    const chartData = [
        { month: "Jan", bounceRate: 65.2, conversionRate: 2.4 },
        { month: "Feb", bounceRate: 62.8, conversionRate: 2.8 },
        { month: "Mar", bounceRate: 58.4, conversionRate: 3.2 },
        { month: "Apr", bounceRate: 55.9, conversionRate: 3.6 },
        { month: "May", bounceRate: 53.2, conversionRate: 3.9 },
        { month: "Jun", bounceRate: 51.8, conversionRate: 4.2 }
    ]

    const chartConfig = {
        bounceRate: {
            label: "Bounce Rate",
            color: "var(--chart-1)",
        },
        conversionRate: {
            label: "Conversion Rate",
            color: "var(--chart-2)",
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Website Performance</CardTitle>
                <CardDescription className="text-muted">
                    Bounce rate and conversion rate metrics
                </CardDescription>
            </CardHeader>
            <CardContent className="w-full px-2 sm:px-4">
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={chartData}
                        margin={{
                            top: 24,
                            left: 24,
                            right: 24,
                        }}
                    >
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <CartesianGrid vertical={false} />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Line
                            dataKey="bounceRate"
                            type="natural"
                            stroke="var(--chart-1)"
                            strokeWidth={2}
                            dot={({ payload, ...props }) => (
                                <Dot
                                    r={5}
                                    cx={props.cx}
                                    cy={props.cy}
                                    key={payload.month}
                                    fill="var(--chart-1)"
                                    stroke="var(--chart-1)"
                                />
                            )}
                        />
                        <Line
                            dataKey="conversionRate"
                            type="natural"
                            stroke="var(--chart-2)"
                            strokeWidth={2}
                            dot={({ payload, ...props }) => (
                                <Dot
                                    r={5}
                                    cx={props.cx}
                                    cy={props.cy}
                                    fill="var(--chart-2)"
                                    key={payload.month}
                                    stroke="var(--chart-2)"
                                />
                            )}
                        />
                    </LineChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
