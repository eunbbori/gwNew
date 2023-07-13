import { faSort, faSortAsc, faSortDesc } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ISortIconProps {
  selectedSort: { sort: string; isAscending: boolean };
  field: string;
}

const SortIcon = ({ selectedSort, field }: ISortIconProps) => {
  let sortIcon = faSort;
  if (selectedSort.sort === field) {
    sortIcon = selectedSort.isAscending ? faSortAsc : faSortDesc;
  }

  return <FontAwesomeIcon className={'ml-5 ' + (selectedSort.sort !== field ? 'text-cyan-500' : 'text-rose-500')} icon={sortIcon} />;
};

export default SortIcon;
