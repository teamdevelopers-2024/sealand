import{R as f,r as i,j as e}from"./index-BxYWePMw.js";import M from"./Navbar-cWCp_6gl.js";var R={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},O=f.createContext&&f.createContext(R),T=["attr","size","title"];function E(t,s){if(t==null)return{};var a=W(t,s),n,r;if(Object.getOwnPropertySymbols){var d=Object.getOwnPropertySymbols(t);for(r=0;r<d.length;r++)n=d[r],!(s.indexOf(n)>=0)&&Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}function W(t,s){if(t==null)return{};var a={};for(var n in t)if(Object.prototype.hasOwnProperty.call(t,n)){if(s.indexOf(n)>=0)continue;a[n]=t[n]}return a}function S(){return S=Object.assign?Object.assign.bind():function(t){for(var s=1;s<arguments.length;s++){var a=arguments[s];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(t[n]=a[n])}return t},S.apply(this,arguments)}function D(t,s){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);s&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),a.push.apply(a,n)}return a}function A(t){for(var s=1;s<arguments.length;s++){var a=arguments[s]!=null?arguments[s]:{};s%2?D(Object(a),!0).forEach(function(n){F(t,n,a[n])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):D(Object(a)).forEach(function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(a,n))})}return t}function F(t,s,a){return s=H(s),s in t?Object.defineProperty(t,s,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[s]=a,t}function H(t){var s=V(t,"string");return typeof s=="symbol"?s:s+""}function V(t,s){if(typeof t!="object"||!t)return t;var a=t[Symbol.toPrimitive];if(a!==void 0){var n=a.call(t,s||"default");if(typeof n!="object")return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return(s==="string"?String:Number)(t)}function _(t){return t&&t.map((s,a)=>f.createElement(s.tag,A({key:a},s.attr),_(s.child)))}function z(t){return s=>f.createElement(I,S({attr:A({},t.attr)},s),_(t.child))}function I(t){var s=a=>{var{attr:n,size:r,title:d}=t,y=E(t,T),p=r||a.size||"1em",h;return a.className&&(h=a.className),t.className&&(h=(h?h+" ":"")+t.className),f.createElement("svg",S({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},a.attr,n,y,{className:h,style:A(A({color:t.color||a.color},a.style),t.style),height:p,width:p,xmlns:"http://www.w3.org/2000/svg"}),d&&f.createElement("title",null,d),t.children)};return O!==void 0?f.createElement(O.Consumer,null,a=>s(a)):s(R)}function L(t){return z({tag:"svg",attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"},child:[]}]})(t)}const B=({show:t,onClose:s})=>{const[a,n]=i.useState(""),[r,d]=i.useState(""),[y,p]=i.useState(""),[h,P]=i.useState(""),[v,w]=i.useState(""),[g,C]=i.useState(""),[b,N]=i.useState([{description:"",amount:"",reference:""}]),c=()=>{N([...b,{description:"",amount:"",reference:""}])},o=(l,m,j)=>{const k=[...b];k[l][m]=j,N(k)},u=l=>{const m=b.filter((j,k)=>k!==l);N(m)},x=l=>{l.preventDefault(),s()};return t?e.jsx("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full",children:e.jsxs("div",{className:"relative top-20 mx-auto p-5 border w-[700px] shadow-lg rounded-md bg-gray-800",children:[e.jsx("h3",{className:"text-lg text-teal-400 font-bold mb-4",children:"Add Customer"}),e.jsxs("form",{onSubmit:x,className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Date of Service"}),e.jsx("input",{type:"date",className:"w-full h-10 px-3 rounded bg-gray-700 text-white",value:a,onChange:l=>n(l.target.value),placeholder:"Car care date"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Customer Name"}),e.jsx("input",{type:"text",placeholder:"Customer name",className:"w-full h-10 px-3 rounded bg-gray-700 text-white",value:r,onChange:l=>d(l.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Vehicle Number"}),e.jsx("input",{type:"text",placeholder:"Vehicle number",className:"w-full h-10 px-3 rounded bg-gray-700 text-white",value:y,onChange:l=>p(l.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Phone Number"}),e.jsx("input",{type:"text",placeholder:"Phone number",className:"w-full h-10 px-3 rounded bg-gray-700 text-white",value:h,onChange:l=>P(l.target.value)})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Payment Method"}),e.jsxs("select",{className:"w-full h-10 px-3 rounded bg-gray-700 text-white",value:v,onChange:l=>w(l.target.value),children:[e.jsx("option",{value:"",disabled:!0,children:"Payment Method"}),e.jsx("option",{value:"cash",children:"Cash"}),e.jsx("option",{value:"card",children:"Card"}),e.jsx("option",{value:"online",children:"Online"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Credit Amount"}),e.jsx("input",{type:"number",placeholder:"Credit amount",className:"w-full h-10 px-3 rounded bg-gray-700 text-white",value:g,onChange:l=>C(l.target.value)})]})]}),e.jsxs("table",{className:"w-full mb-4 text-white",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Work Description"}),e.jsx("th",{children:"Amount"}),e.jsx("th",{children:"Reference"}),e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:b.map((l,m)=>e.jsxs("tr",{children:[e.jsx("td",{children:m+1}),e.jsx("td",{children:e.jsx("label",{className:"block",children:e.jsx("input",{type:"text",name:"description",value:l.description,onChange:j=>o(m,"description",j.target.value),className:"p-2 bg-gray-700 rounded w-full",placeholder:"Name of the work"})})}),e.jsx("td",{children:e.jsx("label",{className:"block",children:e.jsx("input",{type:"number",name:"amount",value:l.amount,onChange:j=>o(m,"amount",j.target.value),className:"p-2 bg-gray-700 rounded w-full",placeholder:"Amount of work"})})}),e.jsx("td",{children:e.jsx("label",{className:"block",children:e.jsx("input",{type:"text",name:"reference",value:l.reference,onChange:j=>o(m,"reference",j.target.value),className:"p-2 bg-gray-700 rounded w-full",placeholder:"Additional information"})})}),e.jsx("td",{children:e.jsx("button",{className:"text-red-500",onClick:()=>u(m),children:"🗑"})})]},m))})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("button",{type:"button",className:"text-teal-400 text-sm",onClick:c,children:"+ Add Field"}),e.jsxs("p",{className:"text-white",children:["Total Amount: ₹",b.reduce((l,m)=>l+parseFloat(m.amount||0),0)]}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsx("button",{type:"button",onClick:s,className:"px-4 py-2 bg-gray-600 text-gray-300 rounded",children:"Cancel"}),e.jsx("button",{type:"submit",className:"px-4 py-2 bg-teal-400 text-gray-900 rounded",children:"Save"})]})]})]})]})}):null},K=({show:t,onClose:s,customer:a})=>t?e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50",children:e.jsxs("div",{className:"bg-gray-800 text-gray-300 rounded-lg w-full max-w-3xl p-6",children:[e.jsxs("h2",{className:"text-xl font-bold mb-4",children:["Transaction History - ",a.name]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"table-auto w-full text-left text-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-700",children:[e.jsx("th",{className:"px-4 py-2",children:"Date"}),e.jsx("th",{className:"px-4 py-2",children:"Vehicle number"}),e.jsx("th",{className:"px-4 py-2",children:"Phone number"}),e.jsx("th",{className:"px-4 py-2",children:"Payment type"}),e.jsx("th",{className:"px-4 py-2",children:"Paid amount"}),e.jsx("th",{className:"px-4 py-2",children:"Reciept"})]})}),e.jsx("tbody",{className:"bg-gray-700",children:e.jsxs("tr",{className:"border-t border-gray-600",children:[e.jsx("td",{className:"px-4 py-2",children:a.date}),e.jsx("td",{className:"px-4 py-2",children:a.vehicleNumber}),e.jsx("td",{className:"px-4 py-2",children:a.phoneNumber}),e.jsx("td",{className:"px-4 py-2",children:"By UPI"}),e.jsx("td",{className:"px-4 py-2",children:a.paidAmount}),e.jsx("td",{className:"px-4 py-2",children:e.jsx("button",{className:"bg-teal-400 text-gray-900 px-4 py-1 rounded-md ml-2",children:"View"})})]})})]})}),e.jsx("div",{className:"mt-6 text-right",children:e.jsx("button",{onClick:s,className:"bg-teal-400 text-gray-900 px-4 py-2 rounded-md",children:"Close"})})]})}):null,U=({show:t,onClose:s,customer:a})=>{const[n,r]=i.useState("");return t?e.jsx("div",{className:"fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center",children:e.jsxs("div",{className:"bg-gray-800 text-gray-300 p-6 rounded-md w-full max-w-2xl",children:[e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Payment Details"}),e.jsxs("form",{children:[e.jsxs("div",{className:"grid grid-cols-3 gap-4 mb-4",children:[e.jsxs("div",{className:"col-span-2 md:col-span-1",children:[e.jsx("label",{className:"block mb-2",children:"Date of repayment"}),e.jsx("input",{type:"date",className:"w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"})]}),e.jsxs("div",{className:"col-span-2 md:col-span-1",children:[e.jsx("label",{className:"block mb-2",children:"Customer name"}),e.jsx("input",{type:"text",value:a.name,readOnly:!0,className:"w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"})]}),e.jsxs("div",{className:"col-span-2 md:col-span-1",children:[e.jsx("label",{className:"block mb-2",children:"Vehicle number"}),e.jsx("input",{type:"text",value:a.vehicleNumber,readOnly:!0,className:"w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"})]}),e.jsxs("div",{className:"col-span-2 md:col-span-1",children:[e.jsx("label",{className:"block mb-2",children:"Repayment amount"}),e.jsx("input",{type:"number",value:n,onChange:d=>r(d.target.value),placeholder:"Maximum repay amount: ₹2660",className:"w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"})]}),e.jsxs("div",{className:"col-span-2 md:col-span-1",children:[e.jsx("label",{className:"block mb-2",children:"Payment method"}),e.jsxs("select",{className:"w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none",children:[e.jsx("option",{value:"",children:"How did you pay?"}),e.jsx("option",{value:"UPI",children:"UPI"}),e.jsx("option",{value:"Cash",children:"Cash"}),e.jsx("option",{value:"Card",children:"Card"})]})]})]}),e.jsxs("div",{className:"flex justify-end space-x-4",children:[e.jsx("button",{type:"button",className:"px-4 py-2 bg-gray-600 rounded-md",onClick:s,children:"Cancel"}),e.jsx("button",{type:"submit",className:"px-4 py-2 bg-teal-400 text-gray-900 rounded-md",children:"Save"})]})]})]})}):null},G=({customer:t,onClose:s})=>{const[a,n]=i.useState([{description:"",amount:"",reference:""}]),[r,d]=i.useState(0),[y,p]=i.useState(t.vehicleNumber),[h,P]=i.useState(""),[v,w]=i.useState(""),g=(c,o,u)=>{const x=[...a];x[c][o]=u,n(x),C(x)},C=c=>{const o=c.reduce((u,x)=>u+(parseFloat(x.amount)||0),0);d(o)},b=c=>{const o=a.filter((u,x)=>x!==c);n(o),C(o)},N=()=>{n([...a,{description:"",amount:"",reference:""}])};return e.jsx("div",{className:"fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center",children:e.jsxs("div",{className:"bg-gray-800 text-white p-6 rounded-lg shadow-lg w-2/3",children:[e.jsxs("h2",{className:"text-2xl mb-4",children:["Add Credit for ",t.name]}),e.jsxs("div",{className:"grid grid-cols-3 gap-4 mb-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block mb-1",children:"Date of service"}),e.jsx("input",{type:"date",className:"w-full px-3 py-2 rounded bg-gray-700 text-white"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-1",children:"Customer Name"}),e.jsx("input",{type:"text",value:t.name,disabled:!0,className:"w-full px-3 py-2 rounded bg-gray-700 text-white"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-1",children:"Phone Number"}),e.jsx("input",{type:"text",value:t.phoneNumber,disabled:!0,className:"w-full px-3 py-2 rounded bg-gray-700 text-white"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-1",children:"Vehicle Number"}),e.jsx("input",{type:"text",value:y,onChange:c=>p(c.target.value),className:"w-full px-3 py-2 rounded bg-gray-700 text-white"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-1",children:"Payment Type"}),e.jsxs("select",{className:"w-full px-3 py-2 rounded bg-gray-700 text-white",value:h,onChange:c=>P(c.target.value),children:[e.jsx("option",{value:"",children:"Select Payment Type"}),e.jsx("option",{value:"Cash",children:"Cash"}),e.jsx("option",{value:"Card",children:"Card"}),e.jsx("option",{value:"Online",children:"Online"})]})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block mb-1",children:"Credit Amount"}),e.jsx("input",{type:"number",value:v,onChange:c=>w(c.target.value),className:"w-full px-3 py-2 rounded bg-gray-700 text-white",placeholder:"Enter credit amount"})]})]}),e.jsxs("div",{className:"mb-4",children:[e.jsx("h3",{className:"text-xl mb-2",children:"Work Details"}),e.jsxs("div",{className:"grid grid-cols-[3fr_3fr_3fr_1fr] gap-4 mb-2 font-bold",children:[e.jsx("div",{children:"Description"}),e.jsx("div",{children:"Amount"}),e.jsx("div",{children:"Reference"}),e.jsx("div",{children:"Action"})]}),a.map((c,o)=>e.jsxs("div",{className:"grid grid-cols-[3fr_3fr_3fr_1fr] gap-4 mb-2",children:[e.jsx("input",{type:"text",placeholder:"Work description",className:"px-3 py-2 rounded bg-gray-700 text-white",value:c.description,onChange:u=>g(o,"description",u.target.value)}),e.jsx("input",{type:"number",placeholder:"Amount",className:"px-3 py-2 rounded bg-gray-700 text-white",value:c.amount,onChange:u=>g(o,"amount",u.target.value)}),e.jsx("input",{type:"text",placeholder:"Reference",className:"px-3 py-2 rounded bg-gray-700 text-white",value:c.reference,onChange:u=>g(o,"reference",u.target.value)}),e.jsx(L,{className:"text-red-500 cursor-pointer self-center",onClick:()=>b(o)})]},o)),e.jsx("button",{className:"bg-teal-400 text-gray-900 px-4 py-2 rounded-md",onClick:N,children:"Add Field"})]}),e.jsx("div",{className:"mb-4",children:e.jsxs("label",{className:"block text-xl mb-2",children:["Total Amount: ₹",r]})}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{className:"bg-red-500 text-white px-4 py-2 rounded-md mr-2",onClick:s,children:"Cancel"}),e.jsx("button",{className:"bg-teal-400 text-gray-900 px-4 py-2 rounded-md",children:"Save"})]})]})})},q=()=>{const[t,s]=i.useState(!1),[a,n]=i.useState(!1),[r,d]=i.useState(null),[y,p]=i.useState(!1),[h,P]=i.useState(""),[v,w]=i.useState(!1),g=[{date:"10-12-2024",name:"Sinan",vehicleNumber:"KL 13 A 5672",phoneNumber:"8921405362",creditAmount:4660,paidAmount:1970},{date:"10-12-2024",name:"Dilshad",vehicleNumber:"KL 19 A 0505",phoneNumber:"9632587459",creditAmount:5600,paidAmount:2300}],C=(l,m)=>l-m,b=l=>{d(l),n(!0)},N=()=>{n(!1),d(null)},c=l=>{d(l),p(!0)},o=()=>{p(!1),d(null)},u=l=>{d(l),w(!0)},x=()=>{w(!1),d(null)};return e.jsxs("div",{className:"bg-gray-900 min-h-screen p-10",children:[e.jsxs("div",{className:"container p-6 mx-auto",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsx("h1",{className:"text-3xl font-bold text-teal-400",children:"Customer Data"}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("input",{type:"text",placeholder:"Search customer...",className:"w-64 h-10 px-3 rounded bg-gray-700 text-white",onChange:l=>P(l.target.value)}),e.jsx("button",{className:"bg-teal-400 text-gray-900 px-4 py-2 rounded-md",onClick:()=>s(!0),children:"Add New Customer"})]})]}),e.jsx("div",{className:"overflow-x-auto p-2",children:e.jsxs("table",{className:"table-auto w-full text-left text-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-800",children:[e.jsx("th",{className:"px-4 py-2",children:"Date"}),e.jsx("th",{className:"px-4 py-2",children:"Name"}),e.jsx("th",{className:"px-4 py-2",children:"Vehicle number"}),e.jsx("th",{className:"px-4 py-2",children:"Phone number"}),e.jsx("th",{className:"px-4 py-2",children:"Credit amount"}),e.jsx("th",{className:"px-4 py-2",children:"Paid amount"}),e.jsx("th",{className:"px-4 py-2",children:"Due amount"}),e.jsx("th",{className:"px-4 py-2",children:"Credit / Repayment"}),e.jsx("th",{className:"px-4 py-2",children:"History"})]})}),e.jsx("tbody",{className:"bg-gray-700",children:g.map((l,m)=>e.jsxs("tr",{className:"border-t border-gray-600",children:[e.jsx("td",{className:"px-4 py-2",children:l.date}),e.jsx("td",{className:"px-4 py-2",children:l.name}),e.jsx("td",{className:"px-4 py-2",children:l.vehicleNumber}),e.jsx("td",{className:"px-4 py-2",children:l.phoneNumber}),e.jsxs("td",{className:"px-4 py-2",children:["₹",l.creditAmount]}),e.jsxs("td",{className:"px-4 py-2",children:["₹",l.paidAmount]}),e.jsxs("td",{className:"px-4 py-2",children:["₹",C(l.creditAmount,l.paidAmount)]}),e.jsxs("td",{className:"px-4 py-2",children:[e.jsx("button",{className:"bg-yellow-400 text-gray-900 px-4 py-1 rounded-md",onClick:()=>u(l),children:"Credit"}),e.jsx("button",{className:"bg-teal-400 text-gray-900 px-4 py-1 rounded-md ml-2",onClick:()=>c(l),children:"Pay"})]}),e.jsx("td",{className:"px-4 py-2",children:e.jsx("button",{className:"bg-gray-600 text-gray-300 px-4 py-1 rounded-md",onClick:()=>b(l),children:"See history"})})]},m))})]})}),e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsx("p",{className:"text-gray-400",children:"2 of 13 Pages"}),e.jsxs("div",{className:"flex space-x-2",children:[e.jsx("button",{className:"px-3 py-1 rounded bg-gray-800 text-gray-300",children:"1"}),e.jsx("button",{className:"px-3 py-1 rounded bg-teal-400 text-gray-900",children:"2"}),e.jsx("button",{className:"px-3 py-1 rounded bg-gray-800 text-gray-300",children:"3"}),e.jsx("button",{className:"px-3 py-1 rounded bg-gray-800 text-gray-300",children:"..."}),e.jsx("button",{className:"px-3 py-1 rounded bg-gray-800 text-gray-300",children:"13"})]})]})]}),r&&y&&e.jsx(U,{show:y,onClose:o,customer:r}),r&&a&&e.jsx(K,{show:a,onClose:N,customer:r}),t&&e.jsx(B,{show:t,onClose:()=>s(!1)}),r&&v&&e.jsx(G,{show:v,customer:r,onClose:x})]})},X=()=>e.jsxs(e.Fragment,{children:[e.jsx(M,{}),e.jsx(q,{})]});export{X as default};