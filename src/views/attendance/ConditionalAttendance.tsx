import React from 'react';
import ConditionalFilterPart from './ConditionalFilterPart';

const ConditionalAttendance = () => {
  return (
    <div className="border-black/12.5 mb-0 rounded-t-2xl border-b-0 border-solid p-3 pb-0 pr-5">
      <ConditionalFilterPart cnt={0} />
    </div>
  );
};

export default ConditionalAttendance;
