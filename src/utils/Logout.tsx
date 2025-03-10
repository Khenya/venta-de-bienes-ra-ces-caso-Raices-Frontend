import api from "./api"; 

export const logout = async () => {
  try {
    const response = await api.post(
      "/api/auth/logout",
      {}, 
      { withCredentials: true } 
    );

    if (response.status === 200) {
      localStorage.removeItem("token"); 
      window.location.href = "/"; 
    } else {
      console.error("Error al cerrar sesión en el servidor");
    }
  } catch (error) {
    console.error("Error de red en logout:", error);
  }
};
