var commonutil = {
    Version: function(val) {
        return "DAIA Lab Util v1.0. Thank you.";
    },
    ThousandComma: function(val) {
        if(val == null || val == undefined) { return 0; }
        else {
            let temp    = val.toString().split('.');
            let rtnVal  = null;
            let temp01  = null;
            let regExp  = /[^(0-9)]/gi;
            let sign    = null;

            switch(temp.length) {
                case 1 :
                    temp01  = val.toString();
                    sign    = temp01.substr(0,1) === "-" ? "-" : (temp01.substr(0,1) === "+" ? "+" : "");
                    temp01  = temp01.replace(regExp, "");
                    rtnVal  = temp01.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    rtnVal  = sign+rtnVal;
                    break;
                case 2 :
                    temp01  = temp[0].toString();
                    sign    = temp01.substr(0,1) === "-" ? "-" : (temp01.substr(0,1) === "+" ? "+" : "");
                    temp01  = temp01.replace(regExp, "");
                    temp01  = parseInt(temp01);
                    temp01  = temp01.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    rtnVal  = temp01 + "." + temp[1];
                    rtnVal  = sign+rtnVal;
                    break;
                default:
                    rtnVal = val + " 값을 점검하세요!";
                    break;
            }

            return rtnVal;
        }
    },
    FillZero: function(val, index) {
        let prefix = "000000000000000000000000000000000000";

        if( val == "" || val == null || val == undefined ) {
            if(index == null || index == undefined) {
                return 0;
            } else {
                return prefix.substring(prefix.length-index,prefix.length);
            }
        } else {
            if(val.toString().length > index) {
                return val + " 값을 점검하세요!";
            } else if(val.toString().indexOf('-') != -1) {
                return val + " (-)값은 앞에 0을 붙일수 없습니다.";
            }

            let temp = prefix+val;
            if( index == null || index == undefined ) {
                return val;
            } else {
                return temp.substring(temp.length-index,temp.length);
            }
        }
    },
    ToInt: function(val, signYn, sub) {
        let rtnVal  = null;
        let sign    = null;
        let regExp  = /[^(0-9)]/gi;

        if( val == "" || val == null || val == undefined || val == Infinity ) {
            rtnVal = 0;
        } else {
            rtnVal  = val.toString();
            sign    = rtnVal.substr(0,1) === "-" ? "-" : (rtnVal.substr(0,1) === "+" ? "+" : "");
            rtnVal  = parseFloat(rtnVal).toFixed(0);
            rtnVal  = rtnVal.replace(regExp,"");
            rtnVal  = Math.round(rtnVal);

            try {
                rtnVal = parseInt(rtnVal);
            }
            catch(e) {
                rtnVal = 0;
            }
        }

        if(signYn != null && signYn != undefined && signYn === 'Y') {
            rtnVal = sign+rtnVal;
        }

        if( sub == null || sub == undefined ) {
            return rtnVal;
        } else {
            return (rtnVal == 0 || rtnVal == '0') ? sub : rtnVal;
        }
    },
    ToFloat: function(val, index, signYn, sub) {
        let rtnVal  = null;
        let sign    = null;
        let regExp  = /[^(0-9).]/gi;

        if( val == "" || val == null || val == undefined || val == Infinity ) {
            rtnVal = 0;
        } else {
            rtnVal  = val.toString();
            sign    = rtnVal.substr(0,1) === "-" ? "-" : (rtnVal.substr(0,1) === "+" ? "+" : "");
            rtnVal  = rtnVal.replace(regExp,"");

            try {
                if(index == null || index == undefined) {
                    rtnVal = parseFloat(rtnVal);
                } else {
                    rtnVal = parseFloat(rtnVal).toFixed(index);
                }
            }
            catch(e) {
                rtnVal = 0;
            }
        }

        if(signYn != null && signYn != undefined && signYn === 'Y') {
            rtnVal = sign+rtnVal;
        }

        if( sub == null || sub == undefined ) {
            return rtnVal;
        } else {
            return (rtnVal == 0 || rtnVal == 0.0 || rtnVal == '0'|| rtnVal == '0.0') ? sub : rtnVal;
        }
    },

    NullToSpace: function(val) {
        if(val === null) {
            return ''
        } else {
            return val;
        }
    },

    GroupBy: function(array, key) {
        return array.reduce((result, currentValue) => {
            (result[currentValue[key]] = result[currentValue[key]] || []).push(
                currentValue
            );
            return result;
        }, {});
    },
    GetUniqueObjectArray: function(array, key) {
        var tempArray = [];
        var resultArray = [];
        for(var i = 0; i < array.length; i++) {
            var item = array[i];
            if(tempArray.includes(item[key])) {
                continue;
            } else {
                resultArray.push(item);
                tempArray.push(item[key]);
            }
        }
        return resultArray;
    },
    GetRandomInt: function(min, max) {
        let rtnVal = Math.random() * (max-min) + min;
        return Math.floor(rtnVal);
    },
    GetRandomFloat: function(min, max, toFixed) {
        let rtnVal = Math.random() * (max-min) + min;
        let fixed = Math.random() * (max-min) + min;
        rtnVal = rtnVal+"."+fixed;
        rtnVal = this.ToFloat(rtnVal, toFixed);
        return rtnVal;
    },
    GetRandomString: function(length) {
        var result           = '';
        var characters       = '가나다라마바사아자차카타파하ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    },
    GetHtmlTable: function(data) {
        var keys = null;

        /*jshint multistr: true */
        var header = "<html>  \
        <head>  \
            <meta charset='UTF-8'>  \
            <meta name='viewport' content='width=device-width, initial-scale=1.0'>  \
            <title>Document</title> \
            <style> \
                table { \
                    border-collapse: separate;  \
                    border-spacing: 0px;    \
                    -webkit-border-horizontal-spacing: 0px; \
                    -webkit-border-vertical-spacing: 0px;   \
                    color: #424242; \
                    border-bottom: 1px solid #ccc;  \
                }   \
                tr {    \
                    display: table-row; \
                    vertical-align: inherit;    \
                    border-color: inherit;      \
                    height: 15px;               \
                }   \
                td {    \
                    display: table-cell;    \
                    vertical-align: inherit;    \
                    width: 10%;   \
                    text-align: left; \
                    border-top: 1px solid #ccc; \
                }   \
                .tr_title{  \
                    background-color: #dedede;  \
                    height: 20px;   \
                }   \
            </style>    \
        </head>";

        var rtnVal = header + "<body><table><tr class='tr_title'>";

        if( data == null || data == undefined ) {
            // if(data == null || data == undefined || !Array.isArray(data) || data.length < 1) {
            return "데이타가 없습니다.";
        } else {
            if(Array.isArray(data))
            {
                if(data.length > 0) {
                    keys = Object.keys(data[0]);

                    if( (typeof data[0]) == 'string' ) {
                        // set header
                        rtnVal += "<td>키</td><td>값</td></tr>";
                        var key = 1;
                        // make body
                        data.forEach(data => {
                            rtnVal += "<tr>";
                            rtnVal += "<td>"+key+"</td>";
                            rtnVal += "<td>"+data+"</td>";
                            rtnVal += "</tr>";
                            key++;
                        });
                    } else {
                        // make header
                        keys.forEach(element => {
                            rtnVal += "<td>" + element + "</td>";
                        });
                        rtnVal += "</tr>";

                        // make body
                        data.forEach(row => {
                            rtnVal += "<tr>";
                            keys.forEach(key => {
                                rtnVal += "<td>" + row[key] + "</td>";
                            });
                            rtnVal += "</tr>";
                        });
                    }

                    rtnVal += "</table></body></html>";
                } else {
                    rtnVal += "<td> 데이타가 없습니다. </td></tr>";
                    rtnVal += "</table></body></html>";
                }
            } else if((typeof data) == 'object') {
                keys = Object.keys(data);
                // set header
                rtnVal += "<td>키</td><td>값</td></tr>";

                // make body
                keys.forEach(key => {
                    rtnVal += "<tr>";
                    rtnVal += "<td>"+key+"</td>";
                    rtnVal += "<td>"+data[key]+"</td>";
                    rtnVal += "</tr>";
                });
                rtnVal += "</table></body></html>";
            } else {
                rtnVal += "<td> 배열이나 오브젝트가 아님 </td></tr>";
                rtnVal += "</table></body></html>";
            }
            return rtnVal;
        }
    },
    Validate: function() {
        let sampleData = [
            {'name':'조재현','직종':'관리자','나이':34},
            {'name':'신기원','직종':'관리자','나이':44},
            {'name':'안효섭','직종':'비서','나이':55},
            {'name':'진중권','직종':'쫄따구','나이':64},
            {'name':'조용기','직종':'비서','나이':22},
        ];
        // tester
        let s = -7979.1234567;
        let s2 = 7979.1234567;
        let t = this;
        console.log(" 원본값                :" +        s);
        console.log(" 천단위 콤마           :" +        t.ThousandComma(s));
        console.log(" 앞자리0채우기         :" +        t.FillZero(s,15));
        console.log(" 앞자리0채우기         :" +        t.FillZero(s2,15));
        console.log(" 정수로                :" +        t.ToInt(s));
        console.log(" 정수+0값대체          :" +        t.ToInt(0,'Y', "$"));
        console.log(" 실수로                :" +        t.ToFloat(s,1));
        console.log(" 실수+0값대체          :" +        t.ToFloat(0,1,'Y', '#'));
        console.log(" 정수랜덤값            :" +        t.GetRandomInt(1,1000));
        console.log(" 실수랜덤값            :" +        t.GetRandomFloat(1,1000,2));
        console.log(" 문자열랜덤값          :" +        t.GetRandomString(5));
        console.log(" 복합 정수+콤마        :" +        t.ThousandComma( t.ToInt(s)) );
        console.log(" 그룹", t.GroupBy(sampleData, '직종'));
        console.log(' 유니크오브젝트어레이', t.GetUniqueObjectArray(sampleData, '직종'));

        // tester
    }
};

module.exports = commonutil;