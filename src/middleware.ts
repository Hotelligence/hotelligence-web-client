import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  '/', 
  '/loginOrSignUp', 
  '/loginByOTP',
  '/loginByPassword',
  '/signupByOTP',
  '/searchResult',
  '/hotelDetails(.*)',
  '/nameAndPasswordRegister',
  '/passwordRegister',
  '/aboutUs',
  '/help',
  '/partnerRegister(.*)',
]);

export default clerkMiddleware((auth, request) =>{ 
  if(!isPublicRoute(request)){
    auth().protect();
    // auth().redirectToSignIn();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};