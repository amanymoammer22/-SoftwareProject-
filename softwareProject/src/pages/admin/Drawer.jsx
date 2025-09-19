import { FaBars } from "react-icons/fa";
import AdminLinkItem from "./AdminLinkItem";
import { Link } from "react-router-dom";

export default function Drawer() {
    return (
        <div className="drawer drawer-end ">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                {/* Page content here */}
                <label htmlFor="my-drawer-4" className="drawer-button btn "> 
                     <FaBars /> 
                 </label> 
            </div>
            <div className="drawer-side ">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay">
                    {" "}
                </label>

                <ul className="text-base-content min-h-full w-60 p-4 bg-[var(--bg-Color)] flex flex-col items-center">
                    {/* Sidebar content here */}
                    <li>
                        <div className="flex flex-col items-center mt-8">
                            <img src="logo.jpg" width={100} alt="Artisan" />
                            <h2 className="text-2xl font-bold text-white">Artisan panel</h2>
                        </div>
                    </li>
                    <hr className="w-full my-4 border text-[#72312e] font-bold" />
                    <li className=" w-full p-2 rounded-2xl mt-5">
                        <AdminLinkItem>dashboard</AdminLinkItem>
                    </li>
                    <li className="w-full p-2 rounded-2xl ">
                        <AdminLinkItem>products</AdminLinkItem>
                    </li>
                    <li className=" w-full p-2 rounded-2xl ">
                        <AdminLinkItem>orders</AdminLinkItem>
                    </li>
                    <li className="w-full p-2 rounded-2xl ">
                        <AdminLinkItem>add item</AdminLinkItem>
                    </li>{" "}
                    <hr className="w-full my-4 border text-[#72312e] font-bold" />
                    <li className="w-full p-2 rounded-2xl mt-5 text-center hover:bg-[var(--bg-hover)]">
                        <Link className=" text-white text-xl font-bold "> logout</Link>
                    </li>
                </ul>
            </div>
        </div>
    );


}        
