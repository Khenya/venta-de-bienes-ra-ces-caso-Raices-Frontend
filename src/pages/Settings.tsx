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

const PropertyPage = () => {
  const searchParams = useSearchParams();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

        // Obtener roles
        const rolesRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/roles/`);
        if (!rolesRes.ok) throw new Error('Error al cargar roles');
        const rolesData = await rolesRes.json();
        setRoles(rolesData.map((r: any) => ({
          id: r.id,
          name: r.name,
        })));
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
    options: users.map((u) => ({ label: u.name, value: u.id }))
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
      name: "password",
      label: "Contraseña",
      type: "password" as const,
      required: true
    }, {
      name: "confirmPassword",
      label: "Confirma la contraseña",
      type: "password" as const,
      required: true
    }, {
      name: "roleId",
      label: "Rol",
      type: "select" as const,
      required: true,
      options: roles.map((r) => ({ label: r.name, value: r.id }))
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
        }}
        className="w-full bg-gray-50"
      >
        {loading && <div className="spinner-border text-primary" role="status"></div>}
        {error && <div className="alert alert-danger">{error}</div>}

        <div className={styles.cardGrid}>
          <UserForm
            title="Cambiar contraseña de un usuario"
            fields={fields}
            onSubmit={async (values) => {
              try {
                const selectedUser = users.find(u => u.id === Number(values.userId));
                if (!selectedUser) {
                  throw new Error("Usuario no encontrado");
                }
              
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${values.userId}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    username: selectedUser.name,
                    password: values.password,
                    rol_id: selectedUser.role
                  })
                });
                
                if (!res.ok) throw new Error('Error al cambiar contraseña');
                const data = await res.json();
                console.log("Respuesta cambiar contraseña:", data);
                alert('Contraseña cambiada exitosamente');
              } catch (err) {
                alert(handleError(err));
              }
            }}
            submitLabel="Aplicar"
            onCancel={() => console.log("Cancelar cambio")}
          />

          <UserForm
            title="Crear un nuevo usuario"
            fields={fields2}
            onSubmit={async (values) => {
              try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    username: values.username,
                    password: values.password,
                    role_id: Number(values.roleId)
                  })
                });
                
                if (!res.ok) {
                  const errorData = await res.json();
                  throw new Error(errorData.error || 'Error al crear usuario');
                }
                
                const data = await res.json();
                alert('Usuario creado exitosamente');
                
                const usersRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/`);
                const usersData = await usersRes.json();
                setUsers(usersData.map((u: any) => ({
                  id: u.user_id,
                  name: u.username,
                  role: u.role_id,
                })));
              } catch (err) {
                alert(handleError(err));
              }
            }}
            submitLabel="Crear"
            onCancel={() => console.log("Cancelar creación")}
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
                console.log("Respuesta eliminar usuario:", data);
                alert('Usuario eliminado exitosamente');
                
                setUsers(users.filter(u => u.id !== Number(values.userId)));
              } catch (err) {
                alert(handleError(err));
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

export default withAuth(PropertyPage);