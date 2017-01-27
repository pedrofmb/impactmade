module treeViewCore
{
    export interface IdataManage
    {
        Parent : number;
        Id : number;
        NodeId : number;
        Tag : string;
        Expanded : any;
        Iconexpanded : any;
        Icon: string;
        Attrs: any;
    }

    export interface IRenderNode
    {
        Queue : Array<any>;
        Indent : number;
        IconExpanded : string;
        IconCollapsed : string;
    }

    export class Node
    {
        public Data : IdataManage;
        public Parent: string;
        public Childrens : Node[];

        constructor(data : IdataManage)
        {
            this.Data = data;
            this.Parent = null;
            this.Childrens = new Array<any>();
        }

        public CambiarIndice(tree : Tree, parentId : number) : void
        {
            this.Data.Parent = parentId;
            this.Data.Id = tree.countNode;
            this.Data.NodeId = tree.countNode;

            if (this.Childrens.length > 0) 
            {
                for (let i = 0, length = this.Childrens.length; i < length; i++) 
                {
                    ++tree.countNode;
                    this.Childrens[i].CambiarIndice(tree, this.Data.NodeId);
                }
            }

            console.log(this);
        }

        public ReconstruirIndices(tree : Tree) : void
        {
            this.CambiarIndice(tree, null);
            console.log(this);
        }

        public GetIndentTpl(numIndex) : string
        {
            var tpl = '';

            for (var i = 0; i < numIndex; i++) 
            {
                tpl += '<span class="indent"></span>';
            }

            return tpl;
        }

        public RenderUI() : string
        {
            var indentCont = 0;
            var queue = new Array<any>();
            var tpl = this.RenderUINode({ Queue: queue, Indent: indentCont, IconExpanded: 'glyphicon-unchecked', IconCollapsed: 'glyphicon-stop' });
            return tpl;
        }

        public RenderUINode (options : IRenderNode) : string
        {
            var tpl: string = "";
            var myTag: any;
            var indentCont: number = options.Indent;

            myTag = this.Data.Tag;
            var visible: any = this.Data.Expanded == undefined ? true : this.Data.Expanded;
            var iconExpanded = this.Data.Iconexpanded == undefined ? true : this.Data.Iconexpanded;

            if (this.Childrens.length > 0) 
            {
                var cadChildrenList = "";

                this.Childrens.forEach((item : Node) => {
                    cadChildrenList += item.Data.Id + ",";
                });

                cadChildrenList = cadChildrenList.substr(0, cadChildrenList.length -1);

                tpl += '<li class="list-group-item ' + (visible ? '' : 'hide') + '" data-nodeid="' + this.Data.Id + '" data-childrencad="'+ cadChildrenList +'" data-parent="'+ (this.Data.Parent == null ? 0 : this.Data.Parent) +'"  data-expanded="' + (iconExpanded ? "true" : "false") + '">';
                tpl += this.GetIndentTpl(indentCont);
                if (this.Childrens.length > 0) {
                    tpl += '<span class="icon expand-icon glyphicon ' + (iconExpanded ? options.IconExpanded : options.IconCollapsed) + '"></span>';
                } else {
                    tpl += '<span class="icon glyphicon"></span>';
                }
                tpl += '<span class="icon node-icon '+ this.Data.Icon +'"></span>';

                tpl += myTag;

                if (this.Data.Attrs)
                {
                    for(var attr in this.Data.Attrs){
                        if(this.Data.Attrs.hasOwnProperty(attr))
                        {
                            if(this.Data.Attrs[attr] !== "")
                            {
                               if (attr != "tag") 
                               {
                                 tpl += '    <span class="label label-success">' + attr + '="' + this.Data.Attrs[attr] + '"</span>';
                               } 
                            }
                        }
                    }
                }

                tpl += '<span class="badge">' + this.Childrens.length + '</span>';
                tpl += '</li>';

                for (var i = 0, length = this.Childrens.length; i < length; i++) {
                    options.Indent = (indentCont + 1);
                    tpl += this.Childrens[i].RenderUINode(options);
                }
                
                return tpl;
            }
            else
            {
                options.Indent = (indentCont - 1);
                tpl += tpl += '<li class="list-group-item ' + (visible ? '' : 'hide') + '" data-nodeid="' + this.Data.Id + '" data-parent="' + (this.Data.Parent == null ? 0 : this.Data.Parent) + '" data-expanded="' + (iconExpanded ? "true" : "false") + '">';
                if (this.Childrens.length > 0) {
                    tpl += '<span class="icon expand-icon glyphicon ' + (iconExpanded ? options.IconExpanded : options.IconCollapsed) + '"></span>';
                } else {
                    tpl += '<span class="icon glyphicon"></span>';
                }

                tpl += this.GetIndentTpl(indentCont);
                tpl += '<span class="icon node-icon glyphicon ' + this.Data.Icon + '"></span>';
                tpl += myTag;

                if (this.Data.Attrs) {
                    for (var attr in this.Data.Attrs) {
                        if (this.Data.Attrs.hasOwnProperty(attr)) {
                            if (this.Data.Attrs[attr] !== "") {
                                if (attr != "tag") {
                                    tpl += '    <span class="label label-success">' + attr + '="' + this.Data.Attrs[attr] + '"</span>';
                                }
                            }
                        }
                    }
                }

                tpl += '<span class="badge">' + this.Childrens.length + '</span>';
                tpl += '</li>';

                return tpl; 
            }
        }

        public UpdateNodeData (nodeId: number, data: any)
        {
            
        }

        public CopyNodeAndChildrens (arrClone: Array<Node>)
        {
            for (var j = 0; j < arrClone.length; j++)
            {
                var cloneObject = $.extend(true, {}, arrClone[j]);
                var node = new Node(cloneObject.data);

                if (this.Childrens.length > 0) {
                    var arrClone1 = $.extend(true, [], cloneObject.Childrens);
                    this.CopyNodeAndChildrens(arrClone1);
                }

                this.Childrens.push(node);
            }
        }

        public Expcol (expcol: any)
        {
            let recurse = (currentNode : Node) : void => {
                for (var i = 0, length = currentNode.Childrens.length; i < length; i++) {
                    recurse(currentNode.Childrens[i]);
                }

                if (currentNode != this) {
                    currentNode.Data.Expanded = expcol;
                    currentNode.Data.Iconexpanded = expcol;
                }
            };

            recurse(this);
        }
    }
}