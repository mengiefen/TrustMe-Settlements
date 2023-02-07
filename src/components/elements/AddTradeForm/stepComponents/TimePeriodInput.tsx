import React from "react";
import { useFormData } from "../FormDataContext";
import FormWrapper from "../FormWrapper";
const TimePeriodInput = () => {
  const { formData, setFormData } = useFormData();
  return (
    <FormWrapper title="Time Period">
      <label>Transaction Expiry Date</label>
      <input
        autoFocus
        type="date"
        name="datePeriod"
        required
        //   value={formData?.datePeriod || ""}
        onChange={(e) =>
          setFormData({ ...formData, datePeriod: e.target.value })
        }
        className="py-3 px-3 bg-slate-700 border-2 outline-non border-secondary-900 focus:border-secondary-700 w-full text-white"
      />
      <label>Transaction Expiry Time</label>
      <input
        className="py-3 px-3 bg-slate-700 border-2 outline-none border-secondary-900 focus:border-secondary-700 w-full text-white"
        autoFocus
        type="time"
        name="timePeriod"
        required
        //   value={formData?.timePeriod || ""}
        onChange={(e) =>
          setFormData({ ...formData, timePeriod: e.target.value })
        }
      />
    </FormWrapper>
  );
};
export default TimePeriodInput;
