function capitalize(word)
{
    return word.charAt(0).toUpperCase() + word.slice(1);
}

function imEval(param) {
    switch (param) {
        case "function":
            return eval("functiontype");
            break;
        case "if":
            return eval("iftype");
            break;
        default:
            return eval(param.toLowerCase());
    }
}

function imValNew(tag, type)
{
    tag = capitalize(tag);
    type = capitalize(type);

    if (Logic[type][tag] != null)
        return Logic[type][tag];
    else
        return Logic[type][tag + "Type"];
}

function Queue() {
    this.queue = [];
}
Queue.prototype.isEmpty = function () {
    return this.queue.length === 0;
};
Queue.prototype.enqueue = function (obj) {
    this.queue.push(obj);
};
Queue.prototype.dequeue = function () {
    return this.queue.shift();
};

function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

function Tree(data) {
    var node = new Node(data);
    this.countNode = 1;
    this._root = node;
}

Node.prototype.reconstruirIndices = function (tree) {
    this.cambiarIndice(tree, null);
    console.log(this);
};

Node.prototype.cambiarIndice = function (tree, parentId)
{
    var node = this;

    node.data.parent = parentId;
    node.data.id = tree.countNode;
    node.data.nodeId = tree.countNode;

    if (node.children.length > 0) 
    {
        for (var i = 0, length = node.children.length; i < length; i++) {
            ++tree.countNode;
            node.children[i].cambiarIndice(tree, node.data.nodeId);
        }
    }

    console.log(node);
};

Node.prototype.recorrerRecursivo = function () {
    var node = this;
    var obj;
    var attrs = node.data.attrs;

    var tplTag = '';
    if (attrs) {
        for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                if (attrs[attr] !== "" && attrs[attr] !== "tag") {
                    tplTag += ' <span class="label label-success">' + attr + '=' + attrs[attr] + '</span>';
                }
            }
        }
    }

    if (node.children.length > 0) {
        obj = {
            id: (node.data.id ? node.data.id : Math.random()),
            text: (node.data.tagText ? node.data.tagText : '?') + tplTag,// + '\t<button class="btn btn-xs btn-danger" onclick="mostrarErrores(event);" type="button">Errors <span class="badge">4</span></button>',
            href: '#' + (node.data.tag ? node.data.tag : ''),
            //description: '#' + (node.data.description ? node.data.description : ''),
            icon: node.data.icon,
            parent: node.data.parent,
            tags: [node.children.length],
            nodes: []
        };
        for (var i = 0, length = node.children.length; i < length; i++) {
            obj.nodes.push(node.children[i].recorrerRecursivo());
        }
        return obj;
    } else {
        obj = {
            id: (node.data.id ? node.data.id : Math.random()),
            text: (node.data.tagText ? node.data.tagText : '?') + tplTag,
            href: '#' + (node.data.tag ? node.data.tag : ''),
            //description: '#' + (node.data.description ? node.data.description : ''),
            icon: node.data.icon,
            parent: node.data.parent,
            tags: [node.children.length]
        };
        return obj;
    }
};

function tabulacion(tabs) {
    var tpl = '';
    for (var i = 0; i < tabs; i++) {
        tpl += '\t';
    }
    return tpl;
}

Node.prototype.createXML = function (opts) {
    var node = this;
    var tpl = '';
    var myTag;
    var showId = opts.showId;
    var attrs = false,
        attrs_string_arr = [],
        attrs_string = '';

    attrs = node.data.attrs || false;
    if (attrs) {
        for (var attr in attrs) {
            if (attrs.hasOwnProperty(attr)) {
                if (attrs[attr] !== "") {
                    if (attr != "tag") {
                        attrs_string_arr.push(attr + '="' + attrs[attr] + '"');
                    }
                }
            }
        }
    }
    attrs_string = attrs_string_arr.join(' ');
    //console.log(attrs_string);

    if (node.children.length > 0) {
        myTag = node.data.tag;
        if (node.data.name) {
            myTag = node.data.name;
        }

        if (attrs_string.length > 0) {
            if (showId) {
                tpl += '<' + myTag + ' _id="' + node.data.id + '" ' + attrs_string + '>\r\n';
            } else {
                tpl += '<' + myTag + ' ' + attrs_string + '>\r\n';
            }
        } else {
            if (showId) {
                tpl += '<' + myTag + ' _id="' + node.data.id + '">\r\n';
            } else {
                tpl += '<' + myTag + ' >\r\n';
            }
        }

        for (var i = 0, length = node.children.length; i < length; i++) {
            tpl += '\t' + node.children[i].createXML(opts);
        }
        tpl += '</' + myTag + '>\r\n';

        return tpl;
    } else {
        myTag = node.data.tag;
        if (myTag == "comment") {
            tpl += '<!-- ' + node.data.content + ' -->\r\n';
        } else {
            if (node.data.name) {
                myTag = node.data.name;
            }
            if (attrs_string.length > 0) {
                if(showId){
                    tpl += '\t<' + myTag + ' _id="' + node.data.id + '" ' + attrs_string + '>\r\n';
                }else{
                    tpl += '\t<' + myTag + ' ' + attrs_string + '>\r\n';
                }                
            } else {
                tpl += '\t<' + myTag + '>\r\n';
            }

            tpl += '\t' + node.data.content;
            tpl += '\t</' + myTag + '>\r\n';
        }

        return tpl;
    }
};




Node.prototype.getIndentTpl = function (num_indent) {
    var tpl = '';
    for (var i = 0; i < num_indent; i++) {
        tpl += '<span class="indent"></span>';
    }
    return tpl;
};

Node.prototype.renderUI = function () {
    var node = this;
    var indentCont = 0;
    var queue = new Array();
    var tpl = node.renderUINode({ queue: queue, indent: indentCont, icon_expanded: 'glyphicon-unchecked', icon_collapsed: 'glyphicon-stop' });
    return tpl;
};

Node.prototype.renderUINode = function (opts) {
    var node = this;
    var tpl = '';
    var myTag;
    var indentCont = opts.indent;
    
    myTag = node.data.tag;
    var visible = node.data.expanded == undefined ? true : node.data.expanded;
    var iconexpanded = node.data.iconexpanded == undefined ? true : node.data.iconexpanded;
    
    if (node.children.length > 0) {
        var cadChildrenList = "";

        node.children.forEach(function(item) {
            cadChildrenList += item.data.id + ",";
        });

        cadChildrenList = cadChildrenList.substr(0, cadChildrenList.length - 1);

        tpl += '<li class="list-group-item ' + (visible ? '' : 'hide') + '" data-nodeid="' + node.data.id + '" data-childrencad="'+ cadChildrenList +'" data-parent="'+ (node.data.parent == null ? 0 : node.data.parent) +'"  data-expanded="' + (iconexpanded ? "true" : "false") + '">';
        tpl += node.getIndentTpl(indentCont);
        if (node.children.length > 0) {
            tpl += '<span class="icon expand-icon glyphicon ' + (iconexpanded ? opts.icon_expanded : opts.icon_collapsed) + '"></span>';
        } else {
            tpl += '<span class="icon glyphicon"></span>';
        }
        tpl += '<span class="icon node-icon '+ node.data.icon +'"></span>';

        tpl += myTag;

        if (node.data.attrs) {
            for (var attr in node.data.attrs) {
                if (node.data.attrs.hasOwnProperty(attr)) {
                    if (node.data.attrs[attr] !== "") {
                        if (attr != "tag") {
                            tpl += '    <span class="label label-success">' + attr + '="' + node.data.attrs[attr] + '"</span>';
                        }
                    }
                }
            }
        }
        
        tpl += '<span class="badge">' + node.children.length + '</span>';
        tpl += '</li>';

        for (var i = 0, length = node.children.length; i < length; i++) {
            opts.indent = (indentCont + 1);
            tpl += node.children[i].renderUINode(opts);
        }
        
        return tpl;
    }
    else
    {
        opts.indent = (indentCont - 1);
        tpl += tpl += '<li class="list-group-item ' + (visible ? '' : 'hide') + '" data-nodeid="' + node.data.id + '" data-parent="' + (node.data.parent == null ? 0 : node.data.parent) + '" data-expanded="' + (iconexpanded ? "true" : "false") + '">';
        if (node.children.length > 0) {
            tpl += '<span class="icon expand-icon glyphicon ' + (iconexpanded ? opts.icon_expanded : opts.icon_collapsed) + '"></span>';
        } else {
            tpl += '<span class="icon glyphicon"></span>';
        }

        tpl += node.getIndentTpl(indentCont);
        tpl += '<span class="icon node-icon glyphicon ' + node.data.icon + '"></span>';
        tpl += myTag;

        if (node.data.attrs) {
            for (var attr in node.data.attrs) {
                if (node.data.attrs.hasOwnProperty(attr)) {
                    if (node.data.attrs[attr] !== "") {
                        if (attr != "tag") {
                            tpl += '    <span class="label label-success">' + attr + '="' + node.data.attrs[attr] + '"</span>';
                        }
                    }
                }
            }
        }

        tpl += '<span class="badge">' + node.children.length + '</span>';
        tpl += '</li>';

        return tpl;
    }
};

Node.prototype.updateNodeData = function (nodeid, data) {
    var node_result;
    this.contains(function (node) { if (node.data.id == nodeid) { node_result = node; } }, this.traverseBF);
    node_result.data = data;
    return;
};

Node.prototype.copyNodeAndChildrens = function(arrClone) {
    for (var j = 0; j < arrClone.length; j++)
    {
        var cloneObject = $.extend(true, {}, arrClone[j]);
        var node = new Node(cloneObject.data);

        if (node.children.length > 0) {
            var arrClone1 = $.extend(true, [], cloneObject.children);
            this.copyNodeAndChildrens(arrClone1);
        }

        this.children.push(node);
    }
};

//Expand or collapse
Node.prototype.expcol = function (expcol)
{
    var thisnode = this;
    (function recurse(currentNode)
    {
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            recurse(currentNode.children[i]);
        }

        if (currentNode != thisnode) {
            currentNode.data.expanded = expcol;
            currentNode.data.iconexpanded = expcol;
        }
    })(this);
};

Tree.prototype.traverseDF = function (callback) {

    // this is a recurse and immediately-invoking function
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }

        // step 4
        callback(currentNode);

        // step 1
    })(this._root);

};

Tree.prototype.traverseBF = function (callback) {
    var queue = new Queue();

    queue.enqueue(this._root);
    var currentTree;
    currentTree = queue.dequeue();

    while (currentTree) {
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }

        callback(currentTree);
        currentTree = queue.dequeue();
    }
};

Tree.prototype.findById = function (idnode) {
    var node_result = null;
    this.contains(function (node) { if (node.data.id == idnode) { node_result = node; } }, this.traverseBF);
    return node_result;
};

Tree.prototype.contains = function (callback, traversal) {
    traversal.call(this, callback);
};

Tree.prototype.prepend = function (data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function (node) {
            if (node.data.id * 1 === toData * 1) {
                parent = node;
            }
        };

    this.contains(callback, traversal);

    if (parent) {
        parent.children.unshift(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};

Tree.prototype.add = function (data, childrens , toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function (node) {
            if (node.data.id * 1 === toData * 1) {
                parent = node;
            }
        };

    this.contains(callback, traversal);

    if (parent)
    {
        parent.children.push(child);
        child.parent = parent;
        child.children = childrens;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};

Tree.prototype.addCustom = function (data, traversal, callback) {
    var child = new Node(data),
        parent = null;

    parent = this.contains(callback, traversal);

    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};

Tree.prototype.remove = function (data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove,
        index;

    var callback = function (node) {
        if (node.data.id * 1 === fromData * 1) {
            parent = node;
        }
    };

    tree.contains(callback, traversal);

    if (parent) {
        index = findIndex(parent.children, data);

        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }

    return childToRemove;
};

/*Tree.prototype.remove_ = function (data, fromData, traversal) {
    var parent = null,
        childToRemove = null,
        index;

    var callback = function (node) {
        if (node.data === fromData) {
            parent = node;
        }
    };

    this.contains(callback, traversal);

    if (parent) {
        index = findIndex(parent.children, data);

        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }

    return childToRemove;
};*/

Tree.prototype.sortChildrens = function (parent, indexTo)
{
    var lastValue = parent.children[parent.children.length - 1];

    for (var i = parent.children.length - 1; i > 0 ; i--) {
        if (i == indexTo) break;
        var value = parent.children[i - 1];
        parent.children[i] = value;
    }

    parent.children[indexTo] = lastValue;
};

function findIndex(arr, data) {
    var index = -1;

    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data.id * 1 === data.id * 1) {
            index = i;
            break;
        }
    }

    return index;
}