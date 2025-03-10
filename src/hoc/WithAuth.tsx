import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface CustomJwtPayload {
  userId: number;
  exp: number;
  permissions: string[];
}

const withAuth = (WrappedComponent: React.ComponentType, requiredPermission?: string) => {
  const AuthWrapper = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No hay token en localStorage");
        router.push("/");
        return;
      }

      if (!token.includes(".") || token.split(".").length !== 3) {
        console.error("El token no tiene el formato correcto:", token);
        localStorage.removeItem("token");
        router.push("/");
        return;
      }

      try {
        const decoded = jwtDecode<CustomJwtPayload>(token);

        const now = Math.floor(Date.now() / 1000);
        if (decoded.exp < now) {
          console.error("Token expirado");
          localStorage.removeItem("token");
          router.push("/");
          return;
        }

        if (requiredPermission && !decoded.permissions.includes(requiredPermission)) {
          console.error("No tienes permiso para acceder a esta página");
          router.push("/error");
          return;
        }
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        localStorage.removeItem("token");
        router.push("/");
      }
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
