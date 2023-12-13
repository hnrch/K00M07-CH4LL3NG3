import { ReactNode } from "react";
import "./Sidebar.css";

type Props = {
  children: ReactNode;
};

const Sidebar = ({ children }: Props) => (
  <aside className="sidebar">
    <h3>Route Builder</h3>
    <hr className="sidebar__divider" />
    {children}
  </aside>
);

export default Sidebar;
export type { Props as SidebarProps };
