import { Timestamp } from "@/types";

export interface Attachment extends Timestamp {
  id: string;
  filename: string;
  url: string;
}
