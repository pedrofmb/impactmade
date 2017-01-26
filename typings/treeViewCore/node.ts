module treeViewCore
{
    export class Node
    {
        public Data : IdataManage;
        public Parent: string;
        public Childrens : any[];

        constructor(data : any)
        {
            this.Data = data;
            this.Parent = null;
            this.Childrens = new Array<any>();
        }

        public CambiarIndice(tree : Tree, parentId : string)
        {
            this.Data.Parent = parentId;
            this.Data.Id = tree.countNode;
            this.Data.NodeId = tree.countNode;

            if (this.Childrens.length > 0) 
            {
                for (let i = 0, length = this.Childrens.length; i < length; i++) 
                {
                    ++tree.countNode;
                    this.Childrens[i].cambiarIndice(tree, this.Data.NodeId);
                }
            }

            console.log(this);
        }
    }
}