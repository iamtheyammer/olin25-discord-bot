import { GetItemCommandOutput } from "@aws-sdk/client-dynamodb";
import client, { KeyData } from "./index";
import { marshall } from "@aws-sdk/util-dynamodb";

export default function read(
  tableName: string,
  keyData: KeyData
): Promise<GetItemCommandOutput> {
  return client.getItem({ TableName: tableName, Key: marshall(keyData) });
}
