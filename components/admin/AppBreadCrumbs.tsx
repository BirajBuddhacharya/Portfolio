'use client'
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";

export default function AppBreadCrumbs() {
    const path = usePathname();
    const segments = path?.split('/').filter(Boolean);

    return (
        <Breadcrumb className="flex items-center gap-2">
            <BreadcrumbList>
                {segments?.map((segment, index) => {
                    const href = "/" + segments.slice(0, index + 1).join("/")
                    const label = segment.replace(/[-_]/g, " ").replace(/\b\w/g, l => l.toUpperCase())

                    return (
                        <div key={index} className="flex gap-2 items-center justify-center">
                            <BreadcrumbItem>
                                <Link href={href}>
                                    {label}
                                </Link>
                            </BreadcrumbItem>
                            {(index !== segments.length - 1) && (
                                <BreadcrumbSeparator />
                            )}
                        </div>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}