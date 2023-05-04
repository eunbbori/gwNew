export interface IFooterItemProps {
  url: string;
  name: string;
}

export default function FooterItem(props: IFooterItemProps) {
  return (
    <li className="nav-item">
      <a
        href={props.url}
        className="block px-4 pt-0 pb-1 font-normal transition-colors ease-soft-in-out text-sm text-slate-500"
        target="_blank"
        rel="noreferrer"
      >
        {props.name}
      </a>
    </li>
  );
}
