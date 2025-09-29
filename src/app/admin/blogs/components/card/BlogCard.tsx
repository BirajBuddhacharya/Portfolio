import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogPost } from "../../types"

export default function BlogCard({ blog }: { blog: BlogPost }) {
    return (
        <Card className="w-full bg-transparent py-0 overflow-hidden">
            <div className="flex flex-row">
                <div className="h-60 w-[30rem]">
                    <img
                        src={blog.coverImage}
                        alt="Blog Cover"
                        className="h-full w-full object-cover rounded-l-md"
                    />
                </div>
                <div className="flex flex-col py-6 w-full gap-2">
                    <CardHeader className="w-full">
                        <div className="flex w-full justify-between items-center">
                            <CardTitle className="text-xl font-semibold">{blog.title}</CardTitle>
                            <Badge variant='secondary' className="p-2 bg-purple-950/50 text-purple-400 border-purple-400 text-xs">
                                {blog.status}
                            </Badge>
                        </div>
                    </CardHeader>
                    <CardContent className="h-full">
                        <CardDescription className="justify-between h-full flex flex-col">
                            <div>
                                <p className="text-sm text-muted pb-2">{blog.description}</p>
                            </div>
                            <div>
                                <div className="text-muted text-xs py-2">
                                    Create At • {blog.createdAt}
                                </div>
                                <div className="flex justify-between">
                                    <div className="py-2 flex gap-2 justify-start">
                                        {blog.tags.map((tag, index) => (
                                            <span key={index} className="bg-gray-600 px-2 py-1 text-xs rounded-full text-center">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <Button className="text-xs hover:bg-transparent hover:text-primary" variant='ghost'>
                                        <Trash2 />
                                    </Button>
                                </div>
                            </div>
                        </CardDescription>
                    </CardContent>
                </div>
            </div>
        </Card>
    )
}