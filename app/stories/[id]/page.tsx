import Story from "@/components/Story";
import { getAllStories, getStory } from "@/lib/stories";
import { notFound } from "next/navigation";

interface StoryPageProps {
  params: {
    id: string;
  };
}

// Fetches the decoded story ID
async function getParams(params: StoryPageProps["params"]): Promise<string> {
  const { id } = params;
  return decodeURIComponent(id);
}

async function StoryPage({ params }: StoryPageProps) {
  const storyId = await getParams(params);
  const story = await getStory(storyId);

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
  const stories = await getAllStories();
  return stories.map((story) => ({
    id: encodeURIComponent(story.story), // Ensure id is URI-encoded
  }));
}