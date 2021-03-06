module treeViewCore
{
    export interface IdataManage
    {
        Parent : number;
        ParentId : number;
        Id : number;
        NodeId : number;
        Tag : string;
        Expanded : any;
        Iconexpanded : any;
        Icon: string;
        Attrs: any;
        Name : string;
        Content: string;
        Description : string;
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
        public Name : string;
        public FriendlyName : string;

        constructor(data : IdataManage)
        {
            this.Data = data;
            this.Parent = null;
            this.Childrens = new Array<any>();
            this.Name = null;
            this.FriendlyName = null;
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

        public RecorrerRecursivo () : any
        {
            var node : Node = this;
            var obj : any;
            var attrs = node.Data.Attrs;

            var tplTag = '';
            if (attrs)
            {
                for (var attr in attrs)
                {
                    if (attrs.hasOwnProperty(attr))
                    {
                        if (attrs[attr] !== "" && attrs[attr] !== "tag")
                        {
                            tplTag += ' <span class="label label-success">' + attr + '=' + attrs[attr] + '</span>';
                        }
                    }
                }
            }

            if (node.Childrens.length > 0)
            {
                obj = {
                    id: (node.Data.Id ? node.Data.Id : Math.random()),
                    text: (node.Data.Tag ? node.Data.Tag : '?') + tplTag,// + '\t<button class="btn btn-xs btn-danger" onclick="mostrarErrores(event);" type="button">Errors <span class="badge">4</span></button>',
                    href: '#' + (node.Data.Tag ? node.Data.Tag : ''),
                    //description: '#' + (node.Data.description ? node.Data.description : ''),
                    icon: node.Data.Icon,
                    parent: node.Data.Parent,
                    tags: [node.Childrens.length],
                    nodes: []
                };
                for (var i = 0, length = node.Childrens.length; i < length; i++){
                    obj.nodes.push(node.Childrens[i].RecorrerRecursivo());
                }
                return obj;
            } else
            {
                obj = {
                id: (node.Data.Id ? node.Data.Id : Math.random()),
                text: (node.Data.Tag ? node.Data.Tag : '?') + tplTag,
                href: '#' + (node.Data.Tag ? node.Data.Tag : ''),
                //description: '#' + (node.data.description ? node.data.description : ''),
                icon: node.Data.Icon,
                parent: node.Data.Parent,
                tags: [node.Childrens.length]
                };
                return obj;
            }

        }

        public CreateXML (opts : any) : string
        {
            var node = this;
            var tpl : string = '';
            var myTag;
            var showId = opts.showId;
            var attrs : any = false,
                attrs_string_arr : Array<any> = [],
                attrs_string : string = '';

            attrs = node.Data.Attrs || false;
            if (attrs) {
                for (var attr in attrs){
                    if (attrs.hasOwnProperty(attr)){
                        if (attrs[attr] !== ""){
                            if (attr != "tag"){
                                attrs_string_arr.push(attr + '="' + attrs[attr] + '"');
                            }
                        }
                    }
                }
            }
            attrs_string = attrs_string_arr.join(' ');

            if (node.Childrens.length > 0){
                myTag = node.Data.Tag;
                if (node.Data.Name){
                    myTag = node.Data.Name;
                }

                if (attrs_string.length > 0) {
                    if (showId) {
                        tpl += '<' + myTag + ' _id="' + node.Data.Id + '" ' + attrs_string + '>\r\n';
                    } else {
                        tpl += '<' + myTag + ' ' + attrs_string + '>\r\n';
                    }
                } else {
                    if (showId) {
                        tpl += '<' + myTag + ' _id="' + node.Data.Id + '">\r\n';
                    } else {
                        tpl += '<' + myTag + ' >\r\n';
                    }
                }

                for (var i = 0, length = node.Childrens.length; i < length; i++) {
                    tpl += '\t' + node.Childrens[i].CreateXML(opts);
                }
                tpl += '</' + myTag + '>\r\n';

                return tpl;
            }
            else {
                myTag = node.Data.Tag;
                if (myTag == "comment") {
                    tpl += '<!-- ' + node.Data.Content + ' -->\r\n';
                } else {
                    if (node.Data.Name) {
                        myTag = node.Data.Name;
                    }
                    if (attrs_string.length > 0) {
                        if(showId){
                            tpl += '\t<' + myTag + ' _id="' + node.Data.Id + '" ' + attrs_string + '>\r\n';
                        }else{
                            tpl += '\t<' + myTag + ' ' + attrs_string + '>\r\n';
                        }                
                    } else {
                        tpl += '\t<' + myTag + '>\r\n';
                    }

                    tpl += '\t' + node.Data.Content;
                    tpl += '\t</' + myTag + '>\r\n';
                }

                return tpl;
            }


        }
    }
}