import { GeoJsonBooth } from "@/app/student/map/lib/booths"
import { Exhibitor } from "@/components/shared/hooks/api/useExhibitors"
import { useState } from "react"

export function FeatureEditor({
  feat,
  setActiveFeatureId,
  exhibitorsByID,
  onSave,
  onDelete
}: {
  feat: GeoJsonBooth
  setActiveFeatureId: (id: number | null) => void
  exhibitorsByID: Map<number, Exhibitor>
  onSave: (feat: GeoJsonBooth) => void
  onDelete: (feat: GeoJsonBooth) => void
}) {
  const props = feat.properties

  const [exhibitorId, setExhibitorId] = useState<number>(props.exhibitorId)

  return (
    <div className="z-50 flex flex-col gap-4 divide-neutral-400 text-base text-stone-950">
      <div className="">
        <b>Booth ID:</b> {props.id}
      </div>
      <div className="flex items-center">
        <b>Exhibitor:</b>
        <select
          className="ml-1 w-full rounded-md bg-stone-300 p-0.5 hover:cursor-pointer"
          value={exhibitorId}
          onChange={e => {
            const newExhibitorId = parseInt(e.target.value)
            setExhibitorId(newExhibitorId)
            onSave({
              ...feat,
              properties: { ...props, exhibitorId: newExhibitorId }
            })
          }}>
          <option value={-1}>None</option>
          {Array.from(exhibitorsByID.values()).map(e => (
            <option key={e.id} value={e.id}>
              {e.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-between border-t border-stone-300 pt-3">
        <button
          className="w-max flex-none rounded-md bg-red-300 p-1 transition hover:bg-red-400"
          onClick={() => {
            onDelete(feat)
          }}>
          Delete
        </button>
        <button
          className="w-max flex-none rounded-md bg-stone-300 p-1 transition hover:bg-stone-400"
          onClick={() => {
            setActiveFeatureId(null)
          }}>
          Close
        </button>
      </div>
    </div>
  )
}
