import { fetchDates } from "@/components/shared/hooks/api/useDates"
import { DateTime } from "luxon"

export async function FairDates() {
  const dates = await fetchDates()

  return (
    <div className="mt-5 flex gap-4 font-bebas-neue">
      <p className="text-2xl uppercase text-stone-400">Fair:</p>
      <div className="flex">
        {[
          // Pick first and last day (ASSUMPTION: days are sorted and continuous)
          dates.fair.days[0],
          dates.fair.days[dates.fair.days.length - 1]
        ].map((date, index, list) => (
          <p key={date} className="text-2xl text-stone-400">
            {DateTime.fromISO(date).toFormat(
              // Only add month and year to last
              `d${index == list.length - 1 ? " MMM" : "-"}${DateTime.fromISO(date).year !== DateTime.now().year ? " YYYY" : ""}`
            )}
          </p>
        ))}
      </div>
    </div>
  )
}
