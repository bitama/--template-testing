let quoteContainer = document.getElementById('quote-container');
let quoteText = document.getElementById('quote');
let quoteAuthor = document.getElementById('author');
let twitterButton = document.getElementById('twitter-button');
let newQuoteBtn = document.getElementById('new-quote');
let loader = document.getElementById('loader')

function showLoading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
function complete(){
    loader.hidden=true;
    quoteContainer.hidden=false;
}

let apiQuotes = [];
//Show newQuote

function showNewQuote(){
    showLoading()
    
    //pick a random API from apiQuotes
    const quote = apiQuotes[Math.floor(Math.random()* apiQuotes.length)]
    if(!quote.author){
        quoteText.textContent="Unknown"
    }else{
        quoteAuthor.textContent=quote.author
    }
    quoteText.textContent=quote.text

    if(quote.text.length > 150){
        quoteText.classList.add('long-quote')
    }
    quoteText.classList.remove('long-quote')
    complete()
}
//Get quotes from API
async function getQuotes() {
    showLoading()
    const apiUrl = 'https://type.fit/api/quotes'
    try{
        const response = await fetch(apiUrl)
        apiQuotes = await response.json()
        showNewQuote()
    }catch(err){
        //catch error
    }
}
// OnLOad

function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}` ;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', showNewQuote);
twitterButton.addEventListener('click', tweetQuote);
getQuotes()
