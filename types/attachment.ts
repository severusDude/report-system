import { Timestamp } from "@/types";

export interface Attachment extends Timestamp {
  id: string;
  uploadedBy: string;
  filename: string;
  url: string;
}
