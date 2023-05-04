/* eslint-disable react/no-unknown-property */
export default function BottomCard() {
  return (
    <div
      className="after:opacity-65 after:bg-gradient-to-tl after:from-slate-600 after:to-slate-300 relative flex min-w-0 flex-col items-center break-words rounded-2xl border-0 border-solid border-blue-900 bg-white bg-clip-border shadow-none after:absolute after:top-0 after:bottom-0 after:left-0 after:z-10 after:block after:h-full after:w-full after:rounded-2xl after:content-['']"
      sidenav-card="true"
    >
      <div className="relative z-20 flex-auto w-full p-4 text-left text-white">
        <div className="transition-all duration-200 ease-nav-brand">
          <h6 className="mb-0 text-white">구매 문의</h6>
          <p className="mt-0 mb-4 font-semibold leading-tight text-xs">www.jnfirst.co.kr</p>
          <a
            href="https://www.creative-tim.com/learning-lab/tailwind/html/quick-start/soft-ui-dashboard/"
            target="_blank"
            className="inline-block w-full px-8 py-2 mb-0 font-bold text-center text-black uppercase transition-all ease-in bg-white border-0 border-white rounded-lg shadow-soft-md bg-150 leading-pro text-xs hover:shadow-soft-2xl hover:scale-102"
            rel="noreferrer"
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  );
}
