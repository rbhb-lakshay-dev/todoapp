import { Client, Account, Databases } from "appwrite";
import { isElement } from "react-dom/test-utils";

const client = new Client();

client
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("6738c29c0017af22afb7");

export const account = new Account(client);

// database

export const databases = new Databases(client, "6738c2fb000c0ee4a82a");
