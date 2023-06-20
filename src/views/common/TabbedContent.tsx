import { useEffect, useState } from 'react';
import { Tab, initTE } from 'tw-elements';

export interface ITabbedContent {
  title: string;
  id: string;
  content: JSX.Element;
}

interface ITabProps {
  'data-te-nav-active': boolean;
}

const TabbedContent = ({ tabs }: { tabs: ITabbedContent[] }) => {
  useEffect(() => {
    initTE({ Tab });
  }, []);

  return (
    <>
      {/* Tabs navigation */}
      <ul className="flex list-none flex-row flex-wrap border-b-0 pl-0" role="tablist" data-te-nav-ref>
        {tabs.map((tab, idx) => {
          const props = {} as ITabProps;

          if (idx === 0) props['data-te-nav-active'] = true;

          return (
            <li key={tab.id} role="presentation">
              <a
                href={'#' + tab.id}
                className="my-2 block border-x-0 border-b-2 border-t-0 border-transparent px-7 pb-3.5 pt-4 text-xs font-medium uppercase leading-tight text-neutral-500 hover:isolate hover:border-transparent hover:bg-neutral-100 focus:isolate focus:border-transparent data-[te-nav-active]:border-primary data-[te-nav-active]:text-primary dark:text-neutral-400 dark:hover:bg-transparent dark:data-[te-nav-active]:border-primary-400 dark:data-[te-nav-active]:text-primary-400"
                data-te-toggle="pill"
                data-te-target={'#' + tab.id}
                {...props}
                role="tab"
                aria-controls={'#' + tab.id}
                aria-selected={idx === 0}
              >
                {tab.title}
              </a>
            </li>
          );
        })}
      </ul>

      {/* Tabs content */}
      <div className="mb-6">
        {tabs.map((tab, idx) => {
          const className = 'hidden transition-opacity duration-150 ease-linear data-[te-tab-active]:block ' + (idx === 0 ? 'opacity-100' : 'opacity-0');

          return (
            <div key={tab.id} className={className} id={tab.id} role="tabpanel" aria-labelledby={tab.id + '-tab'} data-te-tab-active={idx === 0}>
              {tab.content}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TabbedContent;
