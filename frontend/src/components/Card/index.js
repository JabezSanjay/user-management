import React from 'react';
import { Button } from 'primereact/button';
import { useSelector } from 'react-redux';

const Card = ({
  image,
  name,
  age,
  email,
  setUpdate,
  setOpenModal,
  id,
  onDelete,
  onRestore,
  home,
}) => {
  const user = useSelector((state) => state.user);
  return (
    <div className='m-4 px-8 py-4 mx-auto mt-16 bg-white rounded-lg shadow-lg'>
      <div className='flex justify-center -mt-16 md:justify-end'>
        <img
          className='object-cover w-20 h-20 border-2 border-green-700 rounded-full'
          alt='Testimonial avatar'
          src={`${image}`}
        />
      </div>

      <h2 className='mt-2 text-lg font-semibold text-gray-700 md:mt-0 md:text-3xl'>
        {name} <span className='text-green-600 text-lg'>{age}</span>
      </h2>
      <p className='text-green-600'>{email}</p>

      {home ? (
        <div className='flex justify-around gap-x-6 mt-4'>
          <Button
            label='Update'
            icon='pi pi-check'
            onClick={() => {
              setUpdate({
                state: true,
                id: id,
              });
              setOpenModal(true);
            }}
            loading={user.readLoading}
          />
          <Button
            label='Delete'
            icon='pi pi-minus-circle'
            className='p-button-danger'
            loading={user.deleteLoading}
            onClick={onDelete}
          />
        </div>
      ) : (
        <div className='flex justify-around gap-x-6 mt-4'>
          <Button
            label='View'
            icon='pi pi-eye'
            loading={user.deleteLoading}
            onClick={onRestore}
            disabled
          />
          <Button
            label='Restore'
            icon='pi pi-check'
            loading={user.deleteLoading}
            onClick={onRestore}
          />
        </div>
      )}
    </div>
  );
};

export default Card;
