"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function withAuth(Component: React.ComponentType) {
  return function ProtectedRoute(props: any) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "unauthenticated") {
        router.push("/auth/signin");
      }
    }, [status, router]);

    if (status === "loading") {
      return <p>Loading...</p>;
    }

    return session ? <Component {...props} /> : null;
  };
}
