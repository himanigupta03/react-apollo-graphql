import React from 'react';
import { CarCard } from './Car';
import { PersonCard } from './Person';

export const CarsPersonCard = ({ personCars }) => {
  return (
    <div className='mt-5 grid gap-5'>
      {personCars.map((item) => {
        return (
          <PersonCard key={item.id} person={item}>
            <div className=' grid gap-3 p-2'>
              {item.cars.map((car) => (
                <CarCard key={car.id} car={car} peopleData={personCars} />
              ))}
            </div>
          </PersonCard>
        );
      })}
    </div>
  );
};
