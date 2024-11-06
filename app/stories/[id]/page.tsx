import Story from "@/components/Story";
import { getAllStories, getStory } from "@/lib/stories";
import { notFound } from "next/navigation";

interface StoryPageProps {
    params: {
        id: string;
    }
}

async function StoryPage({ params }: StoryPageProps) {
    const { id } = await params
    const decodedId = decodeURIComponent(id);
    const story = getStory(decodedId);  // Synchronous call

    if (!story) {
        return notFound();
    }
    
    return (
        <div>
            <Story story={story} />
        </div>
    );
}

export default StoryPage;

// generates static page for story before call useful for caching 
export async function generateStaticParams() {
    const stories = getAllStories(); 
    return stories.map((story) => ({
        id: story.story
    }));
}