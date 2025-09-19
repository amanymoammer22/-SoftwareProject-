import { Link, useLocation } from "react-router-dom";

export default function AdminLinkItem({ children }) {
  const location = useLocation();
  const path = location.pathname;
  const pageName = path === "/" ? "dashboard" : path.replace("/", "");

//   if (role !== "admin") return null;

  return (
      <Link
          to={children === "dashboard" ? "/" : `/${children}`}
          className={`block text-[18px] font-bold capitalize transition duration-300 p-2 rounded-2xl w-full text-center
        ${children === pageName ? "bg-[var(--bg-hover)] text-white font-medium" : "text-white  hover:bg-[var(--bg-hover)]"}
      `}>
          {children}
      </Link>
  );
}
