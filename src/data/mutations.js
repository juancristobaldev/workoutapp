import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation createUser($input: UserInput!) {
    createUser(input: $input) {
      errors
      success
      token
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UserUpdateInput!) {
    updateUser(input: $input) {
      errors
      success
    }
  }
`;

export const USER_SIGN_IN = gql`
  mutation userSignIn($input: UserSignInInput!) {
    userSignIn(input: $input) {
      errors
      success
      token
      user
    }
  }
`;

export const CREATE_EXERCISE = gql`
  mutation createExercise($input: CreateExerciseInput!) {
    createExercise(input: $input) {
      errors
      success
      exercise{
        id
        name
        type
        series
        muscle
      }
    }
  }
`;
export const DELETE_EXERCISE = gql`
  mutation deleteExercise($input: DeleteExerciseInput!) {
    deleteExercise(input: $input) {
      errors
      success
      exercises
    }
  }
`;

export const CREATE_ROUTINE = gql`
  mutation createRoutine($input: CreateRoutineInput!) {
    createRoutine(input: $input) {
      routine {
        id
        name
        dones
        flow
        timeRecord
        user{
          id
        }
        exercises{
          id
        }
        cycles{
          cycles
        }
      }
      errors
      success
    }
  }
`;
export const DELETE_ROUTINE = gql`
  mutation deleteRoutine($input: DeleteRoutineInput!) {
    deleteRoutine(input: $input) {
      errors
      success
      user{
        routines{
          id
        }
      }
    }
  }
`;

export const UPDATE_ROUTINE = gql`
  mutation updateRoutine($input: UpdateRoutineInput!) {
    updateRoutine(input: $input) {
      errors
      success
    }
  }
`;
export const CREATE_FOLDER = gql`
  mutation createFolder($input: CreateFolderInput!) {
    createFolder(input: $input) {
      errors
      success
    }
  }
`;

export const UPDATE_FOLDER = gql`
  mutation updateFolder($input: UpdateFolderInput!) {
    updateFolder(input: $input) {
      errors
      success
    }
  }
`;

export const DELETE_FOLDER = gql`
  mutation deleteFolder($input: DeleteFolderInput!) {
    deleteFolder(input: $input) {
      errors
      success
    }
  }
`;

export const USER_SIGN_IN_RRSS = gql`
mutation userSignInRRSS($input: UserSignInRRSSInput!){
  userSignInRRSS(input: $input){
    errors
    success
    user
    token
    register
  }
}
`;