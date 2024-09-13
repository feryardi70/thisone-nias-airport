const maskapai = document.querySelectorAll(".maskapai");
//console.log(maskapai.length);
for (let i = 0; i < maskapai.length; i++) {
  if (maskapai[i].innerHTML == "QG") {
    const divTampilLogo = '<img src="img/citilinkupdate.png" alt="" />';

    const logoContainer = document.querySelectorAll(".tampillogo");
    logoContainer[i].innerHTML = divTampilLogo;
  } else if (maskapai[i].innerHTML == "AK") {
    const divTampilLogo = '<img src="img/airasiaupdate.png" alt="" />';

    const logoContainer = document.querySelectorAll(".tampillogo");
    logoContainer[i].innerHTML = divTampilLogo;
  } else if (maskapai[i].innerHTML == "JT") {
    const divTampilLogo = '<img src="img/lionairupdate.png" alt="" />';

    const logoContainer = document.querySelectorAll(".tampillogo");
    logoContainer[i].innerHTML = divTampilLogo;
  } else if (maskapai[i].innerHTML == "GA") {
    const divTampilLogo = '<img src="img/garudaindoupdate.png" alt="" />';

    const logoContainer = document.querySelectorAll(".tampillogo");
    logoContainer[i].innerHTML = divTampilLogo;
  } else if (maskapai[i].innerHTML == "IU") {
    const divTampilLogo = '<img class="" src="img/superairupdate.png" alt="" />';

    const logoContainer = document.querySelectorAll(".tampillogo");
    logoContainer[i].innerHTML = divTampilLogo;
  } else if (maskapai[i].innerHTML == "IW" || "iw" || "Iw" || "iW" ) {
    const divTampilLogo = '<img class="" src="img/wingairupdate.png" alt="" />';

    const logoContainer = document.querySelectorAll(".tampillogo");
    logoContainer[i].innerHTML = divTampilLogo;
  } else if (maskapai[i].innerHTML == "ID") {
    const divTampilLogo = '<img class="" src="img/batikairupdate.png" alt="" />';

    const logoContainer = document.querySelectorAll(".tampillogo");
    logoContainer[i].innerHTML = divTampilLogo;
  } else if (maskapai[i].innerHTML == "IP") {
    const divTampilLogo = '<img class="" src="img/pelitaairupdate.png" alt="" />';

    const logoContainer = document.querySelectorAll(".tampillogo");
    logoContainer[i].innerHTML = divTampilLogo;
  }
}
