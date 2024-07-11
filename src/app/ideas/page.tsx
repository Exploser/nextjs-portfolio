import { Client } from "@notionhq/client"
import { config } from "dotenv"
import { QueryDatabaseResponse, PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';

interface NotionPageProperties {
    Ideas: {
        id: string;
        type: 'title';
        title: Array<{
            type: string;
            plain_text: string;
        }>;
    };
    Description?: {
        id: string;
        type: 'rich_text';
        rich_text: Array<{
            type: string;
            plain_text: string;
        }>;
    };
}

// Type guard to check if the result is a PageObjectResponse with the expected properties
const isPageObjectResponseWithProperties = (
    result: any
): result is PageObjectResponse & { properties: NotionPageProperties } => {
    return (
        result.object === 'page' &&
        'properties' in result &&
        'Ideas' in result.properties &&
        result.properties.Ideas.id === 'title'
    );
};

const Ideas = async () => {
    const databaseId = '983e31b9c61448208c25229fb733408a'
    const apiKey = process.env.NOTION_API_KEY
    const notion = new Client({ auth: apiKey })
    let position = 1;
    config()

    const NotionResult: QueryDatabaseResponse = await notion.databases.query({
        database_id: databaseId,
    })

    const data = NotionResult.results.filter(isPageObjectResponseWithProperties);

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-slate-800 font-semibold mb-8">Ideas</h1>
            <div className="flex flex-row space-x-4">
                <div className="w-fit h-fit">
                    <h1 className="text-3xl font-semibold text-slate-600 mb-4">Title</h1>
                    {data.map((result) => (
                        <div key={result.id} className="shadow-md rounded-lg py-2 px-2 bg-white mb-4 h-20 flex space-x-8">
                            <h2 className="text-2xl font-semibold text-slate-500">
                                {result.properties.Ideas.title[0]?.plain_text}
                            </h2>
                        </div>
                    ))}
                </div>
                <div className="w-full">
                    <h1 className="text-3xl font-semibold text-slate-600 mb-4">Description</h1>
                    {data.map((result) => (
                        <div key={result.id} className="shadow-md rounded-lg py-2 px-2 bg-white mb-4 h-20">
                            {result.properties.Description && result.properties.Description.rich_text.length > 0 && (
                                <h2 className="text-xl font-semibold text-slate-500">
                                    {result.properties.Description.rich_text[0]?.plain_text}
                                </h2>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Ideas;