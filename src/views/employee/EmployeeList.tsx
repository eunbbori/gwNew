import { IGetAllEmployeeQuery } from '@/types/generated/types';
import AllEmployeeProfile from './AllEmployeeProfile';
import TeamEmployeeProfile from './TeamEmployeeProfile';
import { Tab, initTE } from 'tw-elements';
import { useEffect } from 'react';

const EmployeeList = ({ list }: { list: IGetAllEmployeeQuery | undefined }) => {
  useEffect(() => {
    initTE({ Tab });
  }, []);

  return (
    <>
      {/* Tabs navigation */}
      <ul className="flex list-none flex-row flex-wrap border-b-0 pl-0" role="tablist" data-te-nav-ref>
        <li role="presentation">
          <a
            href="#tabs-employees-total"
            className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
            data-te-toggle="pill"
            data-te-target="#tabs-employees-total"
            data-te-nav-active
            role="tab"
            aria-controls="tabs-employees-total"
            aria-selected="true"
          >
            전체
          </a>
        </li>
        <li role="presentation">
          <a
            href="#tabs-employees-team"
            className="focus:border-transparen my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
            data-te-toggle="pill"
            data-te-target="#tabs-employees-team"
            role="tab"
            aria-controls="tabs-employees-team"
            aria-selected="false"
          >
            팀별
          </a>
        </li>
      </ul>

      {/* Tabs content */}
      <div className="mb-6">
        <div
          className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="tabs-employees-total"
          role="tabpanel"
          aria-labelledby="tabs-employees-total-tab"
          data-te-tab-active
        >
          <AllEmployeeProfile list={list} />
        </div>
        <div
          className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="tabs-employees-team"
          role="tabpanel"
          aria-labelledby="tabs-employees-team-tab"
        >
          <TeamEmployeeProfile list={list} />
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
