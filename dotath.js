console.log("%cWelcome to the DOT ATH Track console", "color:#B05D23;text-decoration:underline;font-weight:bold;");
let curList = [
    ["usd"],
    ["eur"],
    ["jpy"], 
    ["gbp"],
    ["aud"],
    ["cad"],
    ["chf"],
    ["cny"],
    ["hkd"],
    ["nzd"],
    ["sek"],
    ["krw"],
    ["sgd"],
    ["nok"],
    ["mxn"],
    ["inr"],
    ["rub"],
    ["zar"],
    ["try"],
    ["brl"],
    ["twd"]
];
let curSymb = {
    usd: "$",
    eur: "€",
    jpy: "¥", 
    gbp: "£",
    aud: "$",
    cad: "$",
    chf: "CHF",
    cny: "¥",
    hkd: "$",
    nzd: "$",
    sek: "KR",
    krw: "₩",
    sgd: "$",
    nok: "KR",
    mxn: "$",
    inr: "₹",
    rub: "₽",
    zar: "R",
    try: "₺",
    brl: "R$",
    twd: "NT$"
};
async function update() {
    function getCur(cur) {
        let symbol = curSymb[cur];
        var xhReq = new XMLHttpRequest();
        const url = ("https://api.coingecko.com/api/v3/coins/markets?ids=polkadot&vs_currency=" + cur);
        xhReq.open("GET", url, false);
        xhReq.send(null);
        var curData = JSON.parse(xhReq.responseText);
        const date = curData[0].ath_date.split("T");
        let ndate = date[0].slice(5,10) + "-" + date[0].slice(0,4);
        function updateContent() {
            const dotCur = document.getElementById("dot" + cur);
            const dotCurAth = document.getElementById(cur + "ath");
            const curPerc = document.getElementById(cur + "Perc");
            dotCur.classList.remove("change");
            if (dotCur.innerText !== "1 DOT = " + symbol + curData[0].current_price.toLocaleString()) {
                dotCur.innerText = "1 DOT = " + symbol + curData[0].current_price.toLocaleString();
                dotCur.classList.add("change");
            };
            dotCurAth.innerText = "ATH: " + symbol + curData[0].ath.toLocaleString() + " on " + ndate;
            curPerc.innerText = "Difference from ATH: " + curData[0].ath_change_percentage.toFixed(2) + "%";
            let curYesNo = document.getElementById(cur + "YesNo");
            if (curData[0].ath === curData[0].high_24h) {
                curYesNo.innerText = "YES";
                curYesNo.className = "yes";
            } else {
                curYesNo.innerText = "NO";
                curYesNo.className = "no";
            };
        };
        updateContent();
    };
    for (var i = 0; i < curList.length; i++) {
        getCur(curList[i]);
    };
};
update();
setInterval(update, 30000);