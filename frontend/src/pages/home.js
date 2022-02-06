import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import Card from '../components/Card';
import { createUser, getUsers } from './helpers';
import Form from '../components/Form';
import { toast } from 'react-toastify';

const Home = () => {
  let formData = new FormData();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch, user.reload]);
  const onSubmit = async (data) => {
    //TODO: NEED TO FIND ANOTHER WAY TO DO THIS
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('dateOfBirth', data.dateOfBirth);
    formData.append('country', data.country);
    formData.append('photo', data['photo'][0]);
    await createUser(dispatch, formData).then((response) => {
      if (response.success) {
        toast.success(response.message);
        setOpenModal(false);
      } else {
        toast.error(response.message);
      }
    });
  };
  return (
    <>
      <div className='flex justify-end m-10'>
        <Button
          label='Create User'
          icon='pi pi-plus'
          onClick={() => {
            setOpenModal(!openModal);
          }}
        />
        <Form
          openModal={openModal}
          setOpenModal={setOpenModal}
          onSubmit={onSubmit}
        />
      </div>
      <div className='flex flex-wrap justify-evenly gap-6'>
        {user.users.map((user) => (
          <Card
            key={user._id}
            image={user?.photo?.secureUrl}
            name={user.name}
            age={user.age}
            email={user.email}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
