function fetchData() {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  
    return fetch(url)
      .then(response => response.json())
      .then(data => data)
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  // Function to render the coin data as a table
  function renderTable(coins) {
    const coinTable = document.getElementById('coinTable');
    coinTable.innerHTML = '';
  
    if (coins.length === 0) {
      coinTable.innerHTML = 'No results found.';
      return;
    }
  
    const table = document.createElement('table');
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
  
    const headers = ['Name', 'ID', 'Image', 'Symbol', 'Current Price', 'Total Volume'];
  
    // Create table headers
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
  
    // Create table rows
    coins.forEach(coin => {
      const { name, id, image, symbol, current_price, total_volume } = coin;
  
      const row = document.createElement('tr');
      const rowData = [name, id, image, symbol, current_price, total_volume];
  
      rowData.forEach(text => {
        const td = document.createElement('td');
        td.textContent = text;
        row.appendChild(td);
      });
  
      tbody.appendChild(row);
    });
  
    table.appendChild(thead);
    table.appendChild(tbody);
    coinTable.appendChild(table);
  }
  
  // Function to handle the search button click event
  function search() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
  
    fetchData().then(coins => {
      const filteredCoins = coins.filter(
        coin =>
          coin.name.toLowerCase().includes(searchTerm) ||
          coin.symbol.toLowerCase().includes(searchTerm)
      );
      renderTable(filteredCoins);
    });
  }
  
  // Function to handle the sort button click event
  function sort() {
    fetchData().then(coins => {
      coins.sort((a, b) => b.market_cap_change_percentage_24h - a.market_cap_change_percentage_24h);
      renderTable(coins);
    });
  }
  
  // Function to handle the search button click event using async/await
  async function searchAsync() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase().trim();
  
    try {
      const coins = await fetchData();
      const filteredCoins = coins.filter(
        coin =>
          coin.name.toLowerCase().includes(searchTerm) ||
          coin.symbol.toLowerCase().includes(searchTerm)
      );
      renderTable(filteredCoins);
    } catch (error) {
      console.error('Error:', error);
    }
  }