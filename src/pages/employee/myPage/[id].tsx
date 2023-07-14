import React from 'react';
import { useRouter } from 'next/router';

const myPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return <div>마이페이지 ID : {id}</div>;
};

export default myPage;
