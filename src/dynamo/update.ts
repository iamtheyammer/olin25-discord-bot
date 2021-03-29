import { UpdateItemCommandOutput } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import client, { KeyData } from "./index";

export default function update(
  tableName: string,
  key: KeyData,
  data: { [key: string]: any }
): Promise<UpdateItemCommandOutput> {
  const attrNames = Object.fromEntries(
    Object.keys(data).map((k, idx) => [`#${idx}`, k])
  );

  const attrValues = Object.fromEntries(
    Object.entries(marshall(data)).map(([k, v]) => [`:${k}`, v])
  );

  const updateExpr = `SET ${Object.entries(data)
    .map(([k], idx) => `#${idx} = :${k}`)
    .join(", ")}`;

  return client.updateItem({
    Key: marshall(key),
    TableName: tableName,
    ExpressionAttributeNames: attrNames,
    ExpressionAttributeValues: attrValues,
    UpdateExpression: updateExpr,
  });
}
