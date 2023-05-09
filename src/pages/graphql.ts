import { gql } from '@apollo/client';

export const GET_EMPLOYEES = gql`
  {
    query {
      employeeId
      userId
      employeeName
    }
  }
`;
