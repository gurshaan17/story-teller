import { Page, Story } from "@/types/stories";
import path from "path";
import fs from "fs";


const storiesDirectory = path.join(process.cwd(), "public/stories") 

export function getAllStories(): Story[] {
    if(!fs.existsSync(storiesDirectory)) return [];
    const storyFolder = fs.readdirSync(storiesDirectory);
    const stories: Story = storyFolder.map(storyFolder => {
        const storyPath = path.join(storiesDirectory, storyFolder)
        const files = fs.readdirSync(storyPath)

        const pages: Page[] = [];
        const pageMap: { [key: string]: Partial<Page> } = {};

        files.forEach(file => {
            const filePath = path.join(storyPath, file);
            const type = path.extname(file).substring(1);
            const pageNumber = file.match(/page(\d+)\./)?.[1]
            if(pageNumber){
                if(!pageMap[pageNumber]){
                    pageMap[pageNumber] = {};
                }
                if(type === "txt"){
                    pageMap[pageNumber].txt = fs.readFileSync(filePath, "utf-8")
                }
                else if(type === "png"){
                    pageMap[pageNumber].png = `/stories/${storyFolder}/${file}`
                }
            }

            Object.keys(pageMap).forEach((pageNumber) => {
                if(pageMap[pageNumber].txt && pageMap[pageNumber].png){
                    pages.push(pageMap[pageNumber] as Page)
                }
            })
            
        })
    })
}

export const getStory = (story: string):Story | undefined => {

}   