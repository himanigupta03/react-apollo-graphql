import React, { useState } from 'react';
import { useMutation } from '@apollo/client';

import { GETCARS } from '../graphQL/queries';
import { InputField } from './InputField';
import { DELETECAR, UPDATECAR } from '../graphQL/mutations';


export const CarCard = ({ car, peopleData = [] }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const [carValues, setCarValues] = useState({
    model: car.model,
    make: car.make,
    year: car.year,
    price: car.price,
    personId: car.personId,
  });

  const [deleteCar] = useMutation(DELETECAR, {
    variables: { id: car.id },
    refetchQueries: [{ query: GETCARS, variables: { id: car.id } }],
  });

  const [updateCar] = useMutation(UPDATECAR, {
    variables: {
      id: car.id,
      model: carValues.model,
      make: carValues.make,
      year: carValues.year,
      price: carValues.price,
      personId: carValues.personId,
    },
    refetchQueries: [{ query: GETCARS, variables: { id: car.id } }],
  });


  const onSubmit = (e) => {
    e.preventDefault();
    updateCar();
    setIsUpdating(false);
  };


  const handleCarChange = (e) => {
    setCarValues({ ...carValues, [e.target.name]: e.target.value });
  };

  const selectOptions = peopleData &&
    peopleData.map((p) => ({
      ...p,
      label: p.firstName + ' ' + p.lastName,
      value: p.id,
    }));


  if (isUpdating) {
    return (
      <div className='p-2'>
        <form onSubmit={onSubmit} className='grid gap-3 mt-4'>
          <InputField
            label={'Model'}
            name={'model'}
            value={carValues.model}
            handleChange={handleCarChange}
          />
          <InputField
            label={'Make'}
            name={'make'}
            value={carValues.make}
            handleChange={handleCarChange}
          />
          <InputField
            label={'Year'}
            type='number'
            name={'year'}
            value={carValues.year}
            handleChange={handleCarChange}
          />
          <InputField
            label={'Price'}
            name={'price'}
            type='number'
            value={carValues.price}
            handleChange={handleCarChange}
          />

          <div className='grid grid-cols-3'>
            <label className='self-center'>Choose an owner</label>
            <select
              className='col-span-2 border border-gray-200 border-solid rounded-l px-2 py-1'
              name='personId'
              onChange={handleCarChange}
              value={carValues.personId}
            >

              <option> Select Person </option>
              {selectOptions.map((o) => {
                return (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                );
              })}
            </select>
          </div>

          <div className='grid grid-cols-2'>
            <button style={{ border: '1px solid lightgray', margin: '5px', borderRadius: '5px', backgroundColor: '#f7a854', }} type='submit'>
              SAVE
            </button>

            <button
              style={{ border: '1px solid lightgray', margin: '5px', borderRadius: '5px', backgroundColor: '#fff', }}
              onClick={() => setIsUpdating(false)}
            >
              CANCEL
            </button>

          </div>
        </form>
      </div>
    );
  }
  return (
    <div className='p-2 border' style={{ backgroundColor: '#e3e5e4', borderRadius: '5px' }}>
      <ul className='grid gap-3 mt-4'>
        <li style={{ backgroundColor: '#fff', borderRadius: '5px', padding: '5px' }}>{car.model}</li>
        <li>{car.make}</li>
        <li>{car.year}</li>
        <li>$ {car.price}</li>
      </ul>
      <div className='border grid grid-cols-2'>

        <button
          style={{ border: '1px solid lightgray', margin: '5px', borderRadius: '5px', backgroundColor: '#fff', }}
          onClick={() => {
            setIsUpdating(true);
          }}
        >
          EDIT
        </button>

        <button style={{ border: '1px solid lightgray', margin: '5px', borderRadius: '5px', backgroundColor: '#fff', color: 'red' }} onClick={deleteCar}>
          DELETE
        </button>

      </div>
    </div>
  );
};
