import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Search = () => {
  return (
    <div className="flex">
      <div className="flex">
        <span className="z-10 self-center absolute ml-[5px]">
          <FontAwesomeIcon icon={faMagnifyingGlass} />
        </span>
      </div>
      <input
        type="text"
        className="self-center mb-[5px] pl-8.75 mr-5 text-sm focus:shadow-soft-primary-outline ease-soft leading-5.6 relative w-50 h-10 -ml-px block rounded-lg border border-solid border-gray-300 bg-white bg-clip-padding py-2 pr-3 text-gray-700 transition-all placeholder:text-gray-500 focus:border-fuchsia-300 focus:outline-none focus:transition-shadow"
        placeholder="Type here..."
      />
    </div>
  );
};
export default Search;
