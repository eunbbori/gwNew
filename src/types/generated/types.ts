export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type IDepartment = {
  __typename?: 'Department';
  departmentId?: Maybe<Scalars['Int']>;
  departmentName?: Maybe<Scalars['String']>;
};

export type IEmployee = {
  __typename?: 'Employee';
  department?: Maybe<IDepartment>;
  employeeId?: Maybe<Scalars['Int']>;
  employeeName?: Maybe<Scalars['String']>;
  endAt?: Maybe<Scalars['Date']>;
  startAt?: Maybe<Scalars['Date']>;
  userId?: Maybe<Scalars['String']>;
};

export type IQuery = {
  __typename?: 'Query';
  departments?: Maybe<Array<Maybe<IDepartment>>>;
  employees?: Maybe<Array<Maybe<IEmployee>>>;
};
