import { useEffect } from 'react';
import { Tab, initTE } from 'tw-elements';

const AttendanceTab = () => {
  useEffect(() => {
    initTE({ Tab });
  }, []);

  return (
    <>
      {/* Tabs navigation */}
      <ul className="flex list-none flex-row flex-wrap border-b-0 pl-0" role="tablist" data-te-nav-ref>
        <li role="presentation">
          <a
            href="#tabs-attendance-daily"
            className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
            data-te-toggle="pill"
            data-te-target="#tabs-attendance-daily"
            data-te-nav-active
            role="tab"
            aria-controls="tabs-attendance-daily"
            aria-selected="true"
          >
            일별조회
          </a>
        </li>
        <li role="presentation">
          <a
            href="#tabs-attendance-condition"
            className="focus:border-transparen my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
            data-te-toggle="pill"
            data-te-target="#tabs-attendance-condition"
            role="tab"
            aria-controls="tabs-attendance-condition"
            aria-selected="false"
          >
            조건조회
          </a>
        </li>
      </ul>
    </>
  );
};

export default AttendanceTab;
