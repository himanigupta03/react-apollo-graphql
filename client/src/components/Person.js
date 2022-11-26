import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { InputField } from './InputField';
import { Link } from 'react-router-dom';
import { GETPERSONS } from '../graphQL/queries';
import { DELETEPERSON, UPDATEPERSON } from '../graphQL/mutations';

export const PersonCard = ({ person, children }) => {
  const [personValues, setPersonValues] = useState({
    firstName: person.firstName,
    lastName: person.lastName,
  });
  const [changed, setchanged] = useState(false);

  const [deletePerson] = useMutation(DELETEPERSON, {
    variables: { id: person.id },
    update(cache, { data: { deletePerson } }) {
      const { persons } = cache.readQuery({ query: GETPERSONS });

      cache.writeQuery({
        query: GETPERSONS,
        data: {
          persons: persons.filter((person) => person.id !== deletePerson.id),
        },
      });
    },
  });

  const [updatePerson] = useMutation(UPDATEPERSON, {
    variables: {
      id: person.id,
      firstName: personValues.firstName,
      lastName: personValues.lastName,
    },
    refetchQueries: [{ query: GETPERSONS, variables: { id: person.id } }],
  });

  const handlePersonChange = (e) => {
    setPersonValues({ ...personValues, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!personValues.lastName || !personValues.firstName) {
      alert('Please enter all the fields');
    }
    updatePerson();
    setchanged(false);
  };

  if (changed) {
    return (
      <div>
        <h3 className='p-1 text-white'>
          {personValues.firstName} {personValues.lastName}
        </h3>

        <form onSubmit={onSubmit} className='grid gap-3 mt-4'>
          <InputField
            label={'First Name'}
            name={'firstName'}
            value={personValues.firstName}
            handleChange={handlePersonChange}
          />
          <InputField
            label={'Last Name'}
            name={'lastName'}
            value={personValues.lastName}
            handleChange={handlePersonChange}
          />
          <div className='grid grid-cols-2'>
            <button onClick={updatePerson} style={{ border: '1px solid lightgray', margin: '5px', borderRadius: '5px', backgroundColor: '#f7a854' }}>
              SAVE
            </button>
            <button
              style={{ border: '1px solid lightgray', margin: '5px', borderRadius: '5px' }}
              onClick={() => setchanged(false)}
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    );
  } else {
    return (
      <div className='border'>
        <h3 className='p-1 text-black'>
          PERSON:- {person.firstName} {person.lastName}
        </h3>

        {children}

        <div className='border grid grid-cols-3'>
          <button
            style={{ border: '1px solid lightgray', margin: '5px', borderRadius: '5px' }}
            onClick={() => {
              setchanged(true);
            }}
          >

            EDIT
          </button>

          <button onClick={deletePerson} style={{ border: '1px solid lightgray', margin: '5px', borderRadius: '5px', color: 'red' }}>
            DELETE
          </button>

          <Link
            style={{ border: '1px solid lightgray', margin: '5px', borderRadius: '5px', textAlign: 'center' }}
            to={`/person/${person.id}`}
          >

            LEARN MORE
          </Link>

        </div>
      </div>
    );
  }
};
