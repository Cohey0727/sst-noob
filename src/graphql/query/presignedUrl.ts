import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";

const s3Client = new S3Client({});

const presignedUrl = async (args: { userId: string; fileName: string }) => {
  const { fileName, userId } = args;
  const ext = fileName.split(".").pop();
  const uuidName = uuidv4();

  const params: PutObjectCommandInput = {
    Bucket: "okamoto-public-assets",
    Key: `${userId}/${uuidName}.${ext}`,
  };

  return getSignedUrl(s3Client, new PutObjectCommand(params), {
    expiresIn: 60 * 10,
  });
};

export default presignedUrl;
