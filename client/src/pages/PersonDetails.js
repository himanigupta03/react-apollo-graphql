import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import React from 'react';
import { GETPERSONWITHCARS } from '../graphQL/queries';

export const PersonDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: personWithCars } = useQuery(GETPERSONWITHCARS, {
    variables: { id },
  });

  if (personWithCars) {
    return (
      <section style={{ border: '1px solid lightgray', margin: '30px', padding: '20px' }}>
        <h2 className='font-bold uppercase'>{`Person:- ${personWithCars.person.firstName} ${personWithCars.person.lastName}`}</h2>
        {personWithCars.carsByPersonId.map((car) => (
          <ul className='grid gap-3 border p-1' key={car.id}>
            <li style={{ backgroundColor: 'lightgray', borderRadius: '5px', padding: '5px' }}>{car.model}</li>
            <li>{car.make}</li>
            <li>{car.year}</li>
            <li>$ {car.price}</li>
          </ul>
        ))}
        <button
          style={{ border: '1px solid lightgray', margin: '5px', borderRadius: '5px', padding: '10px' }} onClick={() => navigate(-1)} styles='bg-green-400'>
          Back
        </button>
      </section>
    );
  } else {
    return <p>fetching ...</p>;
  }
};