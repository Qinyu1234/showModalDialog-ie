(function() {
    var showModalDialogX = window.showModalDialog;
    window.showModalDialog4IE = function(url,arg,opt,callback){
        var rtnVar = showModalDialogX(url,arg,opt);
        if(callback){
            callback(rtnVar);
        }
    }
    window.showModalDialog4Webkit = function(url,arg,opt,callback){
        url = url || ''; //URL of a dialog
        arg = arg || null; //arguments to a dialog
        opt = opt || 'dialogWidth:1024px;dialogHeight:768px'; //options: dialogTop;dialogLeft;dialogWidth;dialogHeight or CSS styles
        // 创建dialog
        var dialog = document.body.appendChild(document.createElement('dialog'));
        dialog.setAttribute('style', opt.replace(/dialog/gi, ''));
        dialog.innerHTML = '<a href="#" id="dialog-close" style="position: absolute; top: 0; right: 5px; font-size: 20px; color: #000; text-decoration: none; outline: none;">&times;</a><iframe id="dialog-body" src="' + url + '" style="border: 0; width: 100%; height: 100%;"></iframe>';
        // 右上角X关闭弹框事件
        document.getElementById('dialog-close').addEventListener('click', function(e) {
            var returnValue = document.getElementById("dialog-body").contentWindow.returnValue;
            document.body.removeChild(dialog);
        });
        // dialog关闭事件
        dialog.addEventListener('close', function() {
            var returnValue = document.getElementById("dialog-body").contentWindow.returnValue;
            document.body.removeChild(dialog);
        });
        // 子页面关闭事件
        var dialogFrame = document.getElementById("dialog-body")
        dialogFrame.addEventListener('load', function() {
            dialogFrame.contentWindow.window.close = function(){
                dialog.close();
                if(callback){
                    callback(dialog.contentWindow.window.parent.returnValue);
                }
            }
        });
        dialogFrame.contentWindow.dialogArguments = arg;
        // 显示dialog
        dialog.showModal();
    }
    window.showModalDialog = window.showModalDialog ? window.showModalDialog4IE : window.showModalDialog4Webkit;
})();