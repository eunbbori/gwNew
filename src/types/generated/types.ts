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
  DateTime: any;
  Upload: any;
};

export type IAuthInfo = {
  __typename?: 'AuthInfo';
  accessToken?: Maybe<Scalars['String']>;
  endAt?: Maybe<Scalars['Date']>;
  lastLogin?: Maybe<Scalars['Date']>;
  startAt?: Maybe<Scalars['Date']>;
  workingType?: Maybe<Scalars['String']>;
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
  departmentId?: Maybe<Scalars['Int']>;
  departmentName?: Maybe<Scalars['String']>;
};

export type IEmployee = {
  __typename?: 'Employee';
  contractType?: Maybe<Scalars['String']>;
  department?: Maybe<IDepartment>;
  email?: Maybe<Scalars['String']>;
  employeeId?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photoUrl?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  startDate?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
};

export type IEmployeeInput = {
  contractType?: InputMaybe<Scalars['String']>;
  departmentId?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  employeeId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  passwd?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type IEmployeeModInput = {
  contractType?: InputMaybe<Scalars['String']>;
  departmentId?: InputMaybe<Scalars['Int']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  removePhoto?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type IEmployeeWorking = {
  __typename?: 'EmployeeWorking';
  department?: Maybe<IDepartment>;
  employeeId?: Maybe<Scalars['String']>;
  endAt?: Maybe<Scalars['Date']>;
  name?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['String']>;
  startAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
  workingDate?: Maybe<Scalars['Date']>;
  workingType?: Maybe<Scalars['String']>;
};

export type IEmployeeWorkingCondition = {
  departmentId?: InputMaybe<Scalars['Int']>;
  name?: InputMaybe<Scalars['String']>;
  position?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
  workingDateFrom?: InputMaybe<Scalars['String']>;
  workingDateTo?: InputMaybe<Scalars['String']>;
  workingType?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type IEmployeeWorkingPage = {
  __typename?: 'EmployeeWorkingPage';
  content?: Maybe<Array<Maybe<IEmployeeWorking>>>;
  page?: Maybe<Scalars['Int']>;
  size?: Maybe<Scalars['Int']>;
  totalElements?: Maybe<Scalars['Int']>;
  totalPages?: Maybe<Scalars['Int']>;
};

export type IFile = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  mimetype: Scalars['String'];
};

export type IMutation = {
  __typename?: 'Mutation';
  addEmployee?: Maybe<IEmployee>;
  changeFirstPwd?: Maybe<IEmployee>;
  changePwd?: Maybe<IEmployee>;
  changePwdByAdmin?: Maybe<IEmployee>;
  goToWork?: Maybe<IEmployeeWorking>;
  leaveWork?: Maybe<IEmployeeWorking>;
  login?: Maybe<IAuthInfo>;
  logout?: Maybe<IEmployee>;
  modEmployee?: Maybe<IEmployee>;
  refresh?: Maybe<IAuthInfo>;
  singleUpload: IFile;
};

export type IMutationAddEmployeeArgs = {
  file?: InputMaybe<Scalars['Upload']>;
  input?: InputMaybe<IEmployeeInput>;
};

export type IMutationChangeFirstPwdArgs = {
  email?: InputMaybe<Scalars['String']>;
  prevPwd?: InputMaybe<Scalars['String']>;
  pwd?: InputMaybe<Scalars['String']>;
};

export type IMutationChangePwdArgs = {
  employeeId?: InputMaybe<Scalars['String']>;
  prevPwd?: InputMaybe<Scalars['String']>;
  pwd?: InputMaybe<Scalars['String']>;
};

export type IMutationChangePwdByAdminArgs = {
  employeeId?: InputMaybe<Scalars['String']>;
  pwd?: InputMaybe<Scalars['String']>;
};

export type IMutationLoginArgs = {
  email?: InputMaybe<Scalars['String']>;
  passwd?: InputMaybe<Scalars['String']>;
};

export type IMutationModEmployeeArgs = {
  employeeId?: InputMaybe<Scalars['String']>;
  file?: InputMaybe<Scalars['Upload']>;
  input?: InputMaybe<IEmployeeModInput>;
};

export type IMutationSingleUploadArgs = {
  employeeId?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
};

export type IQuery = {
  __typename?: 'Query';
  checkUserIdDuplication?: Maybe<Scalars['Boolean']>;
  codes?: Maybe<Array<Maybe<ICodes>>>;
  departments?: Maybe<Array<Maybe<IDepartment>>>;
  employee?: Maybe<IEmployee>;
  employeeWorking?: Maybe<Array<Maybe<IEmployeeWorking>>>;
  employeeWorkingConditional?: Maybe<IEmployeeWorkingPage>;
  employees?: Maybe<Array<Maybe<IEmployee>>>;
};

export type IQueryCheckUserIdDuplicationArgs = {
  userId: Scalars['String'];
};

export type IQueryCodesArgs = {
  parents?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type IQueryEmployeeArgs = {
  employeeId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
};

export type IQueryEmployeeWorkingArgs = {
  dt?: InputMaybe<Scalars['String']>;
};

export type IQueryEmployeeWorkingConditionalArgs = {
  page?: InputMaybe<Scalars['Int']>;
  searchCondition?: InputMaybe<IEmployeeWorkingCondition>;
  size?: InputMaybe<Scalars['Int']>;
};

export type ISubscription = {
  __typename?: 'Subscription';
  attended?: Maybe<IEmployeeWorking>;
};

export type ILoginMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  passwd?: InputMaybe<Scalars['String']>;
}>;

export type ILoginMutation = {
  __typename?: 'Mutation';
  login?: {
    __typename?: 'AuthInfo';
    accessToken?: string | null;
    startAt?: any | null;
    endAt?: any | null;
    workingType?: string | null;
    lastLogin?: any | null;
  } | null;
};

export type ICheckUserIdDuplicationQueryVariables = Exact<{
  userId: Scalars['String'];
}>;

export type ICheckUserIdDuplicationQuery = { __typename?: 'Query'; checkUserIdDuplication?: boolean | null };

export type ILogoutMutationVariables = Exact<{ [key: string]: never }>;

export type ILogoutMutation = {
  __typename?: 'Mutation';
  logout?: {
    __typename?: 'Employee';
    employeeId?: string | null;
    userId?: string | null;
    name?: string | null;
    email?: string | null;
    department?: { __typename?: 'Department'; departmentName?: string | null } | null;
  } | null;
};

export type IRefreshMutationVariables = Exact<{ [key: string]: never }>;

export type IRefreshMutation = {
  __typename?: 'Mutation';
  refresh?: { __typename?: 'AuthInfo'; accessToken?: string | null; startAt?: any | null; endAt?: any | null; workingType?: string | null } | null;
};

export type IGoToWorkMutationVariables = Exact<{ [key: string]: never }>;

export type IGoToWorkMutation = {
  __typename?: 'Mutation';
  goToWork?: {
    __typename?: 'EmployeeWorking';
    employeeId?: string | null;
    userId?: string | null;
    name?: string | null;
    workingDate?: any | null;
    workingType?: string | null;
    startAt?: any | null;
    endAt?: any | null;
    department?: { __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null;
  } | null;
};

export type ILeaveWorkMutationVariables = Exact<{ [key: string]: never }>;

export type ILeaveWorkMutation = {
  __typename?: 'Mutation';
  leaveWork?: {
    __typename?: 'EmployeeWorking';
    employeeId?: string | null;
    userId?: string | null;
    name?: string | null;
    workingDate?: any | null;
    workingType?: string | null;
    startAt?: any | null;
    endAt?: any | null;
    department?: { __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null;
  } | null;
};

export type IAttendedSubscriptionVariables = Exact<{ [key: string]: never }>;

export type IAttendedSubscription = {
  __typename?: 'Subscription';
  attended?: {
    __typename?: 'EmployeeWorking';
    employeeId?: string | null;
    name?: string | null;
    userId?: string | null;
    workingDate?: any | null;
    workingType?: string | null;
    startAt?: any | null;
    endAt?: any | null;
    department?: { __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null;
  } | null;
};

export type IGetAllEmployeeQueryVariables = Exact<{ [key: string]: never }>;

export type IGetAllEmployeeQuery = {
  __typename?: 'Query';
  employees?: Array<{
    __typename?: 'Employee';
    employeeId?: string | null;
    userId?: string | null;
    name?: string | null;
    position?: string | null;
    contractType?: string | null;
    phone?: string | null;
    email?: string | null;
    startDate?: any | null;
    photoUrl?: string | null;
    department?: { __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null;
  } | null> | null;
  departments?: Array<{ __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null> | null;
};

export type IGetEmployeeQueryVariables = Exact<{
  employeeId?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['String']>;
}>;

export type IGetEmployeeQuery = {
  __typename?: 'Query';
  employee?: {
    __typename?: 'Employee';
    employeeId?: string | null;
    userId?: string | null;
    name?: string | null;
    position?: string | null;
    contractType?: string | null;
    phone?: string | null;
    email?: string | null;
    startDate?: any | null;
    photoUrl?: string | null;
    department?: { __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null;
  } | null;
};

export type IGetAllDepartmentsQueryVariables = Exact<{ [key: string]: never }>;

export type IGetAllDepartmentsQuery = {
  __typename?: 'Query';
  departments?: Array<{ __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null> | null;
};

export type IGetEmployeeWorkingQueryVariables = Exact<{
  dt?: InputMaybe<Scalars['String']>;
}>;

export type IGetEmployeeWorkingQuery = {
  __typename?: 'Query';
  employeeWorking?: Array<{
    __typename?: 'EmployeeWorking';
    employeeId?: string | null;
    name?: string | null;
    position?: string | null;
    userId?: string | null;
    workingDate?: any | null;
    workingType?: string | null;
    startAt?: any | null;
    endAt?: any | null;
    department?: { __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null;
  } | null> | null;
};

export type IGetEmployeeWorkingConditionalQueryVariables = Exact<{
  searchCondition?: InputMaybe<IEmployeeWorkingCondition>;
  page?: InputMaybe<Scalars['Int']>;
  size?: InputMaybe<Scalars['Int']>;
}>;

export type IGetEmployeeWorkingConditionalQuery = {
  __typename?: 'Query';
  employeeWorkingConditional?: {
    __typename?: 'EmployeeWorkingPage';
    totalElements?: number | null;
    totalPages?: number | null;
    page?: number | null;
    size?: number | null;
    content?: Array<{
      __typename?: 'EmployeeWorking';
      employeeId?: string | null;
      name?: string | null;
      position?: string | null;
      userId?: string | null;
      workingDate?: any | null;
      workingType?: string | null;
      startAt?: any | null;
      endAt?: any | null;
      department?: { __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null;
    } | null> | null;
  } | null;
};

export type IAddEmployeeMutationVariables = Exact<{
  input: IEmployeeInput;
  file?: InputMaybe<Scalars['Upload']>;
}>;

export type IAddEmployeeMutation = {
  __typename?: 'Mutation';
  addEmployee?: {
    __typename?: 'Employee';
    employeeId?: string | null;
    userId?: string | null;
    name?: string | null;
    position?: string | null;
    email?: string | null;
    contractType?: string | null;
    phone?: string | null;
    startDate?: any | null;
    department?: { __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null;
  } | null;
};

export type IModEmployeeMutationVariables = Exact<{
  employeeId?: InputMaybe<Scalars['String']>;
  input: IEmployeeModInput;
  file?: InputMaybe<Scalars['Upload']>;
}>;

export type IModEmployeeMutation = {
  __typename?: 'Mutation';
  modEmployee?: {
    __typename?: 'Employee';
    employeeId?: string | null;
    userId?: string | null;
    name?: string | null;
    position?: string | null;
    email?: string | null;
    contractType?: string | null;
    phone?: string | null;
    startDate?: any | null;
    department?: { __typename?: 'Department'; departmentId?: number | null; departmentName?: string | null } | null;
  } | null;
};

export type IGetCodesQueryVariables = Exact<{
  parents?: InputMaybe<Array<InputMaybe<Scalars['String']>> | InputMaybe<Scalars['String']>>;
}>;

export type IGetCodesQuery = {
  __typename?: 'Query';
  codes?: Array<{
    __typename?: 'Codes';
    parentCode?: string | null;
    parentName?: string | null;
    codes?: Array<{ __typename?: 'Code'; code?: string | null; name?: string | null } | null> | null;
  } | null> | null;
};

export type ISingleUploadMutationVariables = Exact<{
  employeeId?: InputMaybe<Scalars['String']>;
  file: Scalars['Upload'];
}>;

export type ISingleUploadMutation = { __typename?: 'Mutation'; singleUpload: { __typename?: 'File'; filename: string } };

export type IChangePwdMutationVariables = Exact<{
  employeeId?: InputMaybe<Scalars['String']>;
  pwd?: InputMaybe<Scalars['String']>;
  prevPwd?: InputMaybe<Scalars['String']>;
}>;

export type IChangePwdMutation = { __typename?: 'Mutation'; changePwd?: { __typename?: 'Employee'; employeeId?: string | null } | null };

export type IChangeFirstPwdMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  pwd?: InputMaybe<Scalars['String']>;
  prevPwd?: InputMaybe<Scalars['String']>;
}>;

export type IChangeFirstPwdMutation = { __typename?: 'Mutation'; changeFirstPwd?: { __typename?: 'Employee'; employeeId?: string | null } | null };

export type IChangePwdByAdminMutationVariables = Exact<{
  employeeId?: InputMaybe<Scalars['String']>;
  pwd?: InputMaybe<Scalars['String']>;
}>;

export type IChangePwdByAdminMutation = { __typename?: 'Mutation'; changePwdByAdmin?: { __typename?: 'Employee'; employeeId?: string | null } | null };

export const LoginDocument = gql`
  mutation login($email: String, $passwd: String) {
    login(email: $email, passwd: $passwd) {
      accessToken
      startAt
      endAt
      workingType
      lastLogin
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
export const CheckUserIdDuplicationDocument = gql`
  query checkUserIdDuplication($userId: String!) {
    checkUserIdDuplication(userId: $userId)
  }
`;

/**
 * __useCheckUserIdDuplicationQuery__
 *
 * To run a query within a React component, call `useCheckUserIdDuplicationQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckUserIdDuplicationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckUserIdDuplicationQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useCheckUserIdDuplicationQuery(baseOptions: Apollo.QueryHookOptions<ICheckUserIdDuplicationQuery, ICheckUserIdDuplicationQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ICheckUserIdDuplicationQuery, ICheckUserIdDuplicationQueryVariables>(CheckUserIdDuplicationDocument, options);
}
export function useCheckUserIdDuplicationLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ICheckUserIdDuplicationQuery, ICheckUserIdDuplicationQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ICheckUserIdDuplicationQuery, ICheckUserIdDuplicationQueryVariables>(CheckUserIdDuplicationDocument, options);
}
export type CheckUserIdDuplicationQueryHookResult = ReturnType<typeof useCheckUserIdDuplicationQuery>;
export type CheckUserIdDuplicationLazyQueryHookResult = ReturnType<typeof useCheckUserIdDuplicationLazyQuery>;
export type CheckUserIdDuplicationQueryResult = Apollo.QueryResult<ICheckUserIdDuplicationQuery, ICheckUserIdDuplicationQueryVariables>;
export const LogoutDocument = gql`
  mutation logout {
    logout {
      employeeId
      userId
      name
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
      name
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
      name
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
      name
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
      name
      position
      department {
        departmentId
        departmentName
      }
      contractType
      phone
      email
      startDate
      photoUrl
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
export const GetEmployeeDocument = gql`
  query getEmployee($employeeId: String, $userId: String) {
    employee(employeeId: $employeeId, userId: $userId) {
      employeeId
      userId
      name
      position
      department {
        departmentId
        departmentName
      }
      contractType
      phone
      email
      startDate
      photoUrl
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
 *      employeeId: // value for 'employeeId'
 *      userId: // value for 'userId'
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
export const GetAllDepartmentsDocument = gql`
  query getAllDepartments {
    departments {
      departmentId
      departmentName
    }
  }
`;

/**
 * __useGetAllDepartmentsQuery__
 *
 * To run a query within a React component, call `useGetAllDepartmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllDepartmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllDepartmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllDepartmentsQuery(baseOptions?: Apollo.QueryHookOptions<IGetAllDepartmentsQuery, IGetAllDepartmentsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetAllDepartmentsQuery, IGetAllDepartmentsQueryVariables>(GetAllDepartmentsDocument, options);
}
export function useGetAllDepartmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetAllDepartmentsQuery, IGetAllDepartmentsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetAllDepartmentsQuery, IGetAllDepartmentsQueryVariables>(GetAllDepartmentsDocument, options);
}
export type GetAllDepartmentsQueryHookResult = ReturnType<typeof useGetAllDepartmentsQuery>;
export type GetAllDepartmentsLazyQueryHookResult = ReturnType<typeof useGetAllDepartmentsLazyQuery>;
export type GetAllDepartmentsQueryResult = Apollo.QueryResult<IGetAllDepartmentsQuery, IGetAllDepartmentsQueryVariables>;
export const GetEmployeeWorkingDocument = gql`
  query getEmployeeWorking($dt: String) {
    employeeWorking(dt: $dt) {
      employeeId
      name
      position
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
export const GetEmployeeWorkingConditionalDocument = gql`
  query getEmployeeWorkingConditional($searchCondition: EmployeeWorkingCondition, $page: Int = 0, $size: Int = 10) {
    employeeWorkingConditional(searchCondition: $searchCondition, page: $page, size: $size) {
      content {
        employeeId
        name
        position
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
      totalElements
      totalPages
      page
      size
    }
  }
`;

/**
 * __useGetEmployeeWorkingConditionalQuery__
 *
 * To run a query within a React component, call `useGetEmployeeWorkingConditionalQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEmployeeWorkingConditionalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEmployeeWorkingConditionalQuery({
 *   variables: {
 *      searchCondition: // value for 'searchCondition'
 *      page: // value for 'page'
 *      size: // value for 'size'
 *   },
 * });
 */
export function useGetEmployeeWorkingConditionalQuery(
  baseOptions?: Apollo.QueryHookOptions<IGetEmployeeWorkingConditionalQuery, IGetEmployeeWorkingConditionalQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetEmployeeWorkingConditionalQuery, IGetEmployeeWorkingConditionalQueryVariables>(GetEmployeeWorkingConditionalDocument, options);
}
export function useGetEmployeeWorkingConditionalLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<IGetEmployeeWorkingConditionalQuery, IGetEmployeeWorkingConditionalQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetEmployeeWorkingConditionalQuery, IGetEmployeeWorkingConditionalQueryVariables>(GetEmployeeWorkingConditionalDocument, options);
}
export type GetEmployeeWorkingConditionalQueryHookResult = ReturnType<typeof useGetEmployeeWorkingConditionalQuery>;
export type GetEmployeeWorkingConditionalLazyQueryHookResult = ReturnType<typeof useGetEmployeeWorkingConditionalLazyQuery>;
export type GetEmployeeWorkingConditionalQueryResult = Apollo.QueryResult<IGetEmployeeWorkingConditionalQuery, IGetEmployeeWorkingConditionalQueryVariables>;
export const AddEmployeeDocument = gql`
  mutation addEmployee($input: EmployeeInput!, $file: Upload) {
    addEmployee(input: $input, file: $file) {
      employeeId
      userId
      name
      position
      email
      department {
        departmentId
        departmentName
      }
      contractType
      phone
      startDate
    }
  }
`;
export type IAddEmployeeMutationFn = Apollo.MutationFunction<IAddEmployeeMutation, IAddEmployeeMutationVariables>;

/**
 * __useAddEmployeeMutation__
 *
 * To run a mutation, you first call `useAddEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addEmployeeMutation, { data, loading, error }] = useAddEmployeeMutation({
 *   variables: {
 *      input: // value for 'input'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useAddEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<IAddEmployeeMutation, IAddEmployeeMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IAddEmployeeMutation, IAddEmployeeMutationVariables>(AddEmployeeDocument, options);
}
export type AddEmployeeMutationHookResult = ReturnType<typeof useAddEmployeeMutation>;
export type AddEmployeeMutationResult = Apollo.MutationResult<IAddEmployeeMutation>;
export type AddEmployeeMutationOptions = Apollo.BaseMutationOptions<IAddEmployeeMutation, IAddEmployeeMutationVariables>;
export const ModEmployeeDocument = gql`
  mutation modEmployee($employeeId: String, $input: EmployeeModInput!, $file: Upload) {
    modEmployee(employeeId: $employeeId, input: $input, file: $file) {
      employeeId
      userId
      name
      position
      email
      department {
        departmentId
        departmentName
      }
      contractType
      phone
      startDate
    }
  }
`;
export type IModEmployeeMutationFn = Apollo.MutationFunction<IModEmployeeMutation, IModEmployeeMutationVariables>;

/**
 * __useModEmployeeMutation__
 *
 * To run a mutation, you first call `useModEmployeeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useModEmployeeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [modEmployeeMutation, { data, loading, error }] = useModEmployeeMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *      input: // value for 'input'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useModEmployeeMutation(baseOptions?: Apollo.MutationHookOptions<IModEmployeeMutation, IModEmployeeMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IModEmployeeMutation, IModEmployeeMutationVariables>(ModEmployeeDocument, options);
}
export type ModEmployeeMutationHookResult = ReturnType<typeof useModEmployeeMutation>;
export type ModEmployeeMutationResult = Apollo.MutationResult<IModEmployeeMutation>;
export type ModEmployeeMutationOptions = Apollo.BaseMutationOptions<IModEmployeeMutation, IModEmployeeMutationVariables>;
export const GetCodesDocument = gql`
  query getCodes($parents: [String]) {
    codes(parents: $parents) {
      parentCode
      parentName
      codes {
        code
        name
      }
    }
  }
`;

/**
 * __useGetCodesQuery__
 *
 * To run a query within a React component, call `useGetCodesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCodesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCodesQuery({
 *   variables: {
 *      parents: // value for 'parents'
 *   },
 * });
 */
export function useGetCodesQuery(baseOptions?: Apollo.QueryHookOptions<IGetCodesQuery, IGetCodesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<IGetCodesQuery, IGetCodesQueryVariables>(GetCodesDocument, options);
}
export function useGetCodesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IGetCodesQuery, IGetCodesQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<IGetCodesQuery, IGetCodesQueryVariables>(GetCodesDocument, options);
}
export type GetCodesQueryHookResult = ReturnType<typeof useGetCodesQuery>;
export type GetCodesLazyQueryHookResult = ReturnType<typeof useGetCodesLazyQuery>;
export type GetCodesQueryResult = Apollo.QueryResult<IGetCodesQuery, IGetCodesQueryVariables>;
export const SingleUploadDocument = gql`
  mutation singleUpload($employeeId: String, $file: Upload!) {
    singleUpload(employeeId: $employeeId, file: $file) {
      filename
    }
  }
`;
export type ISingleUploadMutationFn = Apollo.MutationFunction<ISingleUploadMutation, ISingleUploadMutationVariables>;

/**
 * __useSingleUploadMutation__
 *
 * To run a mutation, you first call `useSingleUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSingleUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [singleUploadMutation, { data, loading, error }] = useSingleUploadMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *      file: // value for 'file'
 *   },
 * });
 */
export function useSingleUploadMutation(baseOptions?: Apollo.MutationHookOptions<ISingleUploadMutation, ISingleUploadMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ISingleUploadMutation, ISingleUploadMutationVariables>(SingleUploadDocument, options);
}
export type SingleUploadMutationHookResult = ReturnType<typeof useSingleUploadMutation>;
export type SingleUploadMutationResult = Apollo.MutationResult<ISingleUploadMutation>;
export type SingleUploadMutationOptions = Apollo.BaseMutationOptions<ISingleUploadMutation, ISingleUploadMutationVariables>;
export const ChangePwdDocument = gql`
  mutation changePwd($employeeId: String, $pwd: String, $prevPwd: String) {
    changePwd(employeeId: $employeeId, pwd: $pwd, prevPwd: $prevPwd) {
      employeeId
    }
  }
`;
export type IChangePwdMutationFn = Apollo.MutationFunction<IChangePwdMutation, IChangePwdMutationVariables>;

/**
 * __useChangePwdMutation__
 *
 * To run a mutation, you first call `useChangePwdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePwdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePwdMutation, { data, loading, error }] = useChangePwdMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *      pwd: // value for 'pwd'
 *      prevPwd: // value for 'prevPwd'
 *   },
 * });
 */
export function useChangePwdMutation(baseOptions?: Apollo.MutationHookOptions<IChangePwdMutation, IChangePwdMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IChangePwdMutation, IChangePwdMutationVariables>(ChangePwdDocument, options);
}
export type ChangePwdMutationHookResult = ReturnType<typeof useChangePwdMutation>;
export type ChangePwdMutationResult = Apollo.MutationResult<IChangePwdMutation>;
export type ChangePwdMutationOptions = Apollo.BaseMutationOptions<IChangePwdMutation, IChangePwdMutationVariables>;
export const ChangeFirstPwdDocument = gql`
  mutation changeFirstPwd($email: String, $pwd: String, $prevPwd: String) {
    changeFirstPwd(email: $email, pwd: $pwd, prevPwd: $prevPwd) {
      employeeId
    }
  }
`;
export type IChangeFirstPwdMutationFn = Apollo.MutationFunction<IChangeFirstPwdMutation, IChangeFirstPwdMutationVariables>;

/**
 * __useChangeFirstPwdMutation__
 *
 * To run a mutation, you first call `useChangeFirstPwdMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeFirstPwdMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeFirstPwdMutation, { data, loading, error }] = useChangeFirstPwdMutation({
 *   variables: {
 *      email: // value for 'email'
 *      pwd: // value for 'pwd'
 *      prevPwd: // value for 'prevPwd'
 *   },
 * });
 */
export function useChangeFirstPwdMutation(baseOptions?: Apollo.MutationHookOptions<IChangeFirstPwdMutation, IChangeFirstPwdMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IChangeFirstPwdMutation, IChangeFirstPwdMutationVariables>(ChangeFirstPwdDocument, options);
}
export type ChangeFirstPwdMutationHookResult = ReturnType<typeof useChangeFirstPwdMutation>;
export type ChangeFirstPwdMutationResult = Apollo.MutationResult<IChangeFirstPwdMutation>;
export type ChangeFirstPwdMutationOptions = Apollo.BaseMutationOptions<IChangeFirstPwdMutation, IChangeFirstPwdMutationVariables>;
export const ChangePwdByAdminDocument = gql`
  mutation changePwdByAdmin($employeeId: String, $pwd: String) {
    changePwdByAdmin(employeeId: $employeeId, pwd: $pwd) {
      employeeId
    }
  }
`;
export type IChangePwdByAdminMutationFn = Apollo.MutationFunction<IChangePwdByAdminMutation, IChangePwdByAdminMutationVariables>;

/**
 * __useChangePwdByAdminMutation__
 *
 * To run a mutation, you first call `useChangePwdByAdminMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePwdByAdminMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePwdByAdminMutation, { data, loading, error }] = useChangePwdByAdminMutation({
 *   variables: {
 *      employeeId: // value for 'employeeId'
 *      pwd: // value for 'pwd'
 *   },
 * });
 */
export function useChangePwdByAdminMutation(baseOptions?: Apollo.MutationHookOptions<IChangePwdByAdminMutation, IChangePwdByAdminMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<IChangePwdByAdminMutation, IChangePwdByAdminMutationVariables>(ChangePwdByAdminDocument, options);
}
export type ChangePwdByAdminMutationHookResult = ReturnType<typeof useChangePwdByAdminMutation>;
export type ChangePwdByAdminMutationResult = Apollo.MutationResult<IChangePwdByAdminMutation>;
export type ChangePwdByAdminMutationOptions = Apollo.BaseMutationOptions<IChangePwdByAdminMutation, IChangePwdByAdminMutationVariables>;
