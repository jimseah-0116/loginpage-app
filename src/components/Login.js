import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AuthContext } from '../context/AuthContext';

// Define validation schema using Yup
const LoginSchema = Yup.object().shape({
    username: Yup.string()
        .required('Username is required'),
    password: Yup.string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
});

const Login = () => {
    const { login, isAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    // Redirect to dashboard if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    // Handle form submission
    const handleSubmit = async (values, { setSubmitting }) => {
        setLoginError('');
        const result = await login(values.username, values.password);

        if (result.success) {
            navigate('/dashboard');
        } else {
            setLoginError(result.message);
        }

        setSubmitting(false);
    };

    return (
        <div className="login-container">
            <div className="login-form-wrapper">
                <h1>Enter your login details!</h1>
                {loginError && <div className="error-message">{loginError}</div>}

                <Formik
                    initialValues={{ username: '', password: '' }}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field
                                    type="text"
                                    name="username"
                                    id="username"
                                    className={errors.username && touched.username ? 'input-error' : ''}
                                />
                                <ErrorMessage name="username" component="div" className="error-message" />
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    type="password"
                                    name="password"
                                    id="password"
                                    className={errors.password && touched.password ? 'input-error' : ''}
                                />
                                <ErrorMessage name="password" component="div" className="error-message" />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="login-button"
                            >
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;