declare module treeViewCore {
    interface IdataManage {
        Parent: number;
        Id: number;
        NodeId: number;
        Tag: string;
        Expanded: any;
        Iconexpanded: any;
        Icon: string;
        Attrs: any;
    }
    interface IRenderNode {
        Queue: Array<any>;
        Indent: number;
        IconExpanded: string;
        IconCollapsed: string;
    }
    class Node {
        Data: IdataManage;
        Parent: string;
        Childrens: Node[];
        constructor(data: IdataManage);
        CambiarIndice(tree: Tree, parentId: number): void;
        ReconstruirIndices(tree: Tree): void;
        GetIndentTpl(numIndex: any): string;
        RenderUI(): string;
        RenderUINode(options: IRenderNode): string;
    }
}
declare module treeViewCore {
    class Tree {
        Root: Node;
        countNode: number;
        constructor(data: any);
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
