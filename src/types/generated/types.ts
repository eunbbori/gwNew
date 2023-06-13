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

export type IAuthInfo = {
  __typename?: 'AuthInfo';
  accessToken?: Maybe<Scalars['String']>;
  endAt?: Maybe<Scalars['Date']>;
  startAt?: Maybe<Scalars['Date']>;
  workingType?: Maybe<IWorkingType>;
};

export type ICode = {
  __typename?: 'Code';
  code?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type ICodes = {
  __typename?: 'Codes';
  codes?: Maybe<Array<Maybe<ICode>>>;
  parentCode?: Maybe<Scalars['String']>;
  parentName?: Maybe<Scalars['String']>;
};

export type IDepartment = {
  __typename?: 'Department';
  departmentId?: Maybe<Scalars['ID']>;
  departmentName?: Maybe<Scalars['String']>;
};

export type IEmployee = {
  __typename?: 'Employee';
  department?: Maybe<IDepartment>;
  email?: Maybe<Scalars['String']>;
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
  goToWork?: Maybe<IEmployeeWorking>;
  leaveWork?: Maybe<IEmployeeWorking>;
  login?: Maybe<IAuthInfo>;
  logout?: Maybe<IEmployee>;
  refresh?: Maybe<IAuthInfo>;
};

export type IMutationAddEmployeeArgs = {
  input?: InputMaybe<IEmployeeInput>;
};

export type IMutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  passwd?: InputMaybe<Scalars['String']>;
};

export type IQuery = {
  __typename?: 'Query';
  codes?: Maybe<Array<Maybe<ICodes>>>;
  departments?: Maybe<Array<Maybe<IDepartment>>>;
  employeeWorking?: Maybe<Array<Maybe<IEmployeeWorking>>>;
  employees?: Maybe<Array<Maybe<IEmployee>>>;
};

export type IQueryCodesArgs = {
  parents?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type IQueryEmployeeWorkingArgs = {
  dt?: InputMaybe<Scalars['String']>;
};

export type ISubscription = {
  __typename?: 'Subscription';
  attended?: Maybe<IEmployeeWorking>;
};

export enum IWorkingType {
  FullDayoff = 'FULL_DAYOFF',
  HalfDayoff = 'HALF_DAYOFF',
  Military = 'MILITARY',
  Sick = 'SICK',
  Work = 'WORK',
}

export type ILoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  passwd?: InputMaybe<Scalars['String']>;
}>;

export type ILoginMutation = {
  __typename?: 'Mutation';
  login?: { __typename?: 'AuthInfo'; accessToken?: string | null; startAt?: any | null; endAt?: any | null; workingType?: IWorkingType | null } | null;
};

export type ILogoutMutationVariables = Exact<{ [key: string]: never }>;

export type ILogoutMutation = {
  __typename?: 'Mutation';
  logout?: {
    __typename?: 'Employee';
    employeeId?: string | null;
    userId?: string | null;
    employeeName?: string | null;
    email?: string | null;
    department?: { __typename?: 'Department'; departmentName?: string | null } | null;
  } | null;
};

export type IRefreshMutationVariables = Exact<{ [key: string]: never }>;

export type IRefreshMutation = {
  __typename?: 'Mutation';
  refresh?: { __typename?: 'AuthInfo'; accessToken?: string | null; startAt?: any | null; endAt?: any | null; workingType?: IWorkingType | null } | null;
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

export type IAttendedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type IAttendedSubscription = {
  __typename?: 'Subscription';
  attended?: {
    __typename?: 'EmployeeWorking';
    employeeId?: number | null;
    employeeName?: string | null;
    userId?: string | null;
    workingDate?: any | null;
    workingType?: IWorkingType | null;
    startAt?: any | null;
    endAt?: any | null;
    department?: { __typename?: 'Department'; departmentId?: string | null; departmentName?: string | null } | null;
  } | null;
};

export type IGetAllEmployeeQueryVariables = Exact<{ [key: string]: never }>;

export type IGetAllEmployeeQuery = {
  __typename?: 'Query';
  employees?: Array<{
    __typename?: 'Employee';
    employeeId?: string | null;
    userId?: string | null;
    employeeName?: string | null;
    department?: { __typename?: 'Department'; departmentId?: string | null; departmentName?: string | null } | null;
  } | null> | null;
  departments?: Array<{ __typename?: 'Department'; departmentId?: string | null; departmentName?: string | null } | null> | null;
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

export const LoginDocument = gql`
  mutation login($email: String, $passwd: String) {
    login(email: $email, passwd: $passwd) {
      accessToken
      startAt
      endAt
      workingType
    }
  }
`;
export type ILoginMutationFn = Apollo.MutationFunction<ILoginMutation, ILoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      passwd: // value for 'passwd'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<ILoginMutation, ILoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ILoginMutation, ILoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<ILoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<ILoginMutation, ILoginMutationVariables>;
export const LogoutDocument = gql`
  mutation logout {
    logout {
      employeeId
      userId
      employeeName
      department {
        departmentName
      }
      email
    }
  }
`;
export type ILogoutMutationFn = Apollo.MutationFunction<ILogoutMutation, ILogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<ILogoutMutation, ILogoutMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ILogoutMutation, ILogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<ILogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<ILogoutMutation, ILogoutMutationVariables>;
export const RefreshDocument = gql`
  mutation refresh {
    refresh {
      accessToken
      startAt
      endAt
      workingType
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
export const AttendedDocument = gql`
  subscription attended {
    attended {
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
 * __useAttendedSubscription__
 *
 * To run a query within a React component, call `useAttendedSubscription` and pass it any options that fit your needs.
 * When your component renders, `useAttendedSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAttendedSubscription({
 *   variables: {
 *   },
 * });
 */
export function useAttendedSubscription(baseOptions?: Apollo.SubscriptionHookOptions<IAttendedSubscription, IAttendedSubscriptionVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useSubscription<IAttendedSubscription, IAttendedSubscriptionVariables>(AttendedDocument, options);
}
export type AttendedSubscriptionHookResult = ReturnType<typeof useAttendedSubscription>;
export type AttendedSubscriptionResult = Apollo.SubscriptionResult<IAttendedSubscription>;
export const GetAllEmployeeDocument = gql`
  query getAllEmployee {
    employees {
      employeeId
      userId
      employeeName
      department {
        departmentId
        departmentName
      }
    }
    departments {
      departmentId
      departmentName
    }
  }
`;

/**
 * __useGetAllEmployeeQuery__
 *
 * To run a query within a React component, call `useGetAllEmployeeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllEmployeeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllEmployeeQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllEmployeeQuery(baseOptions?: Apollo.QueryHookOptions<IGetAllEmployeeQuery, IGetAllEmployeeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetAllEmployeeQuery, IGetAllEmployeeQueryVariables>(GetAllEmployeeDocument, options);
}
export function useGetAllEmployeeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetAllEmployeeQuery, IGetAllEmployeeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetAllEmployeeQuery, IGetAllEmployeeQueryVariables>(GetAllEmployeeDocument, options);
}
export type GetAllEmployeeQueryHookResult = ReturnType<typeof useGetAllEmployeeQuery>;
export type GetAllEmployeeLazyQueryHookResult = ReturnType<typeof useGetAllEmployeeLazyQuery>;
export type GetAllEmployeeQueryResult = Apollo.QueryResult<IGetAllEmployeeQuery, IGetAllEmployeeQueryVariables>;
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
