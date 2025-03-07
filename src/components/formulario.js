import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

function Formulario() {
  const [formValues, setFormValues] = useState({ email: "", password: "", favClass: "1" });
  const [validationStates, setValidationStates] = useState({
    emailState: true,
    passwordState: true
  });
  const [emailValidated, setEmailValidated] = useState(false); // Controla si se debe mostrar el error

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 9 && /[a-zA-Z]/.test(password) && /\d/.test(password);
  };

  const handleEmailChange = (e) => {
    setFormValues({ ...formValues, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormValues({ ...formValues, password });

    // Validar contraseña en tiempo real
    setValidationStates({ ...validationStates, passwordState: validatePassword(password) });
  };

  const handleSelectChange = (e) => {
    setFormValues({ ...formValues, favClass: e.target.value });
  };

  const clickSubmit = () => {
    const isEmailValid = validateEmail(formValues.email);

    setEmailValidated(true); // Indica que el email ya se validó al hacer submit

    setValidationStates((prev) => ({
      ...prev,
      emailState: isEmailValid
    }));

    if (!isEmailValid) {
      return; // No enviar el formulario si el email no es válido
    }

  };

  return (
    <div>
      <h1>Ejemplo de formularios!</h1>

      <Form>
        {/* EMAIL */}
        <Form.Group className="mb-6" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            placeholder="Enter email" 
            onChange={handleEmailChange} 
            value={formValues.email} 
            isInvalid={emailValidated && !validationStates.emailState} // Solo mostrar si se ha hecho submit
          />
          <Form.Control.Feedback type="invalid">
            Your email should follow an established format
          </Form.Control.Feedback>
        </Form.Group>

        {/* PASSWORD */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            onChange={handlePasswordChange} 
            value={formValues.password} 
            isInvalid={!validationStates.passwordState} 
          />
          <Form.Control.Feedback type="invalid">
            Your password should have numbers and letters and should be at least 9 char long
          </Form.Control.Feedback>
        </Form.Group>

        {/* SELECT */}
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Label>Favorite Class</Form.Label>
          <Form.Select onChange={handleSelectChange}>
            <option value="1">ISIS3710</option>
            <option value="2">Programación con tecnologías web</option>
          </Form.Select>
        </Form.Group>

        {/* BOTÓN */}
        <Button variant="primary" onClick={clickSubmit}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Formulario;
