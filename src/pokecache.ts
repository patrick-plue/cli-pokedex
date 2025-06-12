type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    constructor() {}

    add(key: string, val: CacheEntry<any>) {
        this.#cache.set(key, val);
    }

    get(key: string) {
        this.#cache.get(key);
    }
}
