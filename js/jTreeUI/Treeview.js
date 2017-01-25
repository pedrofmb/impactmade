(function () {

    this.Treeview = function () {

        var defaults = {};

        var isVoice = false;
        var type;
        var cont = 1;
        var data = {};
        var tree = null;
        var reference;
        var $element;
        
        var self = this;
        var $this = null;
        var options;
        var $listSelected = null;

        if (arguments[0] && typeof arguments[0] == "object") {
            this.options = extendsDefault(defaults, arguments[0]);
        }

        this.methods = {
            setTree: function (tree, reference) {
                self.tree = tree;
                self.reference = reference;
            },
            getTree: function () {
                return tree;
            },

            registerEvents: function () {
                var $treeview = self.$element;
                
                $treeview.on("click", ".list-group-item", function (evt) {
                    var $this = $(this);
                    if (self.$listSelected == null) {
                        $this.addClass("node-selected");
                        self.$listSelected = $this;
                    } else {
                        if(self.$listSelected == $this){
                            self.$listSelected.removeClass("node-selected");                            
                            self.$listSelected = $this;
                        }else{
                            self.$listSelected.removeClass("node-selected");
                            $this.addClass("node-selected");
                            self.$listSelected = $this;
                        }                        
                    }
                    
                });

                $treeview.on("click", ".list-group-item .expand-icon", function (evt) {
                    evt.preventDefault();
                    evt.stopPropagation();

                    var $this = $(this);
                    var $li = $this.closest("li");
                    var nodeid = $li.data("nodeid");
                    
                    var expanded = $li.data("expanded");

                    var node_result;
                    self.tree.contains(function (node) { if (node.data.id == nodeid) { node_result = node; } }, self.tree.traverseBF);
                    if (node_result) {
                        node_result.data.iconexpanded = !expanded;
                        node_result.expcol(!expanded);
                    }
                    self.methods.renderTree();
                });
            },

            init: function () {
                self.$element = self.options.element;
                self.tree = self.options.tree;
                self.methods.renderTree();
                self.methods.registerEvents();
            },

            renderTree: function () {
                //console.log(self.tree);
                var tpl = '<ul class="list-group">';
                tpl += self.tree._root.renderUI();
                tpl += '</ul>';
                self.$element.html(tpl);

                var $ul = self.$element.find("ul");

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
                            self.methods.renderTree();
                            msg_error("No se puede colocar un nodo como raiz");
                        }
                        else
                        {
                            var nodeResult, nodeCurrent;
                            self.tree.traverseBF(function(node){ if(node.data.id == endNodeId) {nodeCurrent = node} });
                            self.tree.traverseBF(function (node) { if (node.data.id == silbingNodeId) { nodeResult = node; } });

                            var nodeParentTo;
                            var acceptNode = false;
                            self.tree.traverseBF(function (node) { if (node.data.id == nodeResult.data.parent) { nodeParentTo = node; } });

                            var objLogic = imValNew(nodeParentTo.data.tag, self.type);//imEval(nodeParentTo.data.tag.toLowerCase());
                            var choicesNodesResult = objLogic.children;//(self.isVoice) ? objLogic.voice.choices : objLogic.sms.choices;

                            if (nodeParentTo.data.id * 1 === nodeCurrent.data.id * 1) {
                                //Mismo nodo
                                $(this).sortable('cancel');
                                self.methods.renderTree();
                                return;
                            }

                            if (choicesNodesResult != undefined) {
                                for (var m = 0; m < choicesNodesResult.length; m++) {
                                    var tagName = nodeCurrent.data.tag.toLowerCase();
                                    if (choicesNodesResult[m].name.toLowerCase() == tagName) {
                                        acceptNode = true;
                                        break;
                                    }
                                }
                            }

                            if (!acceptNode) {
                                $(this).sortable('cancel');
                                self.methods.renderTree();
                                msg_error("No se puede colocar el nodo " + nodeCurrent.data.tag + " en el nodo padre " + nodeParentTo.data.tag);
                                return;
                            }
                            
                            self.tree.add(nodeCurrent.data, nodeCurrent.children, nodeResult.data.parent, self.tree.traverseBF);
                            self.tree.remove(nodeCurrent.data, nodeCurrent.data.parent, self.tree.traverseBF);

                            self.tree.traverseBF(function (node) { if (node.data.id == nodeResult.data.parent) { nodeParentTo = node; } });
                            self.tree.traverseBF(function (node) { if (node.data.id == endNodeId) { nodeCurrent = node } });

                            nodeCurrent.data.parent = nodeParentTo.data.id;

                            if (silbingNextNodeId != undefined)
                            {
                                var positionInArray = -1;
                                var childrensofParent = nodeParentTo.children;
                                for (var i = 0; i < childrensofParent.length; i++) {
                                    if (childrensofParent[i].data.id * 1 == silbingNodeId) {
                                        positionInArray = i;
                                        break;
                                    }
                                }
                                self.tree.sortChildrens(nodeParentTo, positionInArray);
                            }

                            self.reference.cambios = true;
                            self.reference.dirty = true;

                            self.tree.countNode = 1;
                            self.tree._root.reconstruirIndices(self.tree);
                            self.methods.renderTree();
                        }

                    }
                });
                $ul.disableSelection();
            },

            getSelectedNodeUI: function () {
                return self.$listSelected;
            },

            highlightNode: function (nodeId) {
                var $treeview = self.$element;
                var $li = null;
                $treeview.find("li").each(function () {
                    if ($(this).data("nodeid") * 1 == nodeId * 1) {
                        $li = $(this);
                    }
                });
                
                if($li != null){
                    $li.effect("highlight", {}, 500, function () { $li.effect("highlight", {}, 750, function () { $li.effect("highlight", {}, 1000); }) });
                    return true;
                }else{
                    return false;
                }                
            },

            getSelectedNode: function () {
                if (self.$listSelected != null) {
                    var nodeid = self.$listSelected.data("nodeid") * 1;
                    var node_result = self.tree.findById(nodeid);
                    return node_result;
                }
                return null;
            },

            deleteNode: function (node, idParent) {
                self.tree.remove(node, idParent, self.tree.traverseBF);                
            },

            collapseAll: function () {
                self.tree._root.data.iconexpanded = false;
                self.tree._root.expcol(true);
                self.methods.renderTree();
            },
            expandAll: function () {
                self.tree._root.data.iconexpanded = true;
                self.tree._root.expcol(true);
                self.methods.renderTree();
            },
            collapseNode: function (nodeid) {
                var node_result;
                self.tree.contains(function (node) { if (node.data.id == nodeid) { node_result = node; } }, self.tree.traverseBF);
                if (node_result) {
                    node_result.data.iconexpanded = false;
                    node_result.expcol(false);
                }
                self.methods.renderTree();
            },
            expandNode: function (nodeid) {
                var node_result;
                self.tree.contains(function (node) { if (node.data.id == nodeid) { node_result = node; } }, self.tree.traverseBF);
                if (node_result) {
                    node_result.data.iconexpanded = true;
                    node_result.expcol(true);
                }
                self.methods.renderTree();
            }
        };

        this.methods.init();
    };


    function extendsDefault(source, properties) {
        var property;
        for (property in properties) {
            if (properties.hasOwnProperty(property)) {
                source[property] = properties[property];
            }
        }
        return source;
    }


    Treeview.prototype.getTree = function () {
        return this.methods.getTree();
    };
    Treeview.prototype.setTree = function (tree, reference) {
        this.methods.setTree(tree, reference);
        this.methods.renderTree();
    };
    Treeview.prototype.deleteNode = function (node) {
        this.methods.deleteNode(node.data, node.data.parent);
        this.methods.renderTree();
    };
    Treeview.prototype.getSelectedNodeUI = function () {
        return this.methods.getSelectedNodeUI();
    };
    Treeview.prototype.getSelectedNode = function () {
        return this.methods.getSelectedNode();
    };
    Treeview.prototype.renderTree = function () {
        this.methods.renderTree();
    };
    Treeview.prototype.highlightNode = function (nodeId) {
        this.methods.highlightNode(nodeId);
    };

    Treeview.prototype.collapseAll = function () {
        this.methods.collapseAll();
    };
    Treeview.prototype.expandAll = function () {
        this.methods.expandAll();
    };
    Treeview.prototype.collapseNode = function (idNode) {
        this.methods.collapseNode(idNode);
    };
    Treeview.prototype.expandNode = function (idNode) {
        this.methods.expandNode(idNode);
    };
}());