
const button = document.getElementById('button');
const audioElement = document.getElementById('audio');




// Disable/Enable Button
function toggleButton(){
    button.disabled = !button.disabled;
}

// Passing joke to VoiceRSS API
function tellMe(joke){
    console.log('tell me:', joke);
    VoiceRSS.speech({
        key: '35668af64b2f4dcf8d8c9559a3937069',
        src: joke,
        hl: 'en-us',
        r: 0, 
        c: 'mp3',
        f: '44khz_16bit_stereo',
        ssml: false
    });
}
// Get Jokes from Joke API

async function getJokes(){
    let joke='';

        const apiUrl='https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Dark,Pun,Spooky,Christmas?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single';
        try{
            const response = await fetch(apiUrl);
            const data = await response.json();
            if(data.setup){
                joke=`${data.setup} ... ${data.delivery}`;
            }
            else{
                joke = data.joke;
            }
            
            // Text-to-Speech
            tellMe(joke);

            // Disable button
            toggleButton();

    }catch(error){
        // Catch Errors Here
        console.log('whoops', error);
    }
}

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended',toggleButton);
