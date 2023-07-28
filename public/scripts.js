async function fetchQuotes() {
    const response = await fetch('/quotes');
    const quotes = await response.json();
    const quotesList = document.getElementById('quotes');
    quotesList.innerHTML = '';
    quotes.forEach(quote => {
      const listItem = document.createElement('li');
      listItem.textContent = `"${quote.text}" - ${quote.author}`;
      quotesList.appendChild(listItem);
    });
  }
  
  async function addQuote(event) {
    event.preventDefault();
    const text = document.getElementById('text').value;
    const author = document.getElementById('author').value;
    await fetch('/quotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, author }),
    });
    document.getElementById('text').value = '';
    document.getElementById('author').value = '';
    fetchQuotes();
  }
  
  document.getElementById('quoteForm').addEventListener('submit', addQuote);
  fetchQuotes();
  