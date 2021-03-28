import { AttributeValue, DynamoDB } from "@aws-sdk/client-dynamodb";

export type KeyData = { [keyName: string]: any };

const client = new DynamoDB({ region: "us-east-2" });

export default client;
