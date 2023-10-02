import { authMiddleware } from "@clerk/nextjs";
import { withApiAuthRequired, getSession } from '@clerk/nextjs';
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware
export default authMiddleware({
    //Enable webhook functionality for clerk organizatios
    publicRoutes: ['/', '/api/webhook/clerk'],
    //routes ignored by clerk
    ignoredRoutes: ['/api/webhook/clerk/callback']
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 

export const clerkAuthMiddleware = withApiAuthRequired(async (req, res) => {
    const session = await getSession({ req });
  
    // Optionally, you can check user roles or perform other authorization checks here.
  
    // You can also attach the user session to the request for use in your route handler.
    req.clerkSession = session;
  
    return {
      props: {},
    };
  });