import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export default function HeaderActions() {
    return (
        <div className="py-4 flex justify-between w-full">
            <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="pl-9"
                />
            </div>
            <div className="space-x-2 flex">
                <Select>
                    <SelectTrigger defaultValue='all'>
                        <SelectValue placeholder="Filter By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="drafts">Drafts</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                </Select>
                <Select>
                    <SelectTrigger>
                        <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="date">Date</SelectItem>
                        <SelectItem value="title">Title</SelectItem>
                        <SelectItem value="author">Publish Status</SelectItem>
                    </SelectContent>
                </Select>
                <Button>
                    Add Blogs
                </Button>
            </div>
        </div>
    )
}