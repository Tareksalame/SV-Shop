const signIn = ()=>
{
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;
    fetch('/',
    {
        headers:{
            "Content-Type": "application/json"
        },
        method:'post',
        body:JSON.stringify({
            email: email,
            password: password
        })
    }).then((res)=>{return res.json()}).
    then((data)=>
    {
        const user = JSON.stringify(data);
        localStorage.setItem("user",user);
        if(data == null)
        {
            alert('Please Enter a Correct Email And Password')
        }
        else
        {
            fetch('/products').then((res)=>{return res.json()}).
            then((data)=>{
                const dataString = JSON.stringify(data);
                localStorage.setItem("myProducts", dataString);
                window.location.href = "products.html";
            }).catch((err)=>{console.log('error')})
        }

    }).catch((err)=>{console.log('error')})
}

