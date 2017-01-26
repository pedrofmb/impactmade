module treeViewCore
{
    export class Util
    {
        static Capitalize(word : string ) : string
        {
            if(word != undefined && word != "")
              return word.charAt(0).toUpperCase() + word.slice(1);

            return "";
        }

        static ImEval(functionName : string ) : any
        {
            switch (functionName) 
            {
                case "function":
                    return eval("functiontype");
                case "if":
                    return eval("iftype");
                default:
                    return eval(functionName.toLowerCase());
            }
        }

        static CastValue(tag: string, type : string) : any
        {
            tag = Util.Capitalize(tag || "");
            type = Util.Capitalize(type || "");

            if (Logic[type][tag] != null)
                return Logic[type][tag];
            else
                return Logic[type][tag + "Type"];
        }

        
    }
}