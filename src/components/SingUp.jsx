import React from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import Form from './Form';
import { setUser } from '../redux/user/slice';

const SingUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth();

  const handleSingUp = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        dispatch(
          setUser({
            email: user.email,
            userId: user.uid,
            token: user.accessToken,
          }),
        );
        navigate('/account');
      })
      .catch(console.error);
  };
  return <Form buttonText="Зарегистрироваться" handleClick={handleSingUp} />;
};

export default SingUp;
