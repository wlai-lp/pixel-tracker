export interface TrackingData {
  timestamp: string;
  ip: string;
  userAgent: string;
  query: string;
}

class InMemoryDB {
  private storage: Map<string, TrackingData>;

  constructor() {
    this.storage = new Map();
  }

  addEntry(data: TrackingData) {
    const id = Date.now().toString();
    this.storage.set(id, data);
  }

  getAllEntries(): TrackingData[] {
    // console.log(JSON.stringify(this.storage));
    return Array.from(this.storage.values());
  }
}

export const db = new InMemoryDB();

