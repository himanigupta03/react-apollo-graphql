import { gql } from '@apollo/client';

const ADDCAR = gql`
  mutation addCar(
    $year: String!
    $model: String!
    $price: String!
    $make: String!
    $personId: ID!
  ) {
    addCar(
      year: $year
      model: $model
      price: $price
      make: $make
      personId: $personId
    ) {
      id
      year
      model
      price
      make
      personId
    }
  }
`;

const UPDATECAR = gql`
  mutation updateCar(
    $id: ID!
    $year: String!
    $model: String!
    $price: String!
    $make: String!
    $personId: ID!
  ) {
    updateCar(
      id: $id
      year: $year
      model: $model
      price: $price
      make: $make
      personId: $personId
    ) {
      id
      year
      model
      price
      make
      personId
    }
  }
`;

const DELETECAR = gql`
  mutation deleteCar($id: ID!) {
    deleteCar(id: $id) {
      year
      model
      price
      make
      personId
    }
  }
`;


const ADDPERSON = gql`
  mutation addPerson($firstName: String!, $lastName: String!) {
    addPerson(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;


const UPDATEPERSON = gql`
  mutation updatePerson($id: ID!, $firstName: String!, $lastName: String!) {
    updatePerson(id: $id, firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;


const DELETEPERSON = gql`
  mutation deletePerson($id: ID!) {
    deletePerson(id: $id) {
      id
      firstName
      lastName
    }
  }
`;


export {
  DELETECAR,
  ADDCAR,
  UPDATECAR,
  DELETEPERSON,
  ADDPERSON,
  UPDATEPERSON,
};
