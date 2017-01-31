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

        public TraverseBF (callback: Function) : void
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

        public Contains (callback: Function, traversal: any) : void
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

        public Prepend ( data : IdataManage, toData : number, traversal : any) : void
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

        public Remove (data : IdataManage, fromData : number, traversal : any) : Node
        {
            var tree : Tree = this;
            var parent : any = null;
            var childToRemove : Node;
            var index : number;

            var callback : Function = function (node : Node)
            {
                if (node.Data.Id * 1 == fromData * 1) {
                    parent = node;
                }
            };

            tree.Contains(callback, traversal);

            if (parent)
            {
                index = Util.FindIndex(parent.Childrens, data);

                if (index === undefined)
                {
                    throw new Error('Node to remove does not exist.');
                }
                else{childToRemove = parent.Childrens.splice(index, 1);}
            }
            else {throw new Error('Parent does not exist.');}

            return childToRemove;
        }

        public SortChildrens (parent : any, indexTo : number) : void
        {
            var lastValue : any = parent.Childrens[parent.Childrens.length -1];

            for (var i = parent.Childrens.length - 1; i > 0; i--)
            {
                if (i == indexTo) break;
            var value : any = parent.Childrens[i-1];
            parent.Childrens[i] = value;
            }

            parent.Childrens[indexTo] = lastValue;

        }        

    }

}