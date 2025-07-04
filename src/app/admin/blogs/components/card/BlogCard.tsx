import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function BlogCard() {
    return (
        <Card className="w-full bg-transparent py-0 overflow-hidden">
            <div className="flex flex-row">
                <img
                    src="https://cougnonlab.com/wp-content/uploads/2020/12/qi-bin-w4hbafegiac-unsplash.jpg"
                    alt="Blog Cover"
                    className="h-60 w-80 object-cover rounded-l-md"
                />
                <div className="flex flex-col py-6 w-full gap-2">
                    <CardHeader className="w-full">
                        <div className="flex w-full justify-between items-center">
                            <CardTitle className="text-xl font-semibold">Blog Title</CardTitle>
                            <Badge variant='secondary' className="p-2 bg-purple-950/50 text-purple-400 border-purple-400 text-xs">
                                Published
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>
                            <p className="text-sm text-muted pb-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, eius harum officia eum sint esse dicta dolorum, ut unde nesciunt maxime perferendis quasi vero iusto? Aut deserunt iusto itaque temporibus.</p>
                            <div className="text-muted text-xs py-2">
                                Create At • Dec 12, 2023
                            </div>
                            <div className="flex justify-between">
                                <div className="py-2 flex gap-2 justify-start">
                                    <span className="bg-gray-600 px-2 py-1 text-xs rounded-full text-center">Science</span>
                                    <span className="bg-gray-600 px-2 py-1 text-xs rounded-full text-center">Technology</span>
                                    <span className="bg-gray-600 px-2 py-1 text-xs rounded-full text-center">Programming</span>
                                    <span className="bg-gray-600 px-2 py-1 text-xs rounded-full text-center">Web Dev</span>
                                </div>
                                <Button className="text-xs hover:bg-transparent hover:text-primary" variant='ghost'><Trash2 />  </Button>
                            </div>
                        </CardDescription>
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}