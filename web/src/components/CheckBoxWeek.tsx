import { Check } from "phosphor-react";
import * as Checkbox from "@radix-ui/react-checkbox";

interface Props {
  weekDay: string;
}

export function CheckBoxWeek({ weekDay }: Props) {
  return (
    <div className="mt-2 flex flex-col gap-3">
      <Checkbox.Root className="flex items-center gap-3 group">
        <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500  group-data-[state=checked]:border-green-500">
          <Checkbox.Indicator>
            <Check size={20} className="text-white" />
          </Checkbox.Indicator>
        </div>

        <span className="font-semibold text-white leading-tight ">
          {weekDay}
        </span>
      </Checkbox.Root>
    </div>
  );
}
