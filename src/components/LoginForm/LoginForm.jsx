import React from 'react';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/auth/operation';



const LoginForm = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: { email: '', password: '' },
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });


  return (
    <form onSubmit={formik.handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={formik.handleChange}
        value={formik.values.password}
      />
      <button type="submit">Login</button>
    </form>
  );
};


export default LoginForm;
