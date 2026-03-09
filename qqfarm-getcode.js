/*************************
 * QX 脚本：QQ农场小程序 自动提取 code
 * 使用方式：
 *   1. 进入 QQ → 经典农场小程序
 *   2. 脚本会自动抓到 ws 连接里的 code
 *   3. 弹出本地通知 + 存到 persistentStore
 *************************/

let body = $response.body || "";
let url = $request.url || "";

if (url.includes("gate-obt.nqf.qq.com/prod/ws") && url.includes("code=")) {
    // 从 URL 里抠 code
    const codeMatch = url.match(/[?&]code=([^&]+)/);
    if (codeMatch && codeMatch[1]) {
        const code = codeMatch[1];

        // 存到本地（方便以后农场脚本读取）
        $prefs.setValueForKey(code, "qq_farm_code");

        // 同时发本地通知（最直接的方式）
        const notifyTitle = "QQ农场 code 已捕获";
        const notifyBody = `code = ${code}\n\n已保存，可以拿去挂了周哥！🤩`;
        
        $notify(notifyTitle, "", notifyBody);

        console.log(`[QQ农场] 捕获到 code: ${code}`);
    } else {
        console.log("[QQ农场] 未在 URL 中找到 code 参数");
    }
}

// 必须返回原响应，不然小程序可能连不上
$done({ body: body });
