chrome.runtime.onInstalled.addListener(() => {
    //親メニュー
    const parentId = chrome.contextMenus.create({
        title : "Huga Extension",
        id : "parent",
        type : "normal",
        contexts : ["all"]
    });

    //子メニュー
    const childId = chrome.contextMenus.create({
        title : "test",
        id : "child",
        type : "normal",
        contexts : ["all"],
        parentId : "parent"
    });

    const clip = chrome.contextMenus.create({
        title : "選択範囲をクリップボードに保存",
        id : "clip",
        type : "normal",
        contexts : ["selection"],
        parentId : "parent"
    });
    
    console.log("Extension was installed!");
});


//コンテキストメニュー押下時の動作
chrome.contextMenus.onClicked.addListener((info) => {
    if(info.menuItemId == "clip"){
        const selected = info.selectionText;
        if(selected != null){
            console.log(selected);
            navigator.clipboard.writeText("selected");
            chrome.storage.local.set({"selected" : selected});
        }

        const clipped = chrome.contextMenus.create({
            title : selected,
            id : "clipped",
            type : "normal",
            contexts : ["all"],
            parentId : "parent"
        });

        //クリップボード削除
        const deleteClipboard = chrome.contextMenus.create({
            title : "クリップボードを削除",
            id : "delete",
            type : "normal",
            contexts : ["all"],
            parentId : "parent"
        });
    };
    if(info.menuItemId == "delete"){
        chrome.contextMenus.remove("delete");
        chrome.contextMenus.remove("clipped", () => {
            console.log("Clipped text was deleted!");
        });
    }
    if(info.menuItemId == "clipped"){
        chrome.storage.local.get("clipped", (data) => {
            console.log(data.selected);
        });
    }
    if(info.menuItemId == "child"){
        navigator.clipboard.writeText("test");
    }
});