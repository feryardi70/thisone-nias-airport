fetch("/apideparture")
  .then((response) => response.json())
  .then((response) => response)
  .then((data) => {
    console.log(data);
    //
  });
