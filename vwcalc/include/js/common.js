var resultVal = 0;
var submitLock = false;

$(function(){
    $(window).load(init);
});

function init() {
    $('#source-value').on('propertychange change keyup paste input', quickCalc);
}

function quickCalc() {
    const _val = parseInt($(this).val());
    const _total = parseInt($('#base-value').val());
    var _result = ((_val/_total)*100).toFixed(4);
    console.log(_result);
    if(isNaN(_result)) {
        _result = '0.0000';
    }
    resultVal = _result;
    $('#result-value').text(_result);
}

function copyResult() {
    copyVal(resultVal);
    if(submitLock) return;
    submitLock = true;
    $('.btn-copy').text('복사되었습니다');
    setTimeout(function(){
        $('.btn-copy').text('복사하기');
        submitLock = false;
    },1000);
}
function copyVal(val) {
    $('#clipboard').attr('type','text').val(val).select();
    document.execCommand('copy');
    $('#clipboard').attr('type','hidden');
}
function generateTable(val) {
    var _total = parseInt($('#base-value').val());
    if(val!=undefined) {
        _total = val;
        $('#base-value').val(val);
    }
    console.log(val,_total);
    var _html = '';
    for(var i=0; i<_total; i++) {
        const _source = i+1;
        const _result = ((_source/_total)*100).toFixed(4);
        _html +=
            '<div class="td">' +
            '   <div class="source">' +
            '       <span class="label">'+_source+'</span>' +
            '       <span class="unit">px</span>' +
            '   </div>' +
            '   <div class="result">' +
            '       <span class="label" onclick="copyVal('+_result+')">'+_result+'</span>' +
            '       <span class="unit">vw(%)</span>' +
            '   </div>' +
            '</div>';
    }
    $('#table').html(_html);
}