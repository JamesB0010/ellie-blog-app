import {Collection, MongoClient, ServerApiVersion, WithId, Document as MongoDocument} from "mongodb";
import { BlogPost } from "../types/BlogPost";


class Databased
{
    private client: MongoClient;
    private postsCollection: Collection | undefined;
    constructor(){
        this.client = new MongoClient(process.env.DATABASE_URI, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        })
    }

    public async connect() : Promise<void>
    {
        console.log("Attempting to connect to MongoDB...");
        try
        {
            await this.client.connect();
            console.log("Successfully connected to MongoDB!");

            this.postsCollection = this.client.db("ElliesPosts").collection("Ellie💚");

        }
        catch (error)
        {
            console.log("Failed to connect to MongoDB:");
            console.error(error);
        }
    }

    public async getPosts(): Promise<Array<WithId<MongoDocument>>>
    {
        if (!this.postsCollection) {
            throw new Error("Posts collection not initialized");
        }

        return await this.postsCollection.find().toArray();
    }
    
    public async makePost(postData: BlogPost): Promise<void>
    {
        if (!this.postsCollection) {
            throw new Error("Posts collection not initialized");
        }

        await this.postsCollection.insertOne(postData);
    }

    public async dispose(): Promise<void>
    {
        await this.client.close();
    }
}

export {Databased};