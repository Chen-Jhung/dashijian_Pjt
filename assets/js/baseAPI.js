//注意 每次调用get 或者 post 或者 ajax 的时候，会先调用 
//会先调用ajaxPrefilter 函数
// 在这个函数中， 可以拿到 ajax提供的配置对象
$.ajaxPrefilter(function(options) {
    //在发起真正的ajax 请求之前，同意拼接请求的根路劲
    options.url = 'http://www.liulongbin.top:3007' + options.url
    console.log(options.url);
})