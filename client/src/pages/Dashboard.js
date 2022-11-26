import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GETCARS, GETPERSONS } from '../graphQL/queries';
import { InputField } from '../components/InputField';
import { CarsPersonCard } from '../components/PersonCars';
import { ADDCAR, ADDPERSON } from '../graphQL/mutations';

export const Dashboard = () => {
  const { data: persons } = useQuery(GETPERSONS);
  const { data: cars } = useQuery(GETCARS);

  const [personState, setPersonState] = useState({
    fName: '',
    lName: '',
  });

  const selectOptions = persons?.persons?.map((p) => ({
    ...p,
    label: p.firstName + ' ' + p.lastName,
    value: p.id,
  }))

  const [carState, setCarState] = useState({
    year: '',
    model: '',
    price: '',
    make: '',
    personId: '',
  });

  const [addPerson] = useMutation(ADDPERSON, {
    variables: {
      firstName: personState.fName,
      lastName: personState.lName,
    },

    update(cache, { data: { addPerson } }) {
      const { persons } = cache.readQuery({ query: GETPERSONS });
      cache.writeQuery({
        query: GETPERSONS,
        data: { persons: persons.concat([addPerson]) },
      });
    },
  });

  const [addCar] = useMutation(ADDCAR, {
    variables: {
      year: carState.year,
      model: carState.model,
      price: carState.price,
      make: carState.make,
      personId: carState.personId,
    },

    update(cache, { data: { addCar } }) {
      const { cars } = cache.readQuery({ query: GETCARS });

      cache.writeQuery({
        query: GETCARS,
        data: { cars: cars.concat([addCar]) },
      });
    },
  });

  const submitPerson = (e) => {
    e.preventDefault();
    if (!personState.lName || !personState.fName) {
      alert('Please fill all fields!');
    }

    addPerson();
    setPersonState({
      fName: '',
      lName: '',
    });
  };

  const submitCar = (e) => {
    e.preventDefault();
    if (
      !carState.year ||
      !carState.make ||
      !carState.model ||
      !carState.price ||
      !carState.personId
    ) {
      alert('Please fill all fields!');
    }
    addCar();
    setCarState({
      year: '',
      model: '',
      price: '',
      make: '',
      personId: '',
    });
  };

  const updatePerson = (e) => {
    setPersonState({ ...personState, [e.target.name]: e.target.value });
  };
  const updateCar = (e) => {
    setCarState({ ...carState, [e.target.name]: e.target.value });
  };

  const carsWithPersons = () => {
    let personCars;

    if (persons && cars) {
      personCars = persons.persons.map((person) => {
        return {
          ...person,
          cars: cars.cars.filter((car) => person.id === car.personId),
        };
      });
    }
    return <CarsPersonCard personCars={personCars} />;
  };

  return (
    <div>
      <section style={{ border: '1px solid lightgray', margin: '30px', padding: '20px' }}>
        <h2 className='font-bold uppercase'>'Add Person'</h2>

        <form onSubmit={submitPerson} className='grid gap-3 mt-4'>
          <InputField
            label={'First Name'}
            name={'fName'}
            value={personState.fName}
            handleChange={updatePerson}
          />
          <InputField
            label={'Last Name'}
            name={'lName'}
            value={personState.lName}
            handleChange={updatePerson}
          />
          <div className='grid grid-cols-9'>
            <div></div>
            <button type='submit' style={{ backgroundColor: "#f7a854", borderRadius: '5px', padding: '5px' }}>
              Add Person
            </button>
          </div>
        </form>
      </section>

      {persons && persons.persons?.length > 0 && (
        <section style={{ border: '1px solid lightgray', margin: '30px', padding: '20px' }}>
          <h2 className='font-bold uppercase'>'Add Car'</h2>
          <form className='grid gap-3 mt-4' onSubmit={submitCar}>
            <InputField
              label={'Year'}
              type='number'
              name={'year'}
              value={carState.year}
              handleChange={updateCar}
            />
            <InputField
              label={'Make'}
              name={'make'}
              value={carState.make}
              handleChange={updateCar}
            />
            <InputField
              label={'Model'}
              name={'model'}
              value={carState.model}
              handleChange={updateCar}
            />
            <InputField
              label={'Price'}
              name={'price'}
              type='number'
              value={carState.price}
              handleChange={updateCar}
            />

            <div className='grid grid-cols-3'>
              <label className='self-center'>owner</label>
              <select
                className='col-span-2 border border-gray-200 border-solid rounded-l px-2 py-1'
                name='personId'
                onChange={updateCar}
                value={carState.personId}
              >
                <option>-- select person --</option>
                {selectOptions.map((o) => {
                  return (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  );
                })}
              </select>
            </div>

            <div className='grid grid-cols-9'>
              <div></div>
              <button type='submit' style={{ backgroundColor: "#f7a854", borderRadius: '5px', padding: '5px' }}>
                Add Car
              </button>
            </div>
          </form>
        </section>
      )}

      <section style={{ border: '1px solid lightgray', margin: '30px', padding: '20px' }}>
        <h2 className='font-bold uppercase'>'People and Cars'</h2>
        {persons && cars && carsWithPersons()}
      </section>
    </div>
  );
};
