let btnChange=document.querySelector('#changerVille');
let temperature_label=document.querySelector('#temperature_label');
let ville_label=document.querySelector('#ville_label');
let ville;
if ('geolocation' in navigator){

    navigator.geolocation.watchPosition((position )=> {
        let url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon='+position.coords.longitude+'&appid=9c02776a6954d0a46209b76c0388569c&units=metric';
        let requete=new XMLHttpRequest();
        requete.open('GET',url);
        requete.responseType="json";
        requete.send()

        requete.onload=function () {
            if (requete.readyState===XMLHttpRequest.DONE){
                if (requete.status===200){
                    let reponse=requete.response;
                    ville_label.textContent=reponse.name;
                    temperature_label.textContent=reponse.main.temp;
                    console.log(reponse);
                }else {
                    alert("un probleme est intervenu, merci de revenir pllus tard");
                }

            }
        }
    },()=>{alert('Vous navez pas accepter la geolocation') ;ville='Dakar';
    RecevoirTemperature(ville);},{ enableHighAccuracy:true});
}else {
    ville='Dakar';
    RecevoirTemperature(ville);
}
function RecevoirTemperature(ville) {
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + ville + '&appid=9c02776a6954d0a46209b76c0388569c&units=metric';
    let requete=new XMLHttpRequest();
    requete.open('GET',url);
    requete.responseType="json";
    requete.send()

    requete.onload=function () {
        if (requete.readyState===XMLHttpRequest.DONE){
            if (requete.status===200){
                let reponse=requete.response;
                ville_label.textContent=reponse.name;
                temperature_label.textContent=reponse.main.temp;
                console.log(reponse);
            }else {
                alert("un probleme est intervenu, merci de revenir plus tard");
            }

        }
    }
}


btnChange.addEventListener('click',function () {
    ville =prompt("Qu'elle ville voulez-vous voir?");
    RecevoirTemperature(ville)
})

