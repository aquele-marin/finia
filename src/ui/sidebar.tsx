import { Separator } from "@radix-ui/themes";
import Link from "next/link";

export function Sidebar() {
    return (
        <div className="w-1/4 h-full  p-4 absolute left-0 flex-col justify-center hidden sm:flex">
            <h1 className="text-lg font-bold absolute top-0 left-0 ml-2 mt-2">
                Finia Assistant
            </h1>
            <ul className="space-y-2 ">
                <li>
                    <Link href="/">Chat</Link>
                    <Separator orientation="horizontal" size="3" />
                </li>
                <li>
                    <Link href="/about">About Me</Link>
                    <Separator orientation="horizontal" size="3" />
                </li>
                <li>
                    <Link href="/docs">Docs</Link>
                    <Separator orientation="horizontal" size="3" />
                </li>
            </ul>
        </div>
    );
}
