export interface IContentProps {
  content: JSX.Element;
}

const Content = ({ content }: IContentProps) => (
  <div className="w-full px-6 py-0 mx-auto min-h-[76vh]">
    {/* cards row 4 */}
    <div className="flex flex-wrap my-1 -mx-3">
      <div className="w-full max-w-full px-3 mt-0 mb-6 md:mb-0 md:flex-none lg:flex-none">
        <div className="border-black/12.5 shadow-soft-xl relative flex min-w-0 flex-col break-words rounded-2xl border-0 border-solid bg-white bg-clip-border">
          {content}
        </div>
      </div>
    </div>
  </div>
);

export default Content;
