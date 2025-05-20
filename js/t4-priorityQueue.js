export class BiDirectionalPriorityQueue {
    constructor() {
        this.queuePriority = [];
        this.queueTime = [];
    }

    enqueue(item) {
        const entry = { ...item, time: Date.now() };

        this.queuePriority.push(entry);
        this.queuePriority.sort((a, b) => b.priority - a.priority);

        this.queueTime.push(entry);
        this.queueTime.sort((a, b) => a.time - b.time);
    }

    peek(mode = 'highest') {
        if (this.isEmpty()) return null;

        switch (mode) {
            case 'highest':
                return this.queuePriority[0];
            case 'oldest':
                return this.queueTime[0];
            default:
                return null;
        }
    }

    dequeue(mode = 'highest') {
        if (this.isEmpty()) return null;

        let entry;

        switch (mode) {
            case 'highest':
                entry = this.queuePriority.shift();
                break;
            case 'oldest':
                entry = this.queueTime.shift();
                break;
            default:
                return null;
        }

        return entry;

    }

    isEmpty() {
        return this.queuePriority.length === 0 && this.queueTime.length === 0;
    }
}
