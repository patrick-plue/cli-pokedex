export  type CacheEntry<T> = {
    createdAt: number;
    val: T;
};

export class Cache {
    #cache = new Map<string, CacheEntry<any>>();
    #reapIntervalId: NodeJS.Timeout | undefined = undefined 
    #interval = 0

    constructor(interval: number) {
        this.#interval = interval
        this.#startReapLoop()
    }

    add(key: string, val: CacheEntry<any>) {
        this.#cache.set(key, val);
    }

    get(key: string) {
        return this.#cache.get(key);
        
    }

    #reap(){
        for (const [key, value] of this.#cache.entries()) {
            if (value.createdAt < (Date.now() - this.#interval)){
                this.#cache.delete(key)
            }
        }
    }

    #startReapLoop(){
        const intervalId = setInterval(()=> {
            this.#reap()
        }, this.#interval)
        this.#reapIntervalId = intervalId
    }

    stopReapLoop() {
        clearInterval(this.#reapIntervalId)
        this.#reapIntervalId = undefined
    }
}

export const pokeCache = new Cache(60000)