"use client";

import { Range } from "react-date-range";
import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface PropertyReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const PropertyReservation = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}: PropertyReservationProps) => {
  return (
    <div className="bg-white border-[1px] rounded-xl border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">/ night</div>
      </div>

      <hr />

      <Calendar
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disabledDates={disabledDates}
      />

      <hr />

      <div className="p-4">
        <Button disabled={disabled} label='Reserve' onClick={onSubmit} />
      </div>

      <hr />

      
    </div>
  );
};

export default PropertyReservation;
