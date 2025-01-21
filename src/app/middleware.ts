import { NextURL } from 'next/dist/server/web/next-url';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken';




 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  
  let path = request.nextUrl.pathname;
  const isPublicPath = path === '/login' || path === '/signup' ;
  const homePath = path === '/';
  const token = request.cookies.get('token')?.value || '';
  console.log('token', token);
 ;

  // Decode the token (without verifying the signature)
  //const decoded  = jwt.decode(token, { complete: true });

  //if (!decoded) {
    // Handle the case where the token could not be decoded
    //console.log('Invalid token');
   // return NextResponse.redirect(new URL('/login', request.url));
  

  // Extract the payload
  // try {
  //   const payload = decoded?.payload as { username: string };
  //   console.log(payload);

  //   // Parse the request body if it exists
  //   if (request.body) {
  //     const body = await request.json();
  //     body.username = payload.username;
  //     const modifiedRequest = new Request(request.url, {
  //       ...request,
  //       body: JSON.stringify(body),
  //     });
  //     return NextResponse.next({ request: modifiedRequest });
  //   }
  // } catch (e) {
  //   if (e instanceof Error) {
  //     console.log(e.message);
  //   } else {
  //     console.log('An unknown error occurred');
  //   }
  // }
 

  
  if(homePath && !token){
    return NextResponse.redirect(new URL("/",request.nextUrl));
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL("/login",request.nextUrl));
  }
  
  if(isPublicPath && token){
    return NextResponse. (new URL("/",request.nextUrl));
  }
  
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/',
     '/profile',
    '/login',
  '/signup'
]
}