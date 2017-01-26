declare module treeViewCore {
    class Node {
        Data: IdataManage;
        Parent: string;
        Childrens: any[];
        constructor(data: any);
        CambiarIndice(tree: Tree, parentId: string): void;
    }
}
declare module treeViewCore {
    class Tree {
        Root: Node;
        countNode: number;
        constructor(data: any);
    }
    interface IdataManage {
        Parent: string;
        Id: number;
        NodeId: number;
    }
}
declare module treeViewCore {
    class TreeView {
        constructor();
    }
}
declare module treeViewCore {
    class TreeViewUI {
        constructor();
    }
}
declare module treeViewCore {
    class Util {
        static Capitalize(word: string): string;
        static ImEval(functionName: string): any;
        static CastValue(tag: string, type: string): any;
    }
}
