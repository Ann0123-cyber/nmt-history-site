export class BiDirectionalPriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, priority) {
        this.queue.push({ item, priority, time: Date.now() });
        this.queue.sort((a, b) => b.priority - a.priority);
    }

    peek(mode = 'highest') {
        if (this.queue.length === 0) return null;
        switch (mode) {
            case 'highest':
                return this.queue[0].item;
            case 'lowest':
                return this.queue[this.queue.length - 1].item;
            case 'oldest':
                return this.queue.reduce((a, b) => a.time < b.time ? a : b).item;
            case 'newest':
                return this.queue.reduce((a, b) => a.time > b.time ? a : b).item;
            default:
                return null;
        }
    }

    dequeue(mode = 'highest') {
        if (this.queue.length === 0) return null;
        let index;
        switch (mode) {
            case 'highest':
                return this.queue.shift().item;
            case 'lowest':
                return this.queue.pop().item;
            case 'oldest':
                index = this.queue.findIndex(q => q.time === Math.min(...this.queue.map(x => x.time)));
                return this.queue.splice(index, 1)[0].item;
            case 'newest':
                index = this.queue.findIndex(q => q.time === Math.max(...this.queue.map(x => x.time)));
                return this.queue.splice(index, 1)[0].item;
            default:
                return null;
        }
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}
