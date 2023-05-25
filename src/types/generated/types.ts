import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type IAttendInfo = {
  __typename?: 'AttendInfo';
  endAt?: Maybe<Scalars['Date']>;
  startAt?: Maybe<Scalars['Date']>;
  workingType?: Maybe<IWorkingType>;
};

export type IAuthInfo = {
  __typename?: 'AuthInfo';
  accessToken?: Maybe<Scalars['String']>;
  endAt?: Maybe<Scalars['Date']>;
  refreshToken?: Maybe<Scalars['String']>;
  startAt?: Maybe<Scalars['Date']>;
  workingType?: Maybe<IWorkingType>;
};

export type IDepartment = {
  __typename?: 'Department';
  departmentId?: Maybe<Scalars['ID']>;
  departmentName?: Maybe<Scalars['String']>;
};

export type IEmployee = {
  __typename?: 'Employee';
  department?: Maybe<IDepartment>;
  employeeId?: Maybe<Scalars['ID']>;
  employeeName?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
};

export type IEmployeeInput = {
  departmentId?: InputMaybe<Scalars['Int']>;
  employeeName?: InputMaybe<Scalars['String']>;
  passwd?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type IEmployeeWorking = {
  __typename?: 'EmployeeWorking';
  department?: Maybe<IDepartment>;
  employeeId?: Maybe<Scalars['Int']>;
  employeeName?: Maybe<Scalars['String']>;
  endAt?: Maybe<Scalars['Date']>;
  startAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
  workingDate?: Maybe<Scalars['Date']>;
  workingType?: Maybe<IWorkingType>;
};

export type IMutation = {
  __typename?: 'Mutation';
  addEmployee?: Maybe<IEmployee>;
  authenticate?: Maybe<IAuthInfo>;
  goToWork?: Maybe<IEmployeeWorking>;
  leaveWork?: Maybe<IEmployeeWorking>;
  refresh?: Maybe<ITokens>;
  validate?: Maybe<IAttendInfo>;
};

export type IMutationAddEmployeeArgs = {
  input?: InputMaybe<IEmployeeInput>;
};

export type IMutationAuthenticateArgs = {
  passwd?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type IMutationRefreshArgs = {
  refreshToken?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type IQuery = {
  __typename?: 'Query';
  departments?: Maybe<Array<Maybe<IDepartment>>>;
  employeeWorking?: Maybe<Array<Maybe<IEmployeeWorking>>>;
  employees?: Maybe<Array<Maybe<IEmployee>>>;
};

export type IQueryEmployeeWorkingArgs = {
  dt?: InputMaybe<Scalars['String']>;
};

export type ISubscription = {
  __typename?: 'Subscription';
  attended?: Maybe<IEmployeeWorking>;
};

export type ITokens = {
  __typename?: 'Tokens';
  accessToken?: Maybe<Scalars['String']>;
  refreshToken?: Maybe<Scalars['String']>;
};

export enum IWorkingType {
  FullDayoff = 'FULL_DAYOFF',
  HalfDayoff = 'HALF_DAYOFF',
  Military = 'MILITARY',
  Sick = 'SICK',
  Work = 'WORK',
}

export type IAuthenticateMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  passwd?: InputMaybe<Scalars['String']>;
}>;

export type IAuthenticateMutation = {
  __typename?: 'Mutation';
  authenticate?: {
    __typename?: 'AuthInfo';
    accessToken?: string | null;
    refreshToken?: string | null;
    startAt?: any | null;
    endAt?: any | null;
    workingType?: IWorkingType | null;
  } | null;
};

export type IValidateMutationVariables = Exact<{ [key: string]: never }>;

export type IValidateMutation = {
  __typename?: 'Mutation';
  validate?: { __typename?: 'AttendInfo'; startAt?: any | null; endAt?: any | null; workingType?: IWorkingType | null } | null;
};

export type IRefreshMutationVariables = Exact<{
  userId?: InputMaybe<Scalars['String']>;
  refreshToken?: InputMaybe<Scalars['String']>;
}>;

export type IRefreshMutation = {
  __typename?: 'Mutation';
  refresh?: { __typename?: 'Tokens'; accessToken?: string | null; refreshToken?: string | null } | null;
};

export type IGoToWorkMutationVariables = Exact<{ [key: string]: never }>;

export type IGoToWorkMutation = {
  __typename?: 'Mutation';
  goToWork?: {
    __typename?: 'EmployeeWorking';
    employeeId?: number | null;
    userId?: string | null;
    employeeName?: string | null;
    workingDate?: any | null;
    workingType?: IWorkingType | null;
    startAt?: any | null;
    endAt?: any | null;
    department?: { __typename?: 'Department'; departmentId?: string | null; departmentName?: string | null } | null;
  } | null;
};

export type ILeaveWorkMutationVariables = Exact<{ [key: string]: never }>;

export type ILeaveWorkMutation = {
  __typename?: 'Mutation';
  leaveWork?: {
    __typename?: 'EmployeeWorking';
    employeeId?: number | null;
    userId?: string | null;
    employeeName?: string | null;
    workingDate?: any | null;
    workingType?: IWorkingType | null;
    startAt?: any | null;
    endAt?: any | null;
    department?: { __typename?: 'Department'; departmentId?: string | null; departmentName?: string | null } | null;
  } | null;
};

export type IGetEmployeeQueryVariables = Exact<{ [key: string]: never }>;

export type IGetEmployeeQuery = {
  __typename?: 'Query';
  employees?: Array<{
    __typename?: 'Employee';
    employeeId?: string | null;
    userId?: string | null;
    employeeName?: string | null;
    department?: { __typename?: 'Department'; departmentName?: string | null } | null;
  } | null> | null;
};

export type IGetEmployeeWorkingQueryVariables = Exact<{
  dt?: InputMaybe<Scalars['String']>;
}>;

export type IGetEmployeeWorkingQuery = {
  __typename?: 'Query';
  employeeWorking?: Array<{
    __typename?: 'EmployeeWorking';
    employeeId?: number | null;
    employeeName?: string | null;
    userId?: string | null;
    workingDate?: any | null;
    workingType?: IWorkingType | null;
    startAt?: any | null;
    endAt?: any | null;
    department?: { __typename?: 'Department'; departmentId?: string | null; departmentName?: string | null } | null;
  } | null> | null;
};

export const AuthenticateDocument = gql`
  mutation authenticate($userId: String, $passwd: String) {
    authenticate(userId: $userId, passwd: $passwd) {
      accessToken
      refreshToken
      startAt
      endAt
      workingType
    }
  }
`;
export type IAuthenticateMutationFn = Apollo.MutationFunction<IAuthenticateMutation, IAuthenticateMutationVariables>;

/**
 * __useAuthenticateMutation__
 *
 * To run a mutation, you first call `useAuthenticateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authenticateMutation, { data, loading, error }] = useAuthenticateMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      passwd: // value for 'passwd'
 *   },
 * });
 */
export function useAuthenticateMutation(baseOptions?: Apollo.MutationHookOptions<IAuthenticateMutation, IAuthenticateMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IAuthenticateMutation, IAuthenticateMutationVariables>(AuthenticateDocument, options);
}
export type AuthenticateMutationHookResult = ReturnType<typeof useAuthenticateMutation>;
export type AuthenticateMutationResult = Apollo.MutationResult<IAuthenticateMutation>;
export type AuthenticateMutationOptions = Apollo.BaseMutationOptions<IAuthenticateMutation, IAuthenticateMutationVariables>;
export const ValidateDocument = gql`
  mutation validate {
    validate {
      startAt
      endAt
      workingType
    }
  }
`;
export type IValidateMutationFn = Apollo.MutationFunction<IValidateMutation, IValidateMutationVariables>;

/**
 * __useValidateMutation__
 *
 * To run a mutation, you first call `useValidateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useValidateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [validateMutation, { data, loading, error }] = useValidateMutation({
 *   variables: {
 *   },
 * });
 */
export function useValidateMutation(baseOptions?: Apollo.MutationHookOptions<IValidateMutation, IValidateMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IValidateMutation, IValidateMutationVariables>(ValidateDocument, options);
}
export type ValidateMutationHookResult = ReturnType<typeof useValidateMutation>;
export type ValidateMutationResult = Apollo.MutationResult<IValidateMutation>;
export type ValidateMutationOptions = Apollo.BaseMutationOptions<IValidateMutation, IValidateMutationVariables>;
export const RefreshDocument = gql`
  mutation refresh($userId: String, $refreshToken: String) {
    refresh(userId: $userId, refreshToken: $refreshToken) {
      accessToken
      refreshToken
    }
  }
`;
export type IRefreshMutationFn = Apollo.MutationFunction<IRefreshMutation, IRefreshMutationVariables>;

/**
 * __useRefreshMutation__
 *
 * To run a mutation, you first call `useRefreshMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRefreshMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [refreshMutation, { data, loading, error }] = useRefreshMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      refreshToken: // value for 'refreshToken'
 *   },
 * });
 */
export function useRefreshMutation(baseOptions?: Apollo.MutationHookOptions<IRefreshMutation, IRefreshMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IRefreshMutation, IRefreshMutationVariables>(RefreshDocument, options);
}
export type RefreshMutationHookResult = ReturnType<typeof useRefreshMutation>;
export type RefreshMutationResult = Apollo.MutationResult<IRefreshMutation>;
export type RefreshMutationOptions = Apollo.BaseMutationOptions<IRefreshMutation, IRefreshMutationVariables>;
export const GoToWorkDocument = gql`
  mutation goToWork {
    goToWork {
      employeeId
      userId
      employeeName
      department {
        departmentId
        departmentName
      }
      workingDate
      workingType
      startAt
      endAt
    }
  }
`;
export type IGoToWorkMutationFn = Apollo.MutationFunction<IGoToWorkMutation, IGoToWorkMutationVariables>;

/**
 * __useGoToWorkMutation__
 *
 * To run a mutation, you first call `useGoToWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGoToWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [goToWorkMutation, { data, loading, error }] = useGoToWorkMutation({
 *   variables: {
 *   },
 * });
 */
export function useGoToWorkMutation(baseOptions?: Apollo.MutationHookOptions<IGoToWorkMutation, IGoToWorkMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IGoToWorkMutation, IGoToWorkMutationVariables>(GoToWorkDocument, options);
}
export type GoToWorkMutationHookResult = ReturnType<typeof useGoToWorkMutation>;
export type GoToWorkMutationResult = Apollo.MutationResult<IGoToWorkMutation>;
export type GoToWorkMutationOptions = Apollo.BaseMutationOptions<IGoToWorkMutation, IGoToWorkMutationVariables>;
export const LeaveWorkDocument = gql`
  mutation leaveWork {
    leaveWork {
      employeeId
      userId
      employeeName
      department {
        departmentId
        departmentName
      }
      workingDate
      workingType
      startAt
      endAt
    }
  }
`;
export type ILeaveWorkMutationFn = Apollo.MutationFunction<ILeaveWorkMutation, ILeaveWorkMutationVariables>;

/**
 * __useLeaveWorkMutation__
 *
 * To run a mutation, you first call `useLeaveWorkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveWorkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveWorkMutation, { data, loading, error }] = useLeaveWorkMutation({
 *   variables: {
 *   },
 * });
 */
export function useLeaveWorkMutation(baseOptions?: Apollo.MutationHookOptions<ILeaveWorkMutation, ILeaveWorkMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ILeaveWorkMutation, ILeaveWorkMutationVariables>(LeaveWorkDocument, options);
}
export type LeaveWorkMutationHookResult = ReturnType<typeof useLeaveWorkMutation>;
export type LeaveWorkMutationResult = Apollo.MutationResult<ILeaveWorkMutation>;
export type LeaveWorkMutationOptions = Apollo.BaseMutationOptions<ILeaveWorkMutation, ILeaveWorkMutationVariables>;
export const GetEmployeeDocument = gql`
  query getEmployee {
    employees {
      employeeId
      userId
      employeeName
      department {
        departmentName
      }
    }
  }
`;

/**
 * __useGetEmployeeQuery__
 *
 * To run a query within a React component, call `useGetEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetEmployeeQuery(baseOptions?: Apollo.QueryHookOptions<IGetEmployeeQuery, IGetEmployeeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetEmployeeQuery, IGetEmployeeQueryVariables>(GetEmployeeDocument, options);
}
export function useGetEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetEmployeeQuery, IGetEmployeeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetEmployeeQuery, IGetEmployeeQueryVariables>(GetEmployeeDocument, options);
}
export type GetEmployeeQueryHookResult = ReturnType<typeof useGetEmployeeQuery>;
export type GetEmployeeLazyQueryHookResult = ReturnType<typeof useGetEmployeeLazyQuery>;
export type GetEmployeeQueryResult = Apollo.QueryResult<IGetEmployeeQuery, IGetEmployeeQueryVariables>;
export const GetEmployeeWorkingDocument = gql`
  query getEmployeeWorking($dt: String) {
    employeeWorking(dt: $dt) {
      employeeId
      employeeName
      department {
        departmentId
        departmentName
      }
      userId
      workingDate
      workingType
      startAt
      endAt
    }
  }
`;

/**
 * __useGetEmployeeWorkingQuery__
 *
 * To run a query within a React component, call `useGetEmployeeWorkingQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeWorkingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeWorkingQuery({
 *   variables: {
 *      dt: // value for 'dt'
 *   },
 * });
 */
export function useGetEmployeeWorkingQuery(baseOptions?: Apollo.QueryHookOptions<IGetEmployeeWorkingQuery, IGetEmployeeWorkingQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetEmployeeWorkingQuery, IGetEmployeeWorkingQueryVariables>(GetEmployeeWorkingDocument, options);
}
export function useGetEmployeeWorkingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetEmployeeWorkingQuery, IGetEmployeeWorkingQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetEmployeeWorkingQuery, IGetEmployeeWorkingQueryVariables>(GetEmployeeWorkingDocument, options);
}
export type GetEmployeeWorkingQueryHookResult = ReturnType<typeof useGetEmployeeWorkingQuery>;
export type GetEmployeeWorkingLazyQueryHookResult = ReturnType<typeof useGetEmployeeWorkingLazyQuery>;
export type GetEmployeeWorkingQueryResult = Apollo.QueryResult<IGetEmployeeWorkingQuery, IGetEmployeeWorkingQueryVariables>;
