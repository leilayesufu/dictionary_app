//get the query selector from html
const userinput = document.querySelector('#userinput');
const submitbutton= document.querySelector('.submit');
const word_searched= document.querySelector('.word_searched');
const phonetic = document.querySelector('.phonetic span')
const wordclass= document.querySelector(".wordclass");
const meaning = document.querySelector('.actualdefinition');


//fetch dictionary from dictionary api
function getdictionary(word){
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
    .then(blob=>blob.json())
    .then(dictionary=> this.displayDictionary(dictionary))
}


//text to speech
function audio(){
    fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word_searched.innerHTML)
    .then(blob=>blob.json())
    .then(dictionary=> playAudio(dictionary))
}

function playAudio(dictionary){
    const {audio}= dictionary[0].phonetics[1];
    var a= new Audio(audio);
    a.play();
    }


//get data from api
function displayDictionary(dictionary){
    const {word} = dictionary[0];
    const {partOfSpeech}= dictionary[0].meanings[0];
    const {definition} = dictionary[0].meanings[0].definitions[0];
    const phoneticText = dictionary[0].phonetic;
    const {example}= dictionary[0].meanings[0].definitions[0];
    word_searched.innerHTML= word;
    phonetic.innerHTML = phoneticText;
    wordclass.innerHTML = partOfSpeech;
    meaning.innerHTML = definition;
    if(example== undefined){
        document.querySelector('.example').innerHTML = "";
    }else{
        document.querySelector('.example').innerHTML = `<bold>Example:  </bold> ` + example ;
    }
    document.querySelector('.worddefinition').classList.remove('loading');
}

function search(dictionary){
    getdictionary(userinput.value)
    userinput.value=""
}

//hook event listeners
submitbutton.addEventListener("click", function(e){
    search()
    e.preventDefault()
})

document.querySelector(".wordaudio").addEventListener('click',audio)