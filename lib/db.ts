import { createClient } from "redis";

export interface TrackingData {
  timestamp: string;
  ip: string;
  userAgent: string;
  query: string;
}

const client = createClient({
  url: process.env.REDIS_URL,
});

class InMemoryDB {
  private storage: Map<string, TrackingData>;

  constructor() {
    this.storage = new Map();
    client.on("error", (err) => console.log("Redis Client Error", err));
    client
      .connect()
      .then(() => {
        console.log("Client Connected");
      })
      .catch((err) => {
        console.error("Failed to connect to Redis:", err);
      });
  }

  async addEntry(data: TrackingData) {
    try {
      console.log("add data:", data);
      const id = Date.now().toString();
      this.storage.set(id, data);
      const result = await client.set(id, JSON.stringify(data));
      console.log("data added:", result);
    } catch (error) {
      console.error("error adding redis data", error);
    }
  }

  async convertToMap(promise: Promise<Record<string, TrackingData>>) {
    const record = await promise; // Await the Promise to get the Record object
    const map = new Map(Object.entries(record)); // Convert the Record to a Map
    return map;
  }

  convertTimestampsToLocalTime = (array: TrackingData[]) => {
    return array.map((item) => ({
      ...item, // Keep other properties unchanged
      timestamp: new Date(item.timestamp).toLocaleString(), // Convert timestamp
    }));
  };

  async getAllEntries(): Promise<TrackingData[]> {
    try {
      const keys = await client.keys("*");
      console.log(keys);
      const allData: Record<string, TrackingData> = {};

      for (const key of keys) {
        const value = await client.get(key);
        if (value) {
          allData[key] = JSON.parse(value);
        }
      }

      // console.log('All Data:', allData);
      const map = new Map(Object.entries(allData));
      // console.log('All map:', map.values());
      return this.convertTimestampsToLocalTime(Array.from(map.values()));
      // return allData;
    } catch (err) {
      console.error("Error getting all data:", err);
      // return {};
      return [];
    }
  }
}

export const db = new InMemoryDB();
