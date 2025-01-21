import { BadgeCheck, Bell, CreditCard, LogOut } from 'lucide-react'
// import User from '../menu-user'
import Link from 'next/link'
// import { signOut } from '@/lib/actions/auth'
import Swal from 'sweetalert2'; 
import withReactContent from 'sweetalert2-react-content';
import { DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator } from '../ui/dropdown-menu'
import { useAuth } from '@/lib/auth-context';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

const Warningswal = withReactContent(Swal); 



function UserDropdownMenu({username}: {username: string}) {
    
    
    
    const userContext = useAuth();
    
   
    return (
        <>
            <ToastContainer/>
            <DropdownMenuLabel className="p-0 font-normal">
                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                    { userContext.user ? `Welcome , ${userContext.user.username}` : "Welcome, Guest"}
                    
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
                <DropdownMenuItem asChild>
                    <Link href={"/user-profile"}>
                        <BadgeCheck />
                        Profile
                    </Link>

                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link href={"/setting/profile"}>
                        <BadgeCheck />
                        Sign Up/Sign In
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
            <DropdownMenuItem onClick={()=>{
                    Warningswal.fire({
                        title: 'Are you sure? ',
                        text: 'You want to Logout?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'OK',
                        cancelButtonText: 'Cancel',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            axios.post('http://localhost:8000/auth/logout',{}, { withCredentials: true, }).then((response) => {
                                toast.success('Sucessfully LoggedOut')
                                window.location.href = '/login'; 
                               }).catch((error) => {  
                               debugger
                                    toast.error(error.response.data.error);
                               });   
                        } else if (result.isDismissed) {
                            
                        }
                    }); 
                }}>
                <LogOut />
                Log out 
            </DropdownMenuItem>
        </>
    )
}

export default UserDropdownMenu