import Story from "@/components/Story";
import { getAllStories, getStory } from "@/lib/stories";
import { notFound } from "next/navigation";

interface StoryPageProps {
  params: {
    id: string;
  }
}

function StoryPage({ params: { id } }: StoryPageProps) {
  const decodedId = decodeURIComponent(id);
  const story = getStory(decodedId);
  
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

export async function generateStaticParams() {
  const stories = getAllStories();
  return stories.map((story) => ({
    id: story.story
  }));
}