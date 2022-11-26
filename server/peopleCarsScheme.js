import pkg from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLSchema,
  GraphQLList,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

const { find, remove, filter } = pkg;

const cars = [
  {
    id: '1',
    year: '2019',
    make: 'Toyota',
    model: 'Corolla',
    price: '40000',
    personId: '1',
  },
  {
    id: '2',
    year: '2018',
    make: 'Lexus',
    model: 'LX 600',
    price: '13000',
    personId: '1',
  },
  {
    id: '3',
    year: '2017',
    make: 'Honda',
    model: 'Civic',
    price: '20000',
    personId: '1',
  },
  {
    id: '4',
    year: '2019',
    make: 'Acura ',
    model: 'MDX',
    price: '60000',
    personId: '2',
  },
  {
    id: '5',
    year: '2018',
    make: 'Ford',
    model: 'Focus',
    price: '35000',
    personId: '2',
  },
  {
    id: '6',
    year: '2017',
    make: 'Honda',
    model: 'Pilot',
    price: '45000',
    personId: '2',
  },
  {
    id: '7',
    year: '2019',
    make: 'Volkswagen',
    model: 'Golf',
    price: '40000',
    personId: '3',
  },
  {
    id: '8',
    year: '2018',
    make: 'Kia',
    model: 'Sorento',
    price: '45000',
    personId: '3',
  },
  {
    id: '9',
    year: '2017',
    make: 'Volvo',
    model: 'XC40',
    price: '55000',
    personId: '3',
  },
];

let people = [
  {
    id: '1',
    firstName: 'Bill',
    lastName: 'Gates',
  },
  {
    id: '2',
    firstName: 'Steve',
    lastName: 'Jobs',
  },
  {
    id: '3',
    firstName: 'Linux',
    lastName: 'Torvalds',
  },
];

const Car = new GraphQLObjectType({
  name: 'Car',
  fields: () => ({
    id: { type: GraphQLID },
    year: { type: GraphQLID },
    make: { type: GraphQLID },
    model: { type: GraphQLID },
    price: { type: GraphQLID },
    personId: { type: GraphQLID },
  }),
});


const Person = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLID },
    firstName: { type: GraphQLString },
    lastName: { type: GraphQLString },
  }),
});



const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    persons: {
      type: new GraphQLList(Person),
      resolve() {
        return people;
      },
    },
    person: {
      type: Person,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return find(people, { id: args.id });
      },
    },
    car: {
      type: Car,
      args: { id: { type: GraphQLID } },
      resolve(_, args) {
        return find(cars, { id: args.id });
      },
    },
    carsByPersonId: {
      type: new GraphQLList(Car),
      args: { personId: { type: GraphQLID } },
      resolve(_, args) {
        return filter(cars, { personId: args.personId });
      },
    },
    cars: {
      type: new GraphQLList(Car),
      resolve() {
        return cars;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    deletePerson: {
      type: Person,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        const person = find(people, { id: args.id });
        if (!person) {
          throw new Error(`Not found!`);
        }
        remove(people, { id: args.id });
        remove(cars, { personId: args.id });

        return { ...person, cars: cars };
      },
    },
    addPerson: {
      type: Person,
      args: {
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        const person = { ...args, id: uuidv4() };
        people.push(person);

        return person;
      },
    },
    addCar: {
      type: Car,
      args: {
        year: { type: new GraphQLNonNull(GraphQLString) },
        make: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        personId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        const car = { ...args, id: uuidv4() };
        cars.push(car);
        return car;
      },
    },
    updatePerson: {
      type: Person,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        lastName: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(_, args) {
        const person = find(people, {
          id: args.id,
        });
        if (!person) {
          throw new Error(`Not found!`);
        }
        person.firstName = args.firstName;
        person.lastName = args.lastName;

        return person;
      },
    },
    updateCar: {
      type: Car,
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
        year: { type: new GraphQLNonNull(GraphQLString) },
        make: { type: new GraphQLNonNull(GraphQLString) },
        model: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        personId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(_, args) {
        const car = find(cars, {
          id: args.id,
        });
        if (!car) {
          throw new Error(`Not found!`);
        }
        car.year = args.year;
        car.make = args.make;
        car.model = args.model;
        car.price = args.price;
        car.personId = args.personId;

        return car;
      },
    },
    deleteCar: {
      type: Car,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(_, args) {
        const car = find(cars, { id: args.id });
        if (!car) {
          throw new Error(`Not found!`);
        }
        remove(cars, { id: args.id });
        return car;
      },
    },
  },
});

export default new GraphQLSchema({

  mutation: Mutation,
  query: Query,

});
