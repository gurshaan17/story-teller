import g from "@/lib/gptScriptInstance";
import { RunEventType, RunOpts } from "@gptscript-ai/gptscript";
import { NextRequest } from "next/server";

const script = "app/api/run-script/story-book.gpt"

export async function POST(request: NextRequest){
    const { story, pages, path } = await request.json();

    const opts:RunOpts = {
        disableCache: true,
        input: `--story ${story} --pages ${pages} --path ${path}`,

    }

    try{
        const encoder = new TextEncoder();
        const stream = new ReadableStream({
            async start(controller) {
                try{
                    const run = await g.run(script, opts)
                    run.on(RunEventType.Event, (data) => {
                        controller.enqueue(encoder.encode(
                            `event: ${JSON.stringify(data)}\n\n`
                        ))
                    })
                    await run.text();
                    controller.close();
                } catch(err) {
                    controller.error(err);
                    console.error("Stream Error: ", err);
                }
            },
        })
        return new Response (stream, {
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive",
            }
        })
    } catch(err: any) {
        return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        })
    }
}
