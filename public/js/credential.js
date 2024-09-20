//
fetch("/credentialNt0rtJXD")
  .then((response) => response.json())
  .then((response) => response.data)
  .then((data) => {
    //console.log(data);
    //let divInput = "";

    //response.forEach((cred) => {
    let divInput = `
            <div> 
                <input type="hidden" name="username" value="${data.username}" />
                <input type="hidden" name="password" value="${data.password}" />
            </div>       
            `;
    // });

    const inputContainer = document.querySelector("#hidden-input");
    inputContainer.innerHTML = divInput;
  });
