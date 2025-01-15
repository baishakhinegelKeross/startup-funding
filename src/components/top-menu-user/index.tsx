


// import { getCookieSession } from "@/lib/session/cookieSession";
/*import { getProfileData } from "@/lib/actions/auth";*/
import { User } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "../ui/dropdown-menu";
import UserDropdownMenu from "../user-dropdown";
import { CircleUser } from 'lucide-react';
import { useState } from "react";

export default function TopMenuUser() {
    const [sethover, setHover] = useState(false);

    // const user = await getProfileData();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>

                {/* <AvatarImage src={user.avatar} alt={user.USER_ID} />
                        <AvatarFallback className="rounded-lg">{user?.USER_NAME?.match(/\b([A-Z])/g)?.join('')}</AvatarFallback> */}

                <CircleUser className="cursor-pointer h-10 w-10" />



            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                sideOffset={4}
            >
                <UserDropdownMenu />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}