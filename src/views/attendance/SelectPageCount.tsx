const SelectPageCount = (props: { handlePageCountChange: (e: React.ChangeEvent<HTMLSelectElement>) => void }) => {
  return (
    <>
      <select data-te-select-init data-te-select-size="sm" onChange={props.handlePageCountChange}>
        <option value="5">5개씩 보기</option>
        <option value="10" selected>
          10개씩 보기
        </option>
        <option value="20">20개씩 보기</option>
        <option value="30">30개씩 보기</option>
        <option value="50">50개씩 보기</option>
      </select>
      <label data-te-select-label-ref>페이지</label>
    </>
  );
};

export default SelectPageCount;
