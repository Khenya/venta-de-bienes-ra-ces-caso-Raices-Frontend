import withAuth from '../hoc/WithAuth';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header2 from "@/components/common/Header_2";
import UserForm from '@/components/common/UserForm';
import styles from '../app/config/theme/Card.module.css';

interface User {
  id: number;
  name: string;
  role: number;
}

interface Role {
  id: number;
  name: string;
}

const SettingsPage = () => {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const usersRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`);
        if (!usersRes.ok) throw new Error('Error al cargar usuarios');
        const usersData = await usersRes.json();
        setUsers(usersData.map((u: any) => ({
          id: u.user_id,
          name: u.username,
          role: u.role_id,
        })));

        const rolesRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roles/`);

        const rolesData = await rolesRes.json();

        const mappedRoles = rolesData.map((r: any) => {
          return {
            id: Number(r.role_id),
            name: r.name
          };
        });
        setRoles(mappedRoles);

      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ocurrió un error desconocido');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fields = [{
    name: "userId",
    label: "Usuario",
    type: "select" as const,
    required: true,
    options: users.map((u) => ({
      label: u.name,
      value: u.id
    }))
  }, {
    name: "password",
    label: "Contraseña nueva",
    type: "password" as const,
    required: true
  }, {
    name: "confirmPassword",
    label: "Confirma la nueva contraseña",
    type: "password" as const,
    required: true
  }];

  const fields2 = [
    {
      name: "username",
      label: "Nombre",
      type: "text" as const,
      required: true
    }, {
      name: "roleId",
      label: "Rol",
      type: "select" as const,
      required: true,
      options: roles.map((r) => ({
        label: r.name,
        value: r.id
      }))
    }, {
      name: "password",
      label: "Contraseña",
      type: "password" as const,
      required: true
    }, {
      name: "confirmPassword",
      label: "Confirma la contraseña",
      type: "password" as const,
      required: true
    }
  ];

  const fields3 = [
    {
      name: "userId",
      label: "Usuario",
      type: "select" as const,
      required: true,
      options: users.map((u) => ({ label: u.name, value: u.id }))
    }
  ];

  const handleError = (err: unknown): string => {
    if (err instanceof Error) {
      return err.message;
    }
    return 'Ocurrió un error desconocido';
  };

  const showSuccessMessage = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-white">
      <Header2 />
      <main
        style={{
          paddingTop: "100px",
          minHeight: "calc(100vh - 80px)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: 'relative'
        }}
        className="w-full bg-gray-50"
      >
        {loading && <div className="spinner-border text-primary" role="status"></div>}

        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}>
          {error && (
            <div className="alert alert-danger" style={{ margin: 0 }}>
              {error}
              <button
                type="button"
                className="btn-close"
                style={{ float: 'right' }}
                onClick={() => setError(null)}
              />
            </div>
          )}
          {successMessage && (
            <div className="alert alert-success" style={{ margin: 0 }}>
              {successMessage}
              <button
                type="button"
                className="btn-close"
                style={{ float: 'right' }}
                onClick={() => setSuccessMessage(null)}
              />
            </div>
          )}
        </div>

        <div className={styles.cardGrid}>
          <UserForm
            title="Crear un nuevo usuario"
            fields={fields2}
            onSubmit={async (values) => {
              try {
                // Verificación de contraseñas
                if (values.password !== values.confirmPassword) {
                  throw new Error('Las contraseñas no coinciden');
                }

                // Conversión explícita del roleId a número
                const roleId = Number(values.roleId);
                if (isNaN(roleId)) {
                  throw new Error('El ID del rol no es un número válido');
                }

                // Verificación de que el rol existe
                const roleExists = roles.some(r => r.id === roleId);
                if (!roleExists) {
                  throw new Error('El rol seleccionado no existe en la base de datos');
                }
                const payload = {
                  username: String(values.username).trim(),
                  password: String(values.password),
                  role_id: roleId,
                  confirmPassword: String(values.confirmPassword)
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify(payload)
                });

                if (!res.ok) {
                  const errorData = await res.json();
                  console.error('[DEBUG] Error del backend:', errorData);
                  throw new Error(errorData.error || 'Error al crear usuario');
                }

                const data = await res.json();
                showSuccessMessage('Usuario creado exitosamente');

                const usersRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`);
                const usersData = await usersRes.json();
                setUsers(usersData.map((u: any) => ({
                  id: u.user_id,
                  name: u.username,
                  role: u.role_id,
                })));

              } catch (err) {
                console.error('[DEBUG] Error al crear usuario:', err);
                setError(err instanceof Error ? err.message : 'Error al crear usuario');
              }
            }}
            submitLabel="Crear"
            onCancel={() => console.log("Cancelar creación")}
          />
          
          <UserForm
            title="Cambiar contraseña de un usuario"
            fields={fields}
            onSubmit={async (values) => {
              try {
                if (!values.userId) {
                  throw new Error('Por favor selecciona un usuario');
                }

                // Obtener el usuario seleccionado
                const selectedUser = users.find(u => u.id === Number(values.userId));
                if (!selectedUser) {
                  throw new Error('Usuario no encontrado');
                }

                // Verificación de contraseñas
                if (values.password !== values.confirmPassword) {
                  throw new Error('Las contraseñas no coinciden');
                }

                // Validación de fortaleza de contraseña
                const passwordStr = String(values.password);
                if (passwordStr.length < 8) {
                  throw new Error('La contraseña debe tener al menos 8 caracteres');
                }

                // Construir el payload con username incluido
                const payload = {
                  username: selectedUser.name, // Aquí usamos el nombre del usuario
                  password: passwordStr,
                  confirmPassword: String(values.confirmPassword),
                  role_id: selectedUser.role // Añadimos el role_id también por si acaso
                };
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${values.userId}`, {
                  method: 'PUT',
                  headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                  },
                  body: JSON.stringify(payload)
                });

                if (!res.ok) {
                  const errorData = await res.json();
                  console.error('[DEBUG] Error del backend:', errorData);
                  throw new Error(errorData.error || 'Error al cambiar contraseña');
                }

                showSuccessMessage('Contraseña cambiada exitosamente');

              } catch (err) {
                console.error('[DEBUG] Error al cambiar contraseña:', err);
                setError(err instanceof Error ? err.message : 'Error al cambiar contraseña');
              }
            }}
            submitLabel="Aplicar"
            onCancel={() => console.log("Cancelar cambio")}
          />

          <UserForm
            title="Eliminar un usuario"
            fields={fields3}
            onSubmit={async (values) => {
              try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${values.userId}`, {
                  method: 'DELETE'
                });

                if (!res.ok) throw new Error('Error al eliminar usuario');

                const data = await res.json();
                showSuccessMessage('Usuario eliminado exitosamente');

                setUsers(users.filter(u => u.id !== Number(values.userId)));
              } catch (err) {
                setError(handleError(err));
              }
            }}
            submitLabel="Eliminar"
            onCancel={() => console.log("Cancelar eliminación")}
          />
        </div>
      </main>
    </div>
  );
};

export default withAuth(SettingsPage);