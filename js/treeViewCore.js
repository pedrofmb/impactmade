var treeViewCore;
(function (treeViewCore) {
    var Node = (function () {
        function Node(data) {
            this.Data = data;
            this.Parent = null;
            this.Childrens = new Array();
        }
        Node.prototype.CambiarIndice = function (tree, parentId) {
            this.Data.Parent = parentId;
            this.Data.Id = tree.countNode;
            this.Data.NodeId = tree.countNode;
            if (this.Childrens.length > 0) {
                for (var i = 0, length_1 = this.Childrens.length; i < length_1; i++) {
                    ++tree.countNode;
                    this.Childrens[i].CambiarIndice(tree, this.Data.NodeId);
                }
            }
            console.log(this);
        };
        Node.prototype.ReconstruirIndices = function (tree) {
            this.CambiarIndice(tree, null);
            console.log(this);
        };
        Node.prototype.GetIndentTpl = function (numIndex) {
            var tpl = '';
            for (var i = 0; i < numIndex; i++) {
                tpl += '<span class="indent"></span>';
            }
            return tpl;
        };
        Node.prototype.RenderUI = function () {
            var indentCont = 0;
            var queue = new Array();
            var tpl = this.RenderUINode({ Queue: queue, Indent: indentCont, IconExpanded: 'glyphicon-unchecked', IconCollapsed: 'glyphicon-stop' });
            return tpl;
        };
        Node.prototype.RenderUINode = function (options) {
            var tpl = "";
            var myTag;
            var indentCont = options.Indent;
            myTag = this.Data.Tag;
            var visible = this.Data.Expanded == undefined ? true : this.Data.Expanded;
            var iconExpanded = this.Data.Iconexpanded == undefined ? true : this.Data.Iconexpanded;
            if (this.Childrens.length > 0) {
                var cadChildrenList = "";
                this.Childrens.forEach(function (item) {
                    cadChildrenList += item.Data.Id + ",";
                });
                cadChildrenList = cadChildrenList.substr(0, cadChildrenList.length - 1);
                tpl += '<li class="list-group-item ' + (visible ? '' : 'hide') + '" data-nodeid="' + this.Data.Id + '" data-childrencad="' + cadChildrenList + '" data-parent="' + (this.Data.Parent == null ? 0 : this.Data.Parent) + '"  data-expanded="' + (iconExpanded ? "true" : "false") + '">';
                tpl += this.GetIndentTpl(indentCont);
                if (this.Childrens.length > 0) {
                    tpl += '<span class="icon expand-icon glyphicon ' + (iconExpanded ? options.IconExpanded : options.IconCollapsed) + '"></span>';
                }
                else {
                    tpl += '<span class="icon glyphicon"></span>';
                }
                tpl += '<span class="icon node-icon ' + this.Data.Icon + '"></span>';
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
                for (var i = 0, length = this.Childrens.length; i < length; i++) {
                    options.Indent = (indentCont + 1);
                    tpl += this.Childrens[i].RenderUINode(options);
                }
                return tpl;
            }
            else {
                options.Indent = (indentCont - 1);
                tpl += tpl += '<li class="list-group-item ' + (visible ? '' : 'hide') + '" data-nodeid="' + this.Data.Id + '" data-parent="' + (this.Data.Parent == null ? 0 : this.Data.Parent) + '" data-expanded="' + (iconExpanded ? "true" : "false") + '">';
                if (this.Childrens.length > 0) {
                    tpl += '<span class="icon expand-icon glyphicon ' + (iconExpanded ? options.IconExpanded : options.IconCollapsed) + '"></span>';
                }
                else {
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
        };
        return Node;
    }());
    treeViewCore.Node = Node;
})(treeViewCore || (treeViewCore = {}));
var treeViewCore;
(function (treeViewCore) {
    var Tree = (function () {
        function Tree(data) {
            this.Root = new treeViewCore.Node(data);
            this.countNode = 1;
        }
        return Tree;
    }());
    treeViewCore.Tree = Tree;
})(treeViewCore || (treeViewCore = {}));
var treeViewCore;
(function (treeViewCore) {
    var TreeView = (function () {
        function TreeView() {
        }
        return TreeView;
    }());
    treeViewCore.TreeView = TreeView;
})(treeViewCore || (treeViewCore = {}));
var treeViewCore;
(function (treeViewCore) {
    var TreeViewUI = (function () {
        function TreeViewUI() {
        }
        return TreeViewUI;
    }());
    treeViewCore.TreeViewUI = TreeViewUI;
})(treeViewCore || (treeViewCore = {}));
var treeViewCore;
(function (treeViewCore) {
    var Util = (function () {
        function Util() {
        }
        Util.Capitalize = function (word) {
            if (word != undefined && word != "")
                return word.charAt(0).toUpperCase() + word.slice(1);
            return "";
        };
        Util.ImEval = function (functionName) {
            switch (functionName) {
                case "function":
                    return eval("functiontype");
                case "if":
                    return eval("iftype");
                default:
                    return eval(functionName.toLowerCase());
            }
        };
        Util.CastValue = function (tag, type) {
            tag = Util.Capitalize(tag || "");
            type = Util.Capitalize(type || "");
            if (Logic[type][tag] != null)
                return Logic[type][tag];
            else
                return Logic[type][tag + "Type"];
        };
        return Util;
    }());
    treeViewCore.Util = Util;
})(treeViewCore || (treeViewCore = {}));
