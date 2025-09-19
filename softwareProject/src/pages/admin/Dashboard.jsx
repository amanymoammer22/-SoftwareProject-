import Drawer from "./Drawer";

export default function Dashboard() {

  return (
      <div className="bg-[var(--bg-footer)] min-h-screen p-4">
          {/* Grid رئيسي: محتوى + Sidebar */}
          <div className="grid grid-cols-[1fr_290px] gap-4 max-lg:grid-cols-1">
              {/* محتوى Dashboard */}
              <article className="px-4 max-lg:order-2 py-5">
                  <div className="flex flex-col sm:flex-row rounded-2xl bg-[#F5F5F585] p-4 sm:p-6 gap-4 ">
                      <h1 className="text-3xl font-bold font-[Inknut_Antiqua]">Dashboard</h1>
                      <span className="text-xl font-bold font-[Inknut_Antiqua] text-gray-400">Welcome, Artisan!</span>
                  </div>

                  {/*    */}

                  <div className="grid grid-cols-4 gap-4 my-6 max-md:grid-cols-2 max-sm:grid-cols-1">
                      <div className="bg-gray-100 p-4 rounded flex items-center gap-4">
                          <span  className="text-black">
                            
                          </span>
                          <h2> Total Products: 1</h2>
                      </div>
                      <div className="bg-gray-100 p-4 rounded">Total Orders: 0</div>
                      <div className="bg-gray-100 p-4 rounded">Pending Orders: 0</div>
                      <div className="bg-gray-100 p-4 rounded">Total Revenue: $0</div>
                  </div>

                  <h3 className="font-semibold mb-2">Recent Orders</h3>
                  <table className="w-full border">
                      <thead>
                          <tr className="bg-gray-200">
                              <th>Order ID</th>
                              <th>Customer</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Date</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td colSpan="5" className="text-center p-4">
                                  No Orders Found
                              </td>
                          </tr>
                      </tbody>
                  </table>
              </article>

              {/* Sidebar */}
              <aside className="flex flex-col gap-4 py-5 max-lg:order-1">
                  <Drawer />
              </aside>
          </div>
      </div>
  );
}

