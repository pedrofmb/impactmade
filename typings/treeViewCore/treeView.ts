module treeViewCore
{
    export class TreeView
    {
        public Defaults = {};
        public IsVoice : boolean = false;
        public Type : any;
        public Data = {};
        public Tree : Tree = null;
        public Reference : any;
        public $Element : JQuery;

        public Self = this;
        public $This : JQuery = null ;
        public Options : any;
        public $ListSelected : JQuery = null;
        
        constructor()
        {
            if (arguments[0] && typeof arguments[0] == "object") {
              this.Options = Util.ExtendsDefault(this.Defaults, arguments[0]);
            }
        }

        public SetTree (tree : Tree, reference : any)
            {
                this.Tree = tree;
                this.Reference = reference;
            }
            
       public GetTree ()
            {
                return this.Tree;
            }

      public RegisterEvents ()
            {
                var $treeview = this.$Element;

                $treeview.on("click", ".list-group-item", function (evt)
                {
                    var $this = $(this);
                    if (this.$ListSelected == null) {
                        $this.addClass("node-selected");
                        this.$ListSelected = $this;
                    } else {
                        if(this.$ListSelected == $this){
                            this.$ListSelected.removeClass("node-selected");                            
                            this.$ListSelected = $this;
                        }else{
                            this.$ListSelected.removeClass("node-selected");
                            $this.addClass("node-selected");
                            this.$ListSelected = $this;
                        }                        
                    }
                });

                $treeview.on("click", ".list-group-item .expand-icon", (evt) => {
                    evt.preventDefault();
                    evt.stopPropagation();

                    var $this = $(this);
                    var $li = $this.closest("li");
                    var nodeid = $li.data("nodeid");
                    var expanded = $li.data("expanded");
                    var node_result : Node;

                    this.Tree.Contains((node) => {
                         if (node.Data.Id == nodeid) { node_result = node; } 
                    }, this.Tree.TraverseBF);
                    if (node_result) {
                        node_result.Data.Iconexpanded = !expanded;
                        node_result.Expcol(!expanded);
                    }
                    this.RenderTree();
                });
            }

            public Init ()
            {
                this.$Element = this.Options.Element;
                this.Tree = this.Options.Tree;
                this.RenderTree();
                this.RegisterEvents();
            }

            public RenderTree ()
            {
                var tpl = '<ul class="list-group">';
                tpl += this.Tree.Root.RenderUI();
                tpl += '</ul>';
                this.$Element.html(tpl);

                var $ul = this.$Element.find("ul");

                $ul.sortable({
                    placeholder: "ui-state-highlight",
                    beforeStop: function(evt, ui){},
                    start: function (event, ui)
                    {
                        var nodeid = ui.item.data("nodeid");
                        ui.item.data('start_nodeid', nodeid);
                        var silbingNexts = ui.item.nextAll();
                        var childrensCurrentNode = ui.item.data("childrencad");

                        if (childrensCurrentNode != undefined) {
                            var childrensList = childrensCurrentNode.toString().split(',');

                            silbingNexts.each(function(ix, vx) {
                                var item = $(vx);
                                for (var i = 0; i < childrensList.length; i++) {
                                    var nodeIdA = parseInt(item.data("nodeid"));
                                    var parentIdA = parseInt(item.data("parent"));

                                    if (nodeIdA === childrensList[i] * 1 && parentIdA  === nodeid * 1) {
                                        item.fadeOut();
                                        var childrensCurrentNodeTemp = ui.item.data("childrencad");
                                        if (childrensCurrentNodeTemp != undefined) {
                                            var childrensListTemp = childrensCurrentNodeTemp.toString().split(',');
                                            for (var j = 0; j < childrensListTemp.length; j++) {
                                                childrensList.push(childrensListTemp[j]);
                                            }
                                        }
                                        break;
                                    }
                                }
                            });
                        }
                    },
                    stop: function (event, ui)
                    {
                        var endNodeId = ui.item.data("nodeid");
                        var silbingParentId, silbingNodeId;
                        var silbingNext = ui.item.next();

                        var silbingNextNodeId = silbingNext.data("nodeid");

                        if (silbingNextNodeId != undefined)
                        {
                            silbingParentId = parseInt(silbingNext.data('parent'));
                            silbingNodeId = parseInt(silbingNext.data('nodeid'));
                        } else {
                            var silbingPrev = ui.item.prev();
                            silbingParentId = parseInt(silbingPrev.data('parent'));
                            silbingNodeId = parseInt(silbingPrev.data('nodeid'));
                        }


                        if (silbingParentId === 0)
                        {
                            $(this).sortable('cancel');
                            this.Methods.RenderTree();
                            Util.msg_error("No se puede colocar un nodo como raiz");
                        }
                        else
                        {
                            var nodeResult : Node, nodeCurrent : Node;
                            this.Tree.traverseBF(function(node : Node){ if(node.Data.Id == endNodeId) {nodeCurrent = node} });
                            this.Tree.traverseBF(function (node : Node) { if (node.Data.Id == silbingNodeId) { nodeResult = node; } });

                            var nodeParentTo : Node;
                            var acceptNode = false;
                            this.Tree.traverseBF(function (node) { if (node.data.id == nodeResult.Data.Parent) { nodeParentTo = node; } });

                            var objLogic = Util.ImValNew(nodeParentTo.Data.Tag, this.Type);//imEval(nodeParentTo.data.tag.toLowerCase());
                            var choicesNodesResult = objLogic.children;//(self.isVoice) ? objLogic.voice.choices : objLogic.sms.choices;

                            if (nodeParentTo.Data.Id * 1 === nodeCurrent.Data.Id * 1) {
                                //Mismo nodo
                                $(this).sortable('cancel');
                                this.Methods.RenderTree();
                                return;
                            }

                            if (choicesNodesResult != undefined) {
                                for (var m = 0; m < choicesNodesResult.length; m++) {
                                    var tagName = nodeCurrent.Data.Tag.toLowerCase();
                                    if (choicesNodesResult[m].name.toLowerCase() == tagName) {
                                        acceptNode = true;
                                        break;
                                    }
                                }
                            }

                            if (!acceptNode) {
                                $(this).sortable('cancel');
                                this.Methods.RenderTree();
                                msg_error("No se puede colocar el nodo " + nodeCurrent.Data.Tag + " en el nodo padre " + nodeParentTo.Data.Tag);
                                return;
                            }
                            
                            this.Tree.Add(nodeCurrent.Data, nodeCurrent.Childrens, nodeResult.Data.Parent, this.Tree.TraverseBF());
                            this.Tree.Remove(nodeCurrent.Data, nodeCurrent.Data.Parent, this.Tree.TraverseBF());

                            this.Tree.TraverseBF(function (node) { if (node.data.id == nodeResult.Data.Parent) { nodeParentTo = node; } });
                            this.Tree.TraverseBF(function (node) { if (node.data.id == endNodeId) { nodeCurrent = node } });

                            nodeCurrent.Data.Parent = nodeParentTo.Data.Id;

                            if (silbingNextNodeId != undefined)
                            {
                                var positionInArray = -1;
                                var childrensofParent = nodeParentTo.Childrens;
                                for (var i = 0; i < childrensofParent.length; i++) {
                                    if (childrensofParent[i].Data.Id * 1 == silbingNodeId) {
                                        positionInArray = i;
                                        break;
                                    }
                                }
                                this.Tree.SortChildrens(nodeParentTo, positionInArray);

                            }

                            this.Reference.Cambios = true;
                            this.Reference.Dirty = true;

                            this.Tree.countNode = 1;
                            this.Tree.Root.reconstruirIndices(this.Tree);
                            this.Methods.RenderTree();
                        }

                    }
                });
                $ul.disableSelection();

            }
    }
}