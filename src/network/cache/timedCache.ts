class Entry<T> {
  expires: number;
  value: T;

  constructor(value: T, time: number) {
    this.expires = Date.now() + time;
    this.value = value;
  }

  stale() {
    return Date.now() > this.expires;
  }
}

class TimedCache<T> {
  private values: Map<string, Entry<T>> = new Map<string, Entry<T>>();
  private expires = 5 * 60 * 1000; //5 minutes

  public get(key: string): T | null {
    if (this.values.has(key)) {
      const entry = this.values.get(key);
      if (!entry) {
        return null;
      }
      return entry.value;
    }

    return null;
  }

  public put(key: string, value: T) {
    this.values.set(key, new Entry(value, this.expires));
  }
}

export default TimedCache;
