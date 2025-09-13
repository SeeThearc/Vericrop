import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const sessionCookie = request.cookies.get('session_id')

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/', '/unauthorized', '/dashboard', '/auth-complete']

  // Paths that are public but shouldn't be accessed if logged in
  const authPaths = ['/login']

  const isPublicPath = publicPaths.includes(path) || path.startsWith('/api/auth')

  if (sessionCookie) {
    try {
      // Verify session with the backend
      const verifyUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000'}/verify`;
      const response = await fetch(verifyUrl, {
        headers: {
          'Cookie': `session_id=${sessionCookie.value}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.ok && data.user) {
          const userRole = data.user.role;

          // If logged in, redirect from login page to dashboard
          if (authPaths.includes(path)) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
          }
          
          // Admin users can access all role-specific paths
          if (userRole === 'admin') {
            return NextResponse.next();
          }
          
          // Role-based access control (more lenient, let client handle most redirects)
          if (path.startsWith('/farmer') && userRole !== 'farmer') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
          }
          if (path.startsWith('/consumer') && userRole !== 'consumer') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
          }
          if (path.startsWith('/distributer') && userRole !== 'distributer') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
          }
          if (path.startsWith('/retailer') && userRole !== 'retailer') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
          }
          if (path.startsWith('/inspector') && userRole !== 'inspector') {
            return NextResponse.redirect(new URL('/unauthorized', request.url));
          }

          return NextResponse.next();
        }
      }
    } catch (error) {
      console.error("Middleware session verification failed:", error);
      // Allow access but the page itself should handle the error
      return NextResponse.next();
    }
  }

  // If no session cookie and trying to access a protected route, redirect to login
  if (!isPublicPath) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('referrer', path)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
