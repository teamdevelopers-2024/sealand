import{r as l,j as e}from"./index-C1ClIUsl.js";import w from"./Navbar-l1se4mrj.js";import{R as D,L as k,X as L,Y as A,T as E,a as M,A as K}from"./AddIncome-DI1Q8Xvg.js";const I=[{name:"Jan",expense:1500},{name:"Feb",expense:3e3},{name:"Mar",expense:4500},{name:"Apr",expense:3500},{name:"May",expense:5e3},{name:"Jun",expense:7e3},{name:"Jul",expense:8e3},{name:"Aug",expense:9e3},{name:"Sep",expense:12e3},{name:"Oct",expense:11e3},{name:"Nov",expense:9e3},{name:"Dec",expense:13e3}],R=[{name:"Sun",expense:1e3},{name:"Mon",expense:2e3},{name:"Tue",expense:3e3},{name:"Wed",expense:1500},{name:"Thu",expense:2500},{name:"Fri",expense:4e3},{name:"Sat",expense:3500}],B=[{name:"2016",expense:6e4},{name:"2017",expense:7e4},{name:"2018",expense:8e4},{name:"2019",expense:9e4},{name:"2020",expense:95e3},{name:"2021",expense:105e3},{name:"2022",expense:115e3},{name:"2023",expense:125e3}],c=[{date:"18-09-2024",customerName:"Muhammed Danish",vehicleNumber:"KL 13 A 5672",paymentType:"By UPI",phoneNumber:"8921405362",amount:"₹ 1970"},{date:"18-09-2024",customerName:"Anjali Mehta",vehicleNumber:"KL 14 B 1234",paymentType:"Cash",phoneNumber:"9876543210",amount:"₹ 2500"},{date:"18-09-2024",customerName:"Rajesh Kumar",vehicleNumber:"KL 15 C 5678",paymentType:"By Card",phoneNumber:"8765432109",amount:"₹ 3000"},{date:"18-09-2024",customerName:"Sita Sharma",vehicleNumber:"KL 16 D 1357",paymentType:"By UPI",phoneNumber:"7654321098",amount:"₹ 2800"},{date:"18-09-2024",customerName:"Rahul Verma",vehicleNumber:"KL 17 E 2468",paymentType:"Cash",phoneNumber:"6543210987",amount:"₹ 1500"},{date:"18-09-2024",customerName:"Priya Singh",vehicleNumber:"KL 18 F 9876",paymentType:"By Card",phoneNumber:"5432109876",amount:"₹ 4000"},{date:"18-09-2024",customerName:"Vikram Rao",vehicleNumber:"KL 19 G 5432",paymentType:"By UPI",phoneNumber:"4321098765",amount:"₹ 3700"},{date:"18-09-2024",customerName:"Ravi Patel",vehicleNumber:"KL 20 H 9876",paymentType:"Cash",phoneNumber:"3210987654",amount:"₹ 2200"}],W=()=>{const[t,m]=l.useState("Monthly"),[o,r]=l.useState(106480),[p,y]=l.useState(!1),[s,i]=l.useState(1),d=5,N=a=>{const n=a.target.value;if(m(n),n==="Daily"){const P=new Date().toISOString().split("T")[0],C=c.filter(h=>h.date===P).reduce((h,S)=>h+parseInt(S.amount.replace(/[^\d]/g,"")),0);r(C)}else n==="Weekly"?r(24500):n==="Monthly"?r(106480):n==="Yearly"&&r(12e4)},j=t==="Weekly"?R:t==="Yearly"?B:I,u=s*d,b=u-d,g=p?c:c.slice(0,3),x=Math.ceil(c.length/d),f=()=>{s<x&&i(s+1)},v=()=>{s>1&&i(s-1)},T=()=>{y(!0),i(1)};return e.jsx(e.Fragment,{children:e.jsx("div",{className:"min-h-screen bg-gray-900 p-8 text-gray-100 relative",children:e.jsxs("main",{className:"mt-8",children:[e.jsxs("div",{className:"bg-gray-800 p-6 rounded-lg flex justify-between items-center mb-8",children:[e.jsxs("div",{className:"text-left space-y-3 w-1/3",children:[e.jsx("h2",{className:"text-5xl font-bold text-cyan-400",children:"Total Expense"}),e.jsxs("h3",{className:"text-4xl font-bold",children:["₹ ",o]}),e.jsx("p",{className:"text-gray-500",children:new Date().toLocaleDateString()}),e.jsxs("h2",{className:"text-4xl font-bold text-cyan-400",children:[t," Expense"]}),e.jsxs("h3",{className:"text-3xl font-bold",children:["₹ ",o]}),e.jsxs("p",{className:"text-xl text-cyan-400",children:["This ",t.toLowerCase(),": ₹ ",o]})]}),e.jsxs("div",{className:"w-2/4 relative",children:[e.jsx("div",{className:"absolute z-10 bottom--4 left-0 p-2",children:e.jsxs("select",{value:t,onChange:N,className:"bg-gray-700 px-4 py-2 rounded-lg text-cyan-400",children:[e.jsx("option",{value:"Daily",children:"Daily"}),e.jsx("option",{value:"Weekly",children:"Week"}),e.jsx("option",{value:"Monthly",children:"Month"}),e.jsx("option",{value:"Yearly",children:"Yearly"})]})}),e.jsx("div",{className:"mt-5",style:{width:"600px",height:"300px"},children:e.jsx(D,{width:"100%",height:"100%",children:e.jsxs(k,{data:j,children:[e.jsx(L,{dataKey:"name",stroke:"#999"}),e.jsx(A,{stroke:"#999",hide:!0}),e.jsx(E,{cursor:!1}),e.jsx(M,{type:"monotone",dataKey:"expense",stroke:"#00d8ff",strokeWidth:3,dot:{stroke:"#00d8ff",strokeWidth:2},activeDot:!1})]})})})]})]}),e.jsxs("div",{className:"bg-gray-800 p-6 rounded-lg",children:[e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsx("h3",{className:"text-2xl font-bold text-cyan-400",children:"Expense History"}),e.jsx("button",{onClick:T,className:"text-cyan-400",children:"See all"})]}),e.jsxs("table",{className:"w-full text-left",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-gray-500",children:[e.jsx("th",{className:"pb-2",children:"Date"}),e.jsx("th",{className:"pb-2",children:"Customer Name"}),e.jsx("th",{className:"pb-2",children:"Vehicle Number"}),e.jsx("th",{className:"pb-2",children:"Payment Type"}),e.jsx("th",{className:"pb-2",children:"Phone Number"}),e.jsx("th",{className:"pb-2",children:"Amount"}),e.jsx("th",{className:"pb-2",children:"Receipt"})]})}),e.jsx("tbody",{children:g.slice(b,u).map((a,n)=>e.jsxs("tr",{className:"border-t border-gray-700",children:[e.jsx("td",{className:"py-4",children:a.date}),e.jsx("td",{className:"py-4",children:a.customerName}),e.jsx("td",{className:"py-4",children:a.vehicleNumber}),e.jsx("td",{className:"py-4",children:a.paymentType}),e.jsx("td",{className:"py-4",children:a.phoneNumber}),e.jsx("td",{className:"py-4",children:a.amount}),e.jsx("td",{className:"py-4",children:e.jsx("button",{className:"bg-cyan-400 text-gray-900 px-3 py-1 rounded",children:"View"})})]},n))})]}),p&&e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsx("button",{onClick:v,disabled:s===1,className:"bg-cyan-400 px-4 py-2 rounded-lg",children:"← "}),e.jsxs("span",{className:"text-gray-500",children:["Page ",s," of ",x]}),e.jsx("button",{onClick:f,disabled:s===x,className:"bg-cyan-400 px-4 py-2 rounded-lg",children:"→ "})]})]})]})})})},V=()=>{const[t,m]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(w,{setAddIncomeModal:m}),e.jsx(W,{}),t&&e.jsx(K,{})]})};export{V as default};