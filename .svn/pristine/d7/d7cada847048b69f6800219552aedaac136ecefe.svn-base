// var num = 60
// export const resend = element => {
//     if (num === 0) {
//         element.disabled = ''
//         element.style.color = '#fff'
//         element.style.backgroundColor = '#41B883'
//         element.style.border = 0
//         element.innerHTML = '获取验证码'
//         return
//     }else {
//         element.innerHTML = num + '秒后重新获取'
//         element.style.color = ' #ccc'
//         element.style.backgroundColor = '#f5f5f5'
//         element.style.border = '1px solid #ddd'
//         element.disabled = ' disabled'
//         num--
//     }
//     // console.log(element)
//     setInterval(function () {
//         resend(element)}
//         , 1000)
//   }

var countdown=60; 
export const resend = (element) => { 
    if (countdown == 0) { 
        element.removeAttribute("disabled"); 
        element.style.color = '#fff'
        element.style.backgroundColor = '#aa2216'
        element.style.border = 0   
        element.innerHTML = '获取验证码'
        countdown = 60; 
        return;
    } else { 
        element.setAttribute("disabled", true);
        element.style.color = ' #ccc'
        element.style.backgroundColor = '#f5f5f5'
        element.style.border = '1px solid #ddd'
        element.innerHTML = countdown + '秒后重新获取' 
        countdown--; 
    } 
setTimeout(function() { 
    resend(element) }
    ,1000)
}