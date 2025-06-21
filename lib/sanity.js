import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "61qtoljd",
  dataset: "production",
  apiVersion: "2023-06-21",
  useCdn: true,
});
