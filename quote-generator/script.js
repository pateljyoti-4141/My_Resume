let apiQuotes=[];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader=document.getElementById('loader');


//show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;

}

//hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden=true;
}


//Show new quote
function newQuote(){
    loading();
    //Pick a random quote from apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random()*apiQuotes.length)];
    //check if author field is blank and replace it with 'unknown'
   if(!quote.author || quote.author == "type.fit"){
        authorText.textContent = "Unknown";
    }else{
        
        authorText.textContent = quote.author.replace(', type.fit','');
    }

    //check quote length to determine styling
    if(quote.text.length>30){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    
    //set quote,hide loader
    quoteText.textContent = quote.text;
    complete();
   
}

//get quotes from API
async function getQuotes(){
    loading();
    const apiUrl='https://type.fit/api/quotes';
    try{
        const response = await fetch(apiUrl);
        apiQuotes= await response.json();
        newQuote();
    }catch(error){
        
        
        //Catch Error Here
    }
}
// Tweet Quote
function tweetQuote(){
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}
//Event Listeners
newQuoteBtn?.addEventListener('click',newQuote);
twitterBtn?.addEventListener('click',tweetQuote);

//On load
getQuotes();
