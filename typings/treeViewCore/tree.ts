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
    }
}