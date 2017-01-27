module treeViewCore
{
    export class Queue
    {
        public Queue: Array<Node>;

        constructor ()
        {
            this.Queue = [];
        }

        public IsEmpty () : Boolean
        {
            return this.Queue.length === 0;
        }

        public Enqueue (object: Node) : void
        {
            this.Queue.push(object);
        }

        public Dequeue () : Node
        {
            return this.Queue.shift();
        }
    }
}