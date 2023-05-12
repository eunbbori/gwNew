const TableHeader = () => {
  const headers: string[] = ['이름', 'ID', '근무시간', '근태', '출근', '퇴근', '연장근무', '야간근무'];

  return (
    <thead className="align-bottom">
      <tr>
        {headers.map((e, id) => (
          <th
            key={id}
            className="px-6 py-3 font-bold tracking-normal text-left uppercase align-middle bg-transparent border-b letter border-b-solid text-xxs whitespace-nowrap border-b-gray-200 text-slate-400 opacity-70"
          >
            {e}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
