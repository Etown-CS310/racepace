(function(){

    window.addEventListener('load',init);

    function init(){
        fetch(window.location.origin+'/getHighScores')
        .then((response)=>{
            if(response.ok)
                return response.json();
            else
                return {msg:'Network error'};
        })
        .then(displayScores)
        .catch(console.log);
    }

    function displayScores(scores){
        let scoreBody=document.getElementById('scoreBody');
        for(let i=0;i<scores.length;i++){
            let row= document.createElement('tr');
            let username= document.createElement('td');
            let score= document.createElement('td');
            username.innerHTML=scores[i].username;
            score.innerHTML= scores[i].highscore;
            row.appendChild(username);
            row.appendChild(score);
            scoreBody.appendChild(row);
        }
    }





})();