!function () {

    function openModals() {
        document.querySelectorAll(".modal:not(.hide)")[0].classList.add("hide");
        document.getElementById(`modal-${this.id}`).classList.remove("hide");
    }

    function obtain() {
        let t;
        let ts = document.querySelectorAll(".qr-type");
        ts.forEach(e => {
            if (e.checked) { t = e.id }
        });
        switch (t) {
            case "URL":
                create(document.getElementById("content").value);
                break;
            case "VCD":
                encodeVCARD();
                break;
            case "EVENT":
                encodeEVENT();
                break;
            case "WIFI":
                encodeWIFI();
                break;
            case "SMS":
                encodeSMS();
                break;
            case "Email":
                encodeEMAIL();
                break;
            case "TEXTAREA":
                create(e = document.getElementById("content-textarea").value);
                break;
            default:
                return;
        }
    }

    function imgUpload() {
        let e = this.files[0],
            t = new FileReader;
        t.readAsDataURL(e), t.onloadend = (() => {
            document.getElementById("pic").setAttribute("src", t.result)
        })
    }

    function resetImgUpload() {
        document.getElementById("pic").setAttribute("src", ""), document.getElementById("picUp").value = ""
    }

    function create(e) {
        let t;
        t = document.getElementById("isBGtransparent").checked ? "transparent" : document.getElementById("background").value, document.getElementById("canvas").innerHTML = "";
        let n = !1;
        "1" === document.getElementById("backgroundData").value && (n = !0);
        let o = document.getElementById("pic").getAttribute("src");
        "" === o && (o = document.getElementById("picUrl").value);
        try {
            const d = new newCode({
                width: document.getElementById("QRdimensions").value,
                height: document.getElementById("QRdimensions").value,
                margin: document.getElementById("qrMargin").value,
                type: "svg",
                data: e,
                image: o,
                dotsOptions: {
                    color: document.getElementById("dataColor").value,
                    type: document.getElementById("dataChoices").value
                },
                backgroundOptions: {
                    color: t
                },
                imageOptions: {
                    crossOrigin: "anonymous",
                    imageSize: document.getElementById("imgSize").value,
                    margin: document.getElementById("imgMargin").value,
                    hideBackgroundDots: n
                },
                qrOptions: {
                    errorCorrectionLevel: document.getElementById("errorCorrection").value,
                    typeNumber: document.getElementById("typeNumber").value
                },
                cornersSquareOptions: {
                    type: document.getElementById("cornerChoices").value,
                    color: document.getElementById("cornerColor").value
                },
                cornersDotOptions: {
                    type: document.getElementById("dotChoices").value,
                    color: document.getElementById("dotColor").value
                }
            });
            d.append(document.getElementById("canvas")), document.getElementById("download").addEventListener("click", () => {

                d.download({
                    name: "qr",
                    extension: document.querySelectorAll("input[name='ext']:checked")[0].id
                })
            }), document.querySelectorAll(".constructor-clear").forEach(e => e.addEventListener("click", () => Object.keys(d).forEach(function (e) {
                delete d[e]
            })))
        } catch (e) {
            console.log(e), document.getElementById("canvas").innerHTML = "shorten data and adjust settings"
        }
    }

    function encodeVCARD() {
        let e = "BEGIN:VCARD \nVERSION:4.0 \nFN:" + document.getElementById("fullName").value + " \nTEL:" + document.getElementById("phone").value + " \nEMAIL:" + document.getElementById("email").value + " \nURL:" + document.getElementById("vc_url").value + " \nORG:" + document.getElementById("company").value + " \nTITLE:" + document.getElementById("title").value + " \nNOTE:" + document.getElementById("notes").value + " \nEND:VCARD \n";
        setTimeout(create(e), 300)
    }

    function encodeWIFI() {
        let e = document.getElementById("ssid").value,
            t = document.getElementById("encryption").value,
            n = document.getElementById("password").value,
            o = document.getElementById("hidden").value;
        t = "0" !== t, setTimeout(create("WIFI:S:" + e + ";T:" + t + ";P:" + n + ";H:" + o + ";;"), 300)
    }

    function encodeSMS() {
        let sendto = document.getElementById("sendTo").value;
        let sendmsg = document.getElementById("sendMsg").value;
        setTimeout(create(`SMSTO:${sendto}:${sendmsg}`), 300);
    }

    function encodeEMAIL() {
        let mailto = document.getElementById("mailTo").value;
        let mailsubj = document.getElementById("mailSubj").value.toString().replaceAll(" ", "%20");
        let mailmsg = document.getElementById("mailMsg").value.toString().replaceAll(" ", "%20");
        setTimeout(create(`mailto:${mailto}?subject=${mailsubj}&body=${mailmsg}`), 300);
    }

    function encodeEVENT() {
        let e = (new Date).toISOString().split("-").join("").split(":").join("").split(".").join("") + "-" + parseInt(Math.random().toString().split(".")[1]).toString(16).substring(0, 5).toString() + "@example.com",
            t = new Date(document.getElementById("datestart").value + " " + document.getElementById("timestart").value).toISOString().split("-").join("").split(":").join("").split(".").join("").slice(0, -4) + "Z",
            n = new Date(document.getElementById("dateend").value + " " + document.getElementById("timeend").value).toISOString().split("-").join("").split(":").join("").split(".").join("").slice(0, -4) + "Z",
            o = "BEGIN:VCALENDAR \nVERSION:2.0 \nPRODID:16951975-1492-3045-a370-374219932021 v1.0//EN \nBEGIN:VEVENT \nUID:" + e + " \nDTSTAMP:" + e.split("-")[0] + " \nDTSTART:" + t + " \nDTEND:" + n + " \nSUMMARY:" + document.getElementById("summary").value + " \nDESCRIPTION:" + document.getElementById("description").value + "\nLOCATION:" + document.getElementById("location").value + "\nEND:VEVENT \nEND:VCALENDAR \n";
        setTimeout(create(o), 300)
    }
    window.onload = function () {
        document.querySelectorAll(".clickable").forEach(function (e) {
            e.addEventListener("keypress", function (evt) {
                if (evt.key === "Enter") { evt.preventDefault; this.click() }
            })
        })
        document.getElementById("palette").addEventListener("click", function () { document.getElementById("settings").classList.toggle("hide"); this.classList.toggle("light") });
        document.querySelectorAll("[name='type']").forEach(e => e.addEventListener("change", openModals)), document.getElementById("picUp").addEventListener("change", imgUpload), document.getElementById("picUploadReset").addEventListener("click", resetImgUpload), document.getElementById("data").addEventListener("click", obtain)
    };

}();