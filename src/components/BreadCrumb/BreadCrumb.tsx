import { breadCrumbPathVar } from '@/stores/gqlReactVars';
import { useReactiveVar } from '@apollo/client';
import { allRouteInfos, getRouteInfo } from '@/repository/RouteInfo';

const Slash = () => {
  return (
    <li>
      <span className="mx-2 text-neutral-500 dark:text-neutral-200">/</span>
    </li>
  );
};

const BreadCrumb = () => {
  const currBreadCrumbPath = useReactiveVar(breadCrumbPathVar);

  return (
    <nav
      className="relative flex w-full flex-wrap items-center justify-between text-sm bg-neutral-100 py-3 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:flex-wrap lg:justify-start"
      data-te-navbar-ref
    >
      <div className="flex w-full flex-wrap items-center justify-between px-3">
        <nav className="bg-grey-light w-full rounded-md" aria-label="breadcrumb">
          <ol className="list-reset flex">
            {currBreadCrumbPath.map((e, idx) => {
              const curr = getRouteInfo(e);
              console.log('curr', curr);

              return (
                <>
                  {idx > 0 && <Slash />}
                  {!curr?.linkable || idx === currBreadCrumbPath.length - 1 ? (
                    <li className="text-neutral-500 dark:text-neutral-400">{curr?.title}</li>
                  ) : (
                    <li>
                      <a
                        href={idx == 0 ? '/' : `'/'+curr?.id`}
                        className="text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                      >
                        {curr?.title}
                      </a>
                    </li>
                  )}
                </>
              );
            })}
          </ol>
        </nav>
      </div>
    </nav>
  );
};

export default BreadCrumb;
