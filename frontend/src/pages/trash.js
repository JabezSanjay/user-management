import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import Card from '../components/Card';
import { getAllDeletedUsers, restoreUser } from './helpers';

const Trash = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllDeletedUsers(dispatch);
  }, [dispatch, user.reload]);
  return (
    <>
      <Button
        label='back'
        icon='pi pi-arrow-left'
        onClick={() => navigate(-1)}
        style={{ margin: '3rem' }}
      />
      <div className='flex flex-wrap justify-evenly gap-6'>
        {user.users.map(
          (user) =>
            user.isDeleted && (
              <Card
                key={user._id}
                id={user._id}
                image={user?.photo?.secureUrl}
                name={user.name}
                age={user.age}
                email={user.email}
                home={false}
                onRestore={() => restoreUser(dispatch, user._id)}
              />
            )
        )}
      </div>
    </>
  );
};

export default Trash;
