import { useEffect, useState } from "react";
import { useSpring, animated, useTransition } from "@react-spring/web";
import api from "../../services/api";
import revenueIcon from '../../assets/revenueIcon.svg';
import expenseIcon from '../../assets/expenseIcon.svg';
import customersIcon from '../../assets/customersIcon.svg';

function HomeBody() {
  const [data, setData] = useState({ todayIncome: 0, todayExpense: 0, todayCustomerCount: 0, yesterdayIncome: 0 });
  const [incomes, setIncomes] = useState([])
  const [expense, setExpense] = useState([])
  const [showShade, setShowShade] = useState(false);

  // Spring animations for numbers with scaling effect
  const todayIncomeSpring = useSpring({
    from: { number: 0, scale: 0.9 },
    to: { number: data.todayIncome, scale: 1 },
    config: { tension: 170, friction: 26 },
    reset: true,
  });

  const todayExpenseSpring = useSpring({
    from: { number: 0, scale: 0.9 },
    to: { number: data.todayExpense, scale: 1 },
    config: { tension: 170, friction: 26 },
    reset: true,
  });

  const todayCustomerCountSpring = useSpring({
    from: { number: 0, scale: 0.9 },
    to: { number: data.todayCustomerCount, scale: 1 },
    config: { tension: 170, friction: 26 },
    reset: true,
  });

  const yesterdayIncomeSpring = useSpring({
    from: { number: 0, scale: 0.9 },
    to: { number: data.yesterdayIncome, scale: 1 },
    config: { tension: 170, friction: 26 },
    reset: true,
  });

  // Transition effect for shading
  const transitions = useTransition(showShade, {
    from: { backgroundColor: "transparent" },
    enter: { backgroundColor: "rgba(255, 255, 255, 0.1)" },
    leave: { backgroundColor: "transparent" },
    config: { duration: 500 },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await api.getTodayIncomeAndExpense();
        if (!result.error) {
          setData(result);
          console.log(result)
          setExpense(result.latestExpenses)
          setIncomes(result.latestIncomes)
          setShowShade(true); // Trigger shading effect
          setTimeout(() => setShowShade(false), 500); // Reset shading after animation
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-16">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 items-stretch">
        {/* Card 1 - Today's Revenue */}
        <div className="bg-gray-800 p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
          {transitions((styles, item) =>
            item && <animated.div style={styles} className="absolute inset-0 rounded-xl" />
          )}
          <div className="flex flex-row justify-between">
            <h2 className="text-lg text-[#00BDD6] mb-2">Today's Revenue</h2>
            <div className="px-0.5 py-0.5 border border-[#00BDD6] rounded-md">
              <img src={revenueIcon} alt="" />
            </div>
          </div>
          <p className="text-2xl font-bold">
            <animated.span
              style={{
                transform: todayIncomeSpring.scale.to((s) => `scale(${s})`),
                position: "relative",
                display: "inline-block",
                overflow: "hidden",
              }}
              className="number-glance-effect"
            >
              {todayIncomeSpring.number.to((n) =>
                new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(n.toFixed(0))
              )}
            </animated.span>
          </p>
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

        {/* Card 2 - Today's Expenses */}
        <div className="bg-gray-800 p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
          {transitions((styles, item) =>
            item && <animated.div style={styles} className="absolute inset-0 rounded-xl" />
          )}
          <div className="flex flex-row justify-between">
            <h2 className="text-lg text-[#00BDD6] mb-2">Today's Expenses</h2>
            <div className="px-0.5 py-0.5 border border-[#00BDD6] rounded-md">
              <img src={expenseIcon} alt="" />
            </div>
          </div>
          <p className="text-2xl font-bold">
            <animated.span
              style={{
                transform: todayExpenseSpring.scale.to((s) => `scale(${s})`),
                position: "relative",
                display: "inline-block",
                overflow: "hidden",
              }}
              className="number-glance-effect"
            >
              {todayExpenseSpring.number.to((n) =>
                new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(n.toFixed(0))
              )}
            </animated.span>
          </p>
          {/* Graph */}
          <div className="flex justify-between items-end mt-4 h-[135px]">
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[87px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[129px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[70px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[119px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[87px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[79px] w-[35px] rounded-3xl"></div>
            <div className="bg-gradient-to-b from-amber-400 via-amber-300 to-amber-100 h-[112px] w-[35px] rounded-3xl"></div>
          </div>
        </div>

        <div className="space-y-4">
          {/* Card 3 - Today's Customers */}
          <div className="bg-gray-800 p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
            {transitions((styles, item) =>
              item && <animated.div style={styles} className="absolute inset-0 rounded-xl" />
            )}
            <div className="flex flex-row justify-between">
              <h2 className="text-lg text-[#00BDD6] mb-2">Today's Customers</h2>
              <div className="px-0.5 py-0.5 border border-[#00BDD6] rounded-md">
                <img src={customersIcon} alt="" />
              </div>
            </div>
            <p className="text-2xl font-bold">
              <animated.span
                style={{
                  transform: todayCustomerCountSpring.scale.to((s) => `scale(${s})`),
                  position: "relative",
                  display: "inline-block",
                  overflow: "hidden",
                }}
                className="number-glance-effect"
              >
                {todayCustomerCountSpring.number.to((n) => n.toFixed(0))}
              </animated.span>
            </p>
            <p className="invisible">hello</p>
          </div>

          {/* Card 4 - Yesterday's Revenue */}
          <div className="bg-gray-800 p-6 rounded-xl flex flex-col justify-between relative overflow-hidden">
            {transitions((styles, item) =>
              item && <animated.div style={styles} className="absolute inset-0 rounded-xl" />
            )}
            <div className="flex flex-row justify-between">
              <h2 className="text-lg text-[#00BDD6] mb-2">Yesterday's Revenue</h2>
              <div className="px-0.5 py-0.5 border border-[#00BDD6] rounded-md">
                <img src={revenueIcon} alt="" />
              </div>
            </div>
            <p className="text-2xl font-bold">
              <animated.span
                style={{
                  transform: yesterdayIncomeSpring.scale.to((s) => `scale(${s})`),
                  position: "relative",
                  display: "inline-block",
                  overflow: "hidden",
                }}
                className="number-glance-effect"
              >
                {yesterdayIncomeSpring.number.to((n) =>
                  new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(n.toFixed(0))
                )}
              </animated.span>
            </p>
            <p className="invisible">hello</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-lg text-teal-400 mb-4">Recent Income</h2>
        <div className="bg-gray-800 p-6 rounded-xl">
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
              {incomes.map((income, index) => {
                <tr id={index} className="border-t border-gray-700">
                  <td>{income.workDate}</td>
                  <td>Muhammed Danish</td>
                  <td>KL 13 A 5672</td>
                  <td>By UPI</td>
                  <td>₹1970</td>
                </tr>
              })}

            </tbody>
          </table>
        </div>
      </div>


      <div className="mt-8">
        <h2 className="text-lg text-teal-400 mb-4">Recent Expense</h2>
        <div className="bg-gray-800 p-6 rounded-xl">
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
                <td>₹1315</td>
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
  );
}

export default HomeBody;
