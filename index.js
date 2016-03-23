var async = require('async');
var client = require('cheerio-httpcli');
 
var CITY_CODES = {
    "chiyoda": "C13101",
    "chuo": "C13102",
    "minato": "C13103",
    "shinjuku": "C13104",
    "bunkyo": "C13105",
    "taito": "C13106",
    "sumida": "C13107",
    "koto": "C13108",
    "shinagawa": "C13109",
    "meguro": "C13110",

    "ota": "C1311",
    "setagaya": "C13112",
    "shibuya": "C13113",
    "nakano": "C13114",
    "suginami": "C13115",
    "toshimaku": "C13116",
    "kita": "C13117",
    "arakawa": "C13118",
    "itabashi": "C13119",
    "nerima": "C13120",

    "adachi": "C13121",
    "katsushika": "C13122",
    "edogawa": "C13123"
};

exports.handler = function(event, context) {
    var params = {
        SrtT: 'rt',
        sk: '焼肉',
        sort_mode: 1
    }

    // 結果リスト
    var list = [];

    client.fetch('http://tabelog.com/tokyo/C13114/rstLst/yakiniku/', params, function (err, $, res) {
            // HTMLタイトルを表示
            console.log($('title').text());

            // 店名とリンクを取得
            $('a.list-rst__rst-name-target').each(function (idx) {
                var e = {
                    name: $(this).text(),
                    link: $(this).attr('href')
                };

                list.push(e);
            });

            // 総合評価を取得
            $('span.list-rst__rating-val').each(function (idx) {
                var tmp_idx = idx + 2;

                // 同じclassでhiddenに夜と昼の評価が存在するので取り除いて表示
                if (!(tmp_idx % 3)) {
                    var list_idx = (tmp_idx/3) -1;
                    list[list_idx]['rate'] = $(this).html();
                }
            });

            // 一定以上の評価でフィルタ
            var filtered_list = list.filter(function(shop){
                return shop['rate'] > 3.4;
            });

            // ランダム抽出
            var picked = filtered_list[Math.floor(Math.random() * filtered_list.length ) ];

            // 出力
            console.log(JSON.stringify(picked));
            console.log('district: ');
            console.log(JSON.stringify(event));
            context.succeed(picked);
            });
};
