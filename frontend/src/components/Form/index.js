import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Input from '../Input';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';

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

const Form = ({ openModal, setOpenModal, onSubmit }) => {
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openModal]);
  const user = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
      name: '',
      dateOfBirth: '',
      country: '',
      photo: '',
    },
  });

  return (
    <Dialog
      header='Create User'
      visible={openModal}
      modal={true}
      onHide={() => setOpenModal(!openModal)}
      className='lg:w-[50%] w-[75%]'
    >
      <form>
        <Input
          type='text'
          name='Name'
          placeholder='Enter a name'
          formValidation={{ ...register('name') }}
          formInputName='name'
          errorText={errors.name?.message}
          register={register}
          error={errors}
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
          label='Create User'
          type='submit'
          onClick={handleSubmit(onSubmit)}
          style={{ marginTop: '20px', width: '100%' }}
          loading={user.loading}
        />
      </form>
    </Dialog>
  );
};

export default Form;
