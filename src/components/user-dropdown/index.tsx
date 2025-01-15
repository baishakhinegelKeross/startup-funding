import { BadgeCheck, Bell, CreditCard, LogOut } from 'lucide-react'
// import User from '../menu-user'
import Link from 'next/link'
// import { signOut } from '@/lib/actions/auth'
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { Button } from '../ui/button';

function UserDropdownMenu() {
    // async function logOut() {
    //     "use server"
    //     await signOut();
    // }
    return (
        <>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    {/* <User /> */}
                    Profile Menu
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link href={"/setting/profile"}>
                        <BadgeCheck />
                        Profile
                    </Link>

                </DropdownMenuItem>
                
                <DropdownMenuItem asChild>
                    <Link href={"/setting/profile"}>
                        <BadgeCheck />
                        Setting
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
                <LogOut />
                Log out
            </DropdownMenuItem>
        </>
    )
}

export default UserDropdownMenu