import { api } from "./api";

export async function verifyRole(role, router, path) {

  const restrictedRoutes = ["/login", "/register", "/forgot-password"];


  try {
    const response = await api.get('/auth/verifyRole')

    if (path === "header" && response.data.role === "user") {
      return true;
    }

    if (response.data.role && path && restrictedRoutes.includes(path)) {
      if (router?.history?.length > 0) {
        return router.back();
      }

      if (response.data.role === "agent") {
        return router.replace("/agent/property");
      }

      return router.replace("/buy-property");
    }

    if (role !== "all" && response.data.role !== role) {
      if (response.data.role === "agent") {
        if (router?.history?.length > 0) {
          return router.back();
        }
        return router.replace("/agent/property");
      }

      if (router?.history?.length > 0) {
        return router.back();
      }
      return router.replace("/buy-property");
    }

    return true;
  } catch (error) {
    console.error(error);
    router.push("/login");
    return true;
  }
}