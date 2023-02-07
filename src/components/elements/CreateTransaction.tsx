// import React from "react";
// import Tokendrop from "@/components/elements/DropDown/Tokendrop";
// import TokenData from "./DropDown/Data";
// import { RequestData } from "next/dist/server/web/types";

// const CreateTransaction = () => {
//   function checkAccount(address: string) {
//     const patternAddress = /^0x[a-fA-F0-9]{40}$/;
//     const patternENS = /^[a-zA-Z0-9()]{1,256}\.eth$\s*/;
//     if (!patternAddress.test(address)) {
//       return patternENS.test(address);
//     }
//     return patternAddress.test(address);
//   }

//   //for amount will be called on form submit
//   function isZero(val: number) {
//     if (val == null || val === 0) {
//       alert("Enter valid amount");
//     }
//   }

//   //for adding minimum date to date picker
//   function getToday() {
//     const date = new Date();
//     let month = date.getMonth() + 1;
//     let year = date.getUTCFullYear().toString();
//     let tdate =
//       date.getDate() < 10 ? "0" + date.getDate() : date.getDate().toString();
//     let mon = month < 10 ? "0" + month : month.toString();
//     return year + "-" + mon + "-" + tdate;
//   }

//   // function validateForm(event:SubmitEvent){
//   //   const form = event.target as HTMLFormElement;
//   //   const formData = new FormData(form) as unknown as Iterable<[RequestData, FormDataEntryValue]>;

//   //   const requestData : RequestData = Object.fromEntries(formData);
//   // }

//   return (
//     <form className="flex items-center justify-center py-5 ">
//       <div className="w-[310px] h-[470px] bg-text rounded-md flex flex-col border-[1px] px-[15px]">
//         <h3 className="py-5">Submit New Trade</h3>

//         <div className="input-fields flex flex-col h-[38px]">
//           <input
//             required
//             type="text"
//             id="address"
//             className="w-full h-full border-[2px] border-gray-100 rounded-md text-xs py-1 px-2"
//             placeholder="Address Counterparty"
//           ></input>
//         </div>

//         <div className="flex flex-col py-[5px]">
//           <div className="flex flex-row items-center h-[38px]">
//             <Tokendrop
//               title="Token to transfer"
//               name="tokens"
//               OptionData={TokenData}
//             />
//             <input
//               required
//               type="text"
//               id="Tokenamt"
//               className="w-2/5 h-full border-[2px] border-gray-100 rounded-md text-xs py-1 px-2"
//               placeholder="Amount"
//             ></input>
//           </div>

//           <div className="flex flex-row items-center h-[38px]">
//             <Tokendrop
//               title="Address token to receive"
//               name="tokens"
//               OptionData={TokenData}
//             />
//             <input
//               required
//               type="text"
//               id="CPtokenamt"
//               className="w-2/5 h-full border-[2px] border-gray-100 rounded-md text-xs py-1 px-2"
//               placeholder="Amount"
//             ></input>
//           </div>
//         </div>

//         <div className="date-time flex flex-row">
//           <div className="w-1/2 h-[38px] pr-1">
//             <input
//               required
//               placeholder="Expiry Date"
//               className="w-full h-full text-xs pl-2 border-gray-100 rounded-md border-[2px] py-1"
//               type="date"
//               min={getToday()}
//             ></input>
//           </div>
//           <div className="w-1/2 h-[38px] pl-1">
//             <input
//               required
//               placeholder="Expiry Time"
//               className="w-full h-full text-xs pl-2 border-gray-100 rounded-md border-[2px] py-1"
//               type="time"
//             ></input>
//           </div>
//         </div>

//         <div className="btn-div h-[50px] mt-[60px]">
//           <button
//             type="submit"
//             className="w-full h-full bg-secondary-600 rounded-sm"
//           >
//             {" "}
//             Submit Trade
//           </button>
//         </div>
//       </div>
//     </form>
//   );
// };

// export default CreateTransaction;
