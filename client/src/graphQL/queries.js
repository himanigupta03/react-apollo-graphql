import { gql } from '@apollo/client';


export const GETPERSONWITHCARS = gql`
  query getPersonWithCars($id: ID!) {
    person(id: $id) {
      id
      firstName
      lastName
    }
    carsByPersonId(personId: $id) {
      id
      year
      model
      price
      make
      personId
    }
  }
`;


export const GETCARS = gql`
  query getCars {
    cars {
      id
      year
      model
      price
      make
      personId
    }
  }
`;


export const GETPERSONS = gql`
  query getPeople {
    persons {
      id
      firstName
      lastName
    }
  }
`;


export const GETPERSON = gql`
  query getPerson($id: ID!) {
    person(id: $id) {
      id
      firstName
      lastName
    }
  }
`;