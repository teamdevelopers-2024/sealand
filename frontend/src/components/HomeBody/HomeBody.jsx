function HomeBody() {
  return (
    <>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        {/* Main Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 items-stretch">
          {/* Card 1 */}
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between">
            <h2 className="text-lg text-[#00BDD6] mb-2">Today's Revenue</h2>
            <p className="text-2xl font-bold">₹11,726</p>
            {/* Graph */}
            <div className="flex justify-between items-end mt-4 h-[135px]">
              <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[135px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[91px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[74px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[91px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[135px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[83px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-teal-500 via-teal-200 to-sky-200 h-[118px] w-[35px] rounded-3xl"></div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between">
            <h2 className="text-lg text-[#00BDD6] mb-2">Today's Expenses</h2>
            <p className="text-2xl font-bold">₹4,237</p>
            {/* Graph */}
            <div className="flex justify-between items-end mt-4 h-[135px]">
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[135px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[91px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[74px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[91px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[135px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[83px] w-[35px] rounded-3xl"></div>
              <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[118px] w-[35px] rounded-3xl"></div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Card 3 */}
            <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between">
              <h2 className="text-lg text-[#00BDD6] mb-2">Today's Customers</h2>
              <p className="text-2xl font-bold">13</p>
              <div className="mt-auto">
                <i className="text-xl">&#128100;</i>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between">
              <h2 className="text-lg text-[#00BDD6] mb-2">
                Yesterday's Revenue
              </h2>
              <p className="text-2xl font-bold">₹10,520</p>
              <div className="mt-auto">
                <i className="text-xl">&#128200;</i>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Income Table */}
        <div className="mt-8">
          <h2 className="text-lg text-teal-400 mb-4">Recent Income</h2>
          <div className="bg-gray-800 p-6 rounded-lg">
            <table className="w-full text-left">
              <thead>
                <tr>
                  <th className="text-teal-400">Date</th>
                  <th className="text-teal-400">Customer Name</th>
                  <th className="text-teal-400">Vehicle Number</th>
                  <th className="text-teal-400">Payment Type</th>
                  <th className="text-teal-400">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-gray-700">
                  <td>20-09-2024</td>
                  <td>Muhammed Danish</td>
                  <td>KL 13 A 5672</td>
                  <td>By UPI</td>
                  <td>₹1970</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td>20-09-2024</td>
                  <td>Ahmed Shehin</td>
                  <td>KL 56 R 7598</td>
                  <td>By Cash</td>
                  <td>₹1310</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td>20-09-2024</td>
                  <td>Muhammed Sinan</td>
                  <td>KL 11 H 3260</td>
                  <td>By UPI</td>
                  <td>₹1420</td>
                </tr>
                <tr className="border-t border-gray-700">
                  <td>20-09-2024</td>
                  <td>Dilshad</td>
                  <td>KL 11 A 0001</td>
                  <td>By UPI</td>
                  <td>₹3250</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeBody;
