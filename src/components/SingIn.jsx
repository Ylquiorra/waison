import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { setUser } from '../redux/user/slice';
import Form from './Form';


const SingIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(setUser({ email: user.email, userId: user.uid, token: user.accessToken }));
        navigate('/account');
      })
      .catch(console.error);
  };
  return <Form buttonText="Войти" handleClick={handleLogin} />;
};

export default SingIn;
