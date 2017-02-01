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

        static FindIndex(arr : Array<any>, data : IdataManage) : number 
        {
            var index = -1;

            for (var i = 0; i < arr.length; i++) {
                if (arr[i].data.id * 1 === data.Id * 1) {
                    index = i;
                    break;
                }
            }

            return index;
        }

        static ExtendsDefault(source : any, properties : any)
        {
            var property;
            for (property in properties) {
                if (properties.hasOwnProperty(property)) {
                    source[property] = properties[property];
                }
            }
            return source;
        }

        static ImValNew(tag : any, type : any) : NodeElement
        {
            tag = this.Capitalize(tag);
            type = this.Capitalize(type);

            if (Logic[type][tag] != null)
                return Logic[type][tag];
            else
                return Logic[type][tag + "Type"];
        }

        static ToasterTitle : string = "IMPACTMADE"

        static msg_toaster(msg : any, type : any, pos : any)
        {
            pos = typeof pos !== 'undefined' ? pos : 'toast-bottom-right';
            var toastr : any = {};
            toastr.options = {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": pos,
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };

            toastr[type](msg, Util.ToasterTitle);
        }

        static msg_error(msg, pos) {
            Util.msg_toaster(msg, "error", pos);
        }
        static msg_success(msg, pos) {
            Util.msg_toaster(msg, "success", pos);
        }
        static msg_info(msg, pos) {
            Util.msg_toaster(msg, "info", pos);
        }
        static msg_warning(msg, pos) {
            Util.msg_toaster(msg, "warning", pos);
        }
    }
}