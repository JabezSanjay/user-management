import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import Card from '../components/Card';
import { deleteUser, getUsers } from './helpers';
import Form from '../components/Form';

const Home = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [update, setUpdate] = useState({
    id: '',
    state: false,
  });
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch, user.reload]);

  return (
    <>
      <div className='flex justify-end m-10'>
        <Button
          label='Create User'
          icon='pi pi-plus'
          onClick={() => {
            setOpenModal(!openModal);
            setUpdate({
              state: false,
              id: '',
            });
          }}
        />
        {openModal && (
          <Form
            openModal={openModal}
            setOpenModal={setOpenModal}
            update={update.state}
            id={update.id}
            loading={update.state ? user.updateLoading : user.createLoading}
          />
        )}
      </div>
      {user.readLoading ? (
        <div className='flex justify-center'>
          <i
            className='pi pi-spin pi-spinner text-green-600'
            style={{ fontSize: '2em' }}
          ></i>
        </div>
      ) : (
        <div className='flex flex-wrap justify-evenly gap-6'>
          {user.users.map(
            (user) =>
              !user.isDeleted && (
                <Card
                  key={user._id}
                  id={user._id}
                  image={user?.photo?.secureUrl}
                  name={user.name}
                  age={user.age}
                  email={user.email}
                  openModal={openModal}
                  setOpenModal={setOpenModal}
                  setUpdate={setUpdate}
                  home={true}
                  onDelete={() => {
                    deleteUser(dispatch, user._id);
                  }}
                />
              )
          )}
        </div>
      )}
      {user.users.length === 0 && !user.readLoading && (
        <div className='flex justify-center'>
          <h1>No users found!</h1>
        </div>
      )}
    </>
  );
};

export default Home;
