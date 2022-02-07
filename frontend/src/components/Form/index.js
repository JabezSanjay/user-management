import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input';
import moment from 'moment';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { createUser, getOneUser, updateUser } from '../../pages/helpers';
import { clearOneUser } from '../../redux/reducers/userReducer';
import { toast } from 'react-toastify';

const schema = yup
  .object({
    email: yup
      .string()
      .email('Enter a valid email!')
      .required('Email is required!'),
    name: yup.string().required('Name is required!'),
    dateOfBirth: yup
      .string('Enter a valid date')
      .required('Date of birth is required!'),
    country: yup.string().required('Country is required!'),
    photo: yup.mixed().required('Photo is required!'),
  })
  .required();

const Form = ({ openModal, setOpenModal, update, id, loading }) => {
  let formData = new FormData();
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    if (update) {
      const fetchData = async () => {
        setUser(await getOneUser(dispatch, id));
      };
      fetchData();
    } else {
      clearOneUser(dispatch);
    }
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    //TODO: NEED TO FIND ANOTHER WAY TO DO THIS
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('dateOfBirth', data.dateOfBirth);
    formData.append('country', data.country);
    formData.append('photo', data['photo'][0]);
    if (update) {
      await updateUser(dispatch, formData, id).then((response) => {
        if (response.success) {
          toast.success(response.message);
          reset();
          setOpenModal(false);
        } else {
          toast.error(response.message);
        }
      });
    } else {
      await createUser(dispatch, formData).then((response) => {
        if (response.success) {
          toast.success(response.message);
          setOpenModal(false);
        } else {
          toast.error(response.message);
        }
      });
    }
  };

  return (
    <Dialog
      header={update ? 'Update User' : 'Create User'}
      visible={user.success || !update ? openModal : false}
      modal={true}
      onHide={() => {
        setOpenModal(!openModal);
        setUser({});
        clearOneUser(dispatch);
      }}
      className='lg:w-[50%] w-[75%]'
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='text'
          name='Name'
          placeholder='Enter a name'
          formValidation={{ ...register('name') }}
          formInputName='name'
          errorText={errors.name?.message}
          register={register}
          error={errors}
          value={update ? user.user?.name : ''}
        />
        <Input
          type='email'
          name='Email'
          placeholder='Enter an email'
          formValidation={{ ...register('email') }}
          formInputName='email'
          errorText={errors.email?.message}
          register={register}
          error={errors}
          value={update ? user.user?.email : ''}
        />
        <Input
          type='text'
          name='Country'
          placeholder='Enter a country'
          formValidation={{ ...register('country') }}
          formInputName='country'
          errorText={errors.country?.message}
          register={register}
          error={errors}
          value={update ? user.user?.country : ''}
        />
        <Input
          type='date'
          name='Date of Birth'
          placeholder='Enter a date of birth'
          formValidation={{ ...register('dateOfBirth') }}
          formInputName='dateOfBirth'
          errorText={errors.dateOfBirth?.message}
          register={register}
          error={errors}
          value={
            update ? moment(user.user?.dateOfBirth).format('YYYY-MM-DD') : ''
          }
        />
        <Input
          type='file'
          placeholder='Upload photo'
          formValidation={{ ...register('photo') }}
          formInputName='photo'
          errorText={errors.photo?.message}
          register={register}
          error={errors}
        />

        <Button
          label={update ? 'Update' : 'Create'}
          type='submit'
          style={{ marginTop: '20px', width: '100%' }}
          loading={loading}
        />
      </form>
    </Dialog>
  );
};

export default Form;
