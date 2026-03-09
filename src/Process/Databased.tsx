import {MongoClient, ServerApiVersion} from "mongodb";


class Databased
{
    private client: MongoClient;
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
            //send a ping to confirm a successful connection
            await this.client.db("admin").command({ping: 1});
            console.log("Successfully connected to MongoDB!");
            var hfdbgl = this.client.db("ElliesPosts").collection("Ellie💚");
            console.log(this.client);
            console.log(hfdbgl);
        }
        catch (error)
        {
            console.log("Failed to connect to MongoDB:");
            console.error(error);
        }
        finally
        {
            await this.client.close();
        }
    }
}

export {Databased};