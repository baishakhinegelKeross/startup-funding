import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    console.log('Checking for Admin users for approval');
    const isAdmin = request.user?.roles.includes("Admin") || false;
    console.log("user is admin: ",isAdmin)
    const token = request.cookies.get('token')?.value || '';
    console.log('token', token);
    ;
    if (!token) {
        return NextResponse.redirect(new URL("/login", request.nextUrl));
    }
    if (token && !isAdmin) {
        return NextResponse.redirect(new URL("/not-authorised", request.nextUrl));
    }

    return NextResponse.redirect(new URL("/approval", request.nextUrl));
    
}