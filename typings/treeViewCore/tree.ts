module treeViewCore
{
    export class Tree
    {
        public Root : Node;
        public countNode : number;

        constructor(data : any)
        {
            this.Root = new Node(data);
            this.countNode = 1;
        }

        public TraverseBF (callback: Function)
        {
            var Queue : Queue;

            Queue.Enqueue(this.Root);
            var CurrentTree: Node = Queue.Dequeue();

            while (CurrentTree) {
                for (var i = 0, Length = CurrentTree.Childrens.length; i < Length; i++){
                    Queue.Enqueue(CurrentTree.Childrens[i]);
                }

                callback(CurrentTree);
                CurrentTree = Queue.Dequeue();
            }
        }

        public Contains (callback: Function, traversal: any)
        {
            traversal.call(this, callback);
        }

        public FindById (idnode: number) : Node
        {
            var NodeResult = null;
            this.Contains((node: Node) => 
            {
                if(node.Data.Id == idnode){
                    NodeResult = node;
                }
            }, this.TraverseBF);

            return NodeResult;
        }

        public Prepend ( data : IdataManage, toData : number, traversal : any)
        {
            var child : Node = new Node(data);
            var parent : any = null;
            var callback : Function = function (node : Node)
            {
                if (node.Data.Id * 1 === toData * 1 )
                {
                    parent = node;
                }
            };

            this.Contains(callback, traversal);

            if (parent) {
                parent.Childrens.unshift(child);
                child.Parent = parent;
            }
            else {
                throw new Error('Cannot add node to a non-existent parent.');
            }
        }

        public Add (data : IdataManage, childrens : Node[], toData: number, traversal : any) : void
        {
            var child : Node = new Node(data);
            var parent : any = null;
            var callback: Function = function (node: Node)
            {
                if (node.Data.Id * 1 === toData * 1 )
                {
                    parent = node;
                }
            };

            this.Contains(callback, traversal);

            if (parent)
            {
                parent.Childrens.push(child);
                child.Parent = parent;
                child.Childrens = childrens;
            }
            else {
                throw new Error('Cannot add node to a non-existent parent.');
            }
        }

        

    }

}