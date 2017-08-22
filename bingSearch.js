<!DOCTYPE html>
<html>

<head>
    <title>Bing Search API</title>
    <script src="https://code.jquery.com/jquery-2.2.4.min.js" integrity="sha256-BbhdlvQf/xTY9gja0Dq3HiwQF8LaCRTXxZKRutelT44=" crossorigin="anonymous"></script>
    <script type="text/javascript">
        (function($) {
            $.bingSearch = function(option) {

                let bingApiUrl = 'https://api.cognitive.microsoft.com/bing/v5.0/search';
                var options = $.extend({
                    'keyword': '',
                    'apiKey': '5f793a06f6124a029b96506e9a009461',
                }, option || {});

                $.ajax({
                    url: bingApiUrl,
                    data: {
                        'q': options.keyword,
                    },
                    headers: {
                        'Ocp-Apim-Subscription-Key': options.apiKey,
                        count: 5
                    },
                    success: function(response) {
                        if ($.isFunction(options.onSuccess)) {
                            options.onSuccess.call(this, response);
                        }
                    },
                    error: function(response) {
                        console.log(response.responseJSON);
                        return;
                    }
                });
            }
        })(jQuery);
    </script>
    <script type="text/javascript">
        $(function() {
            $('.find').click(function() {
                $.bingSearch({
                    apiKey: '5f793a06f6124a029b96506e9a009461',
                    keyword: $('.keyword').val(),
                    count: 5,
                    onSuccess: function(response) {
                        var data = response.webPages.value;
                        $('.result').html('');
                        for (var i = 0; i < data.length; i++) {
                            let situs = data[i];
                            let element = `
                                <div class="siteList">
                                <a href="${situs.url}" target="_blank">${situs.name}</a> <br/>
                                <span class="displayUrl">${situs.displayUrl}</span> <br/> 
                                ${situs.snippet}
                                </div>
                            `;
                            $('.result').append(element);
                        }
                    }
                });
            });
        })
    </script>
    <style type="text/css">
        body {
            font-family: Arial;
        }

        input {
            padding: 10px;
            width: 400px;
        }

        button {
            padding: 11px;
            background: blue;
            border: blue;
            color: white;
            font-weight: bold;
        }

        .siteList {
            padding: 0px 20px;
            margin-bottom: 20px;
        }

        hr {
            border: none;
            border-bottom: 1px solid #ddd;
        }

        .siteList a {
            color: blue;
        }

        .siteList .displayUrl {
            color: #019030;
        }
    </style>
</head>

<body>
    <input type="text" class="keyword" placeholder="Scrivi qualcosa da cercare">
    <button class="find">GO</button>
    <hr/>
    <div class="result"></div>
</body>


</html>
