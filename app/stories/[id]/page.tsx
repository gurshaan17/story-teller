import Story from "@/components/Story";
import { getAllStories, getStory } from "@/lib/stories";
import { notFound } from "next/navigation";

interface StoryPageProps {
    params: {
        id: string;
    };
}

function StoryPage({ params }: StoryPageProps) {
    const { id } = params; // Remove `await`
    const decodedId = decodeURIComponent(id);
    const story = getStory(decodedId); // `getStory` is a synchronous function

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

// Generates static pages for each story for caching
export async function generateStaticParams() {
    const stories = getAllStories(); 
    return stories.map((story) => ({
        id: story.story
    }));
}