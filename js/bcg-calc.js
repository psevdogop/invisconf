$(function () {
    //redirect to secure version of page if we are not there.
    if (document.location.protocol != "https:") {
        var x = "https://bcgt-vertical-marketing-site-au.worldsecuresystems.com" + document.location.pathname + document.location.search;
        window.location.replace(x);
    }
    $("a").each(function (idx) {
        var href = $(this).attr("href");
        if (href.indexOf("http") == -1 && href.indexOf("https") == -1) {
            href = "http://bcgt-vertical-marketing-site-au.hotpressplatform.com" + href;
            $(this).attr("href", href);
        }
    });

    $(".js-single, .js-multi, .js-qty").change(calcPrice);
    $("#js-confirm-button-1, #js-confirm-button-2").click(redirect);
    $("#js-promo-input").blur(calcPrice);
    
    $("#js-promo-input").focus(function () {
        var $this = $(this);
        var txtValue = $this.val();
        if (txtValue === "Enter promo code")
            $this.val("");
    });
    $("#js-promo-input").focusout(function () {
        var $this = $(this);
        var txtValue = $this.val();
        if (txtValue === "")
            $this.val("Enter promo code");            
    });


    calcPrice();
});

function calcPrice() {
    var addonPrice = 0.0;
    var basePrice = 0.0;
    var discountAmount = 0.0;
    var numOfDays = 0;

    basePrice = parseFloat($("#js-base-price").attr("data-price"));
    numOfDays = parseInt($("#js-day-count").attr("data-days"));

    var persistObject = {
        items: new Array(),
        basePrice: basePrice,
        numberOfDays: numOfDays,
        addonPrice: addonPrice,
        discountAmount: discountAmount,
        totalPrice: 0.0,
        discountCode: ""
    };

    $(".js-single").each(function () {
        var $this = $(this);
        if ($this.attr("checked")) {
            var pri = $this.parent("div.field").attr("data-price");
            pri = parseFloat(pri);
            addonPrice += pri;
            var days = parseInt($this.parent("div.field").attr("data-days"));
            numOfDays += days;
            var item = { label: $this.parent("div.field").attr("data-label"), amt: pri, qty: 1 };
            persistObject.items.push(item);
        }
    });

    $(".js-multi").each(function () {
        var $this = $(this);
        if ($this.attr("checked")) {
            var pri = $this.parent("div.field").attr("data-price");
            var ddlval = $("select.js-qty", $this.parent()).val();
            pri = parseFloat(pri);
            ddlval = parseFloat(ddlval);
            addonPrice += (pri * ddlval);
            var days = parseInt($this.parent("div.field").attr("data-days"));
            numOfDays += days;
            var item = { label: $this.parent("div.field").attr("data-label"), amt: pri, qty: ddlval };
            persistObject.items.push(item);
        }
    });

    $("#js-addon-price-label").text(formatCurrency(addonPrice));

    var userCode = $("#js-promo-input").val();

    $.get("/_assets/data/data.xml", null, function (data, txtStatus, jqXHR) {
        var $data = $(data);
        var element = $("promo-code[code='" + userCode + "']", $data)
        var code = element.attr("code");
        if (code != undefined) {
            var type = element.attr("type");
            if (type == "percent") {
                discountAmount = (parseFloat(element.attr("value")) / 100) * (basePrice + addonPrice);
            }
            if (type == "fixed") {
                discountAmount = parseFloat(element.attr("value"));
            }

        }
        else {
            discountAmount = 0.0;
        }
        $("#js-promo-price-label").text(formatCurrency(discountAmount));
        $("#js-total-price-label").text(formatCurrency((basePrice + addonPrice) - discountAmount));

        $("#js-day-count").text(numOfDays);

        persistObject.addonPrice = addonPrice;
        persistObject.basePrice = basePrice;
        persistObject.discountAmount = discountAmount;
        persistObject.numberOfDays = numOfDays;
        persistObject.totalPrice = (basePrice + addonPrice) - discountAmount;
        persistObject.discountCode = userCode;

        var obj = JSON.stringify(persistObject);

        YUI().use('cookie', function (yyy) {
            obj = Base64.encode(obj);
            yyy.Cookie.set("_plan_info", obj, { path: "/" });
        });


    });


}

function formatCurrency(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num))
        num = "0";
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10)
        cents = "0" + cents;
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    return (((sign) ? '' : '-') + '$' + num + '.' + cents);
}

function redirect() {
    calcPrice();
    document.location.href = window.REDIRECT_PAGE;
}





/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/

var Base64 = {

    // private property
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode: function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);

        }

        return output;
    },

    // public method for decoding
    decode: function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = Base64._utf8_decode(output);

        return output;

    },

    // private method for UTF-8 encoding
    _utf8_encode: function (string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode: function (utftext) {
        var string = "";
        var i = 0;
        var c = c1 = c2 = 0;

        while (i < utftext.length) {

            c = utftext.charCodeAt(i);

            if (c < 128) {
                string += String.fromCharCode(c);
                i++;
            }
            else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return string;
    }

}