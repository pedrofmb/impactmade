/// <reference path="../typings/definitions/jquery.d.ts" />
declare module PluginFactory {
    class PluginVariables {
        Parent: JQuery;
        Element: JQuery;
        Msg_warning: any;
        Msg_info: any;
        Services: any;
        VirtualNumber: string;
        PositionCursor: number;
        IdCategory: number;
        NameCategory: string;
        IdVariable: number;
        NameVariable: string;
        Categories: Array<Category>;
        Variables: Array<Variable>;
        private Modal;
        private ModalMain;
        private SelectCategory;
        private SelectVariable;
        constructor(idElement: string, virtualNumber: string);
        OpenModal(positionCursor: number): void;
        private GetCategoryForId(idCategory);
        private GetVariableForId(idVariable);
        private GetCategories(func);
        private GetVariables(categoryId, func);
        CloseModal(input: JQuery): void;
        static GetPositionCursor(id: string): {
            x: number;
            y: number;
        };
        static BuildTextInput(id: string, virtualNumber: string): void;
    }
    class Category {
        Id: string;
        Name: string;
        Description: string;
        Date: string;
        constructor(id: string, name: string, description: string, date?: string);
    }
    enum varType {
        String = 0,
        Numeric = 1,
        Options = 2,
    }
    class Variable {
        Id: string;
        Name: string;
        DateV: string;
        VariableType: varType;
        Options: Array<string>;
        constructor(id: string, name: string, dateV: string, variableType: varType, options: Array<string>);
    }
}
