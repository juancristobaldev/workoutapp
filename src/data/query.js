import { gql } from "@apollo/client";

export const GET_EXERCISES= gql`
  query getExercises {
    getExercises {
      id
      name
      type
      muscle
      series
    }
  }
`;

export const GET_ROUTINES_AND_USER_BY_TOKEN = gql`
  query {
    getRoutines {
      id
      name
      dones
      timeRecord
    }
    getUser {
      first_name
      last_name
      email
      date
      password
      token
      last_workouts
    }
  }
`;
export const GET_ME = gql`
  query {
    getUser {
      id
      email
      first_name
      last_name
      profile {
        photo
      }
      exercises {
        id
        name
        type
        series
        muscle
      }
      routines {
        id
        name
        dones
        timeRecord
      }
      folders {
        id
      }
    }
  }
`;

export const GET_ROUTINES_BY_TOKEN = gql`
  query getRoutines {
    getRoutines {
      id
      name
      dones
      timeRecord
    }
  }
`;
export const GET_ROUTINE_BY_ID = gql`
  query getRoutineById($id: Int!) {
    getRoutineById(id: $id) {
      id
      name
      dones
      timeRecord
    }
  }
`;

export const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      user
      token
    }
  }
`;

export const GET_USER = gql`
  query getUser {
    getUser {
      user
    }
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($email: String!){
    getUserByEmail(email:$email){
      id
      first_name
      last_name
      email
      password
    }
}
`
export const GET_FOLDER = gql`
  query getFolderById {
    getFolderById(id: Int) {
      id
      name
    }
  }
`;
