import { ReactNode } from "react";
import "./Sidebar.css";

type Props = {
  children: ReactNode;
};

const Sidebar = ({ children }: Props) => (
  <aside className="sidebar">
    <div className="sidebar__header">
      <h3>Route Builder</h3>
      <hr className="sidebar__divider" />
    </div>
    <div className="sidebar__content">{children}</div>
    <div className="sidebar__footer">
      <button>Download .gpx</button>
    </div>
  </aside>
);

export default Sidebar;
export type { Props as SidebarProps };
