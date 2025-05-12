import React, { useState } from "react";

interface FieldConfig {
  name: string;
  label: string;
  type: 'text' | 'password' | 'select' | 'email' | 'number';
  required: boolean;
  options?: {
    label: string;
    value: string | number; 
  }[];
}

interface UserFormProps {
  title: string;
  fields: FieldConfig[];
  onSubmit: (values: Record<string, string>) => void;
  onCancel?: () => void;
  submitLabel?: string;
}

const getPasswordValidation = (password: string = "") => {
  const validations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };

  const isValid = Object.values(validations).every(Boolean);

  return {
    ...validations,
    isValid,
  };
};

const UserForm: React.FC<UserFormProps> = ({
  title,
  fields,
  onSubmit,
  onCancel,
  submitLabel = "Guardar",
}) => {
  const initialState = fields.reduce((acc, field) => {
    acc[field.name] = "";
    return acc;
  }, {} as Record<string, string>);

  const [values, setValues] = useState(initialState);
  const [error, setError] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = () => {
    for (const field of fields) {
      if (field.required && !values[field.name]) {
        setError(`El campo "${field.label}" es obligatorio.`);
        return;
      }
    }

    const password = values["password"];
    const confirm = values["confirmPassword"];

    if (password || confirm) {
      const validation = getPasswordValidation(password);
      if (!validation.isValid) {
        setError("La contraseña no cumple los requisitos.");
        return;
      }

      if (password !== confirm) {
        setError("Las contraseñas no coinciden.");
        return;
      }
    }

    setError("");
    onSubmit(values);
  };

  const handleCancel = () => {
    setValues(initialState);
    setTouched({});
    setError("");
    onCancel?.();
  };

  return (
    <div className="card shadow-sm mb-4" style={{ border: "1px solid #8C756A" }}>
      <div className="card-header text-white text-center fw-bold" style={{ backgroundColor: "#8C756A" }}>
        {title}
      </div>
      <div className="card-body">
        <form>
          <div className="row g-3">
            {fields.map((field) => {
              const value = values[field.name];
              const isTouched = touched[field.name];
              const isPasswordField = field.name === "password";
              const isConfirmField = field.name === "confirmPassword";
              const passwordValidation = getPasswordValidation(values["password"]);

              let isInvalid = false;
              let showValid = false;

              if (field.required && isTouched && !value) {
                isInvalid = true;
              }

              if (isPasswordField && isTouched) {
                isInvalid = !passwordValidation.isValid;
                showValid = passwordValidation.isValid;
              }

              if (isConfirmField && isTouched) {
                isInvalid = values["password"] !== value;
                showValid = values["password"] === value;
              }

              return (
                <div key={field.name} className="col-md-6">
                  <label htmlFor={field.name} className="form-label">{field.label}</label>

                  {field.type === "select" ? (
                    <select
                      id={field.name}
                      className={`form-select ${isInvalid ? "is-invalid" : showValid ? "is-valid" : ""}`}
                      value={value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                    >
                      <option value="">Seleccionar {field.label.toLowerCase()}</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={field.type}
                      className={`form-control ${isInvalid ? "is-invalid" : showValid ? "is-valid" : ""}`}
                      id={field.name}
                      value={value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      required={field.required}
                    />
                  )}

                  {isInvalid && (
                    <div className="invalid-feedback">
                      {isPasswordField ? "La contraseña no es segura." : "Este campo es obligatorio."}
                    </div>
                  )}

                  {showValid && (
                    <div className="valid-feedback">Correcto.</div>
                  )}

                  {isPasswordField && isTouched && (
                    <ul className="text-muted small mt-2 mb-0 ps-3">
                      <li style={{ color: passwordValidation.length ? "green" : "red" }}>Mínimo 8 caracteres</li>
                      <li style={{ color: passwordValidation.uppercase ? "green" : "red" }}>Una mayúscula</li>
                      <li style={{ color: passwordValidation.lowercase ? "green" : "red" }}>Una minúscula</li>
                      <li style={{ color: passwordValidation.number ? "green" : "red" }}>Un número</li>
                    </ul>
                  )}
                </div>
              );
            })}
          </div>

          {error && <div className="alert alert-danger mt-3">{error}</div>}

          <div className="d-flex justify-content-between mt-4">
            {onCancel && (
              <button type="button" className="btn btn-outline-secondary" onClick={handleCancel}>
                Cancelar
              </button>
            )}
            <button type="button" className="btn btn-secondary" onClick={handleSubmit}>
              {submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;