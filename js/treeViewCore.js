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
                    this.Childrens[i].cambiarIndice(tree, this.Data.NodeId);
                }
            }
            console.log(this);
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
