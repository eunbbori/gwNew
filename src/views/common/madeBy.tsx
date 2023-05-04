export default function MadeBy() {
  return (
    <div className="w-full max-w-full px-3 mt-0 mb-6 shrink-0 lg:mb-0 lg:w-1/2 lg:flex-none">
      <div className="leading-normal text-center text-sm text-slate-500 lg:text-left">
        © made by{' '}
        <a href="https://www.creative-tim.com" className="font-semibold text-slate-700" target="_blank" rel="noreferrer">
          J&amp;First
        </a>{' '}
        Company.
      </div>
    </div>
  );
}
