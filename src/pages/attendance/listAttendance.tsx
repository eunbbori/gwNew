import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const DynamicAttendance = dynamic(() => import('@/views/attendance/Attendance'), {
  ssr: false,
});
const DynamicAttendanceTab = dynamic(() => import('@/views/attendance/AttendanceTab'), {
  ssr: false,
});

const ListAttendance = () => {
  return (
    <>
      {/* Tabs navigation */}
      <DynamicAttendanceTab />

      {/* Tabs content */}
      <div className="mb-6">
        <div
          className="hidden opacity-100 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="tabs-attendance-daily"
          role="tabpanel"
          aria-labelledby="tabs-attendance-daily-tab"
          data-te-tab-active
        >
          <DynamicAttendance />
        </div>
        <div
          className="hidden opacity-0 transition-opacity duration-150 ease-linear data-[te-tab-active]:block"
          id="tabs-attendance-condition"
          role="tabpanel"
          aria-labelledby="tabs-attendance-condition-tab"
        >
          Tab 2 content
        </div>
      </div>
    </>
  );
};

export default ListAttendance;
