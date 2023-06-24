// const signup = ()=>
// {
//     let fullName = document.getElementById('fullName').value;
//     let email = document.getElementById('email').value;
//     let password = document.getElementById('password').value;
//     fetch('/signup',
//     {
//         headers:{
//             "Content-Type": "application/json"
//         },
//         method:'post',
//         body: JSON.stringify({
//             fullName:fullName,
//             email:email,
//             password:password
//         })
//     }).then((res)=>{return res.json()}).
//     then((data)=>{
//         if(data == null)
//         {
//             return true
//         }
//         else
//         {
//             return false
//         }
//     })
// }