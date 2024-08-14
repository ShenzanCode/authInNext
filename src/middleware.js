import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export default function middleware(request) {
 const path= request.nextUrl.pathname
 const isPulicPath= path=== "/login" || path=== "/signup";

 //get cookies
 const token = request.cookies.get("token")?.value || "";

 //if user is not logged in and trying to access login or signup page redirect to login page.
 //if user is logged in and trying to access login page redirect to profile page.
 //if user is logged in and trying to access logout page redirect to login page.
 //if user is not logged in and trying to access profile page redirect to login page.
 //if user is not logged in and trying to access signup page redirect to signup page.
 //if user is logged in and trying to access logout page redirect to login page.
 //if user is not logged in and trying to access login page redirect to login page.
 //if user is not logged in and trying to access signup page redirect to signup page.
 //
 if(isPulicPath && token){
    return NextResponse.redirect(new URL("/",request.nextUrl))
 }
 if(!isPulicPath && !token){

    return NextResponse.redirect(new URL("/login",request.nextUrl))
 }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/login',
    '/',
    '/profile',
    '/signup',
    '/logout',
  ],
}