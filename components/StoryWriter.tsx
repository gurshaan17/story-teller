'use client'

import { Textarea } from "./ui/textarea"

function StoryWriter() {
  return (
    <div className="flex flex-col container">
        <section className="flex-1 flex flex-col border border-purple-300 rounded-md  p-10 space-y-2">
            <Textarea />
        </section>
    </div>
  )
}

export default StoryWriter