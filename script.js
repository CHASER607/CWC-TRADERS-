const symbols = [
  { ticker: "AAPL", price: 214.52, change: 1.2 },
  { ticker: "TSLA", price: 181.3, change: -2.4 },
  { ticker: "NVDA", price: 891.08, change: 3.1 },
  { ticker: "MSFT", price: 421.74, change: 0.9 },
  { ticker: "BTCUSD", price: 67124.4, change: -0.6 },
];

const portfolio = {
  balance: 100000,
  unrealized: 0,
  positions: {},
  orders: [],
};

const watchlist = document.getElementById("watchlist");
const symbolSelect = document.getElementById("symbol");
const tradeForm = document.getElementById("tradeForm");
const tradeResult = document.getElementById("tradeResult");
const ordersBody = document.getElementById("ordersBody");

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

function renderWatchlist() {
  watchlist.innerHTML = "";
  symbols.forEach((item) => {
    const li = document.createElement("li");
    li.className = "watch-item";
    const cls = item.change >= 0 ? "positive" : "negative";
    li.innerHTML = `
      <strong>${item.ticker}</strong>
      <span>${formatCurrency(item.price)}</span>
      <span class="${cls}">${item.change.toFixed(2)}%</span>
    `;
    watchlist.appendChild(li);
  });
}

function renderSymbolOptions() {
  symbols.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.ticker;
    option.textContent = `${item.ticker} (${formatCurrency(item.price)})`;
    symbolSelect.appendChild(option);
  });
}

function updateSummary() {
  const positions = Object.values(portfolio.positions).filter((qty) => qty !== 0).length;
  document.getElementById("balance").textContent = formatCurrency(portfolio.balance);
  document.getElementById("unrealized").textContent = formatCurrency(portfolio.unrealized);
  document.getElementById("positions").textContent = positions;
}

function renderOrders() {
  if (portfolio.orders.length === 0) {
    ordersBody.innerHTML = `<tr><td colspan="6" class="muted">No orders yet.</td></tr>`;
    return;
  }

  ordersBody.innerHTML = portfolio.orders
    .slice()
    .reverse()
    .map(
      (order) => `
      <tr>
        <td>${order.time}</td>
        <td>${order.symbol}</td>
        <td class="${order.side === "BUY" ? "positive" : "negative"}">${order.side}</td>
        <td>${order.quantity}</td>
        <td>${formatCurrency(order.price)}</td>
        <td>Filled</td>
      </tr>`
    )
    .join("");
}

tradeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const symbol = symbolSelect.value;
  const side = document.getElementById("side").value;
  const quantity = Number(document.getElementById("quantity").value);
  const market = symbols.find((item) => item.ticker === symbol);

  if (!market || quantity <= 0) {
    tradeResult.textContent = "Invalid order parameters.";
    return;
  }

  const gross = market.price * quantity;
  const multiplier = side === "BUY" ? -1 : 1;
  portfolio.balance += gross * multiplier;

  const existing = portfolio.positions[symbol] || 0;
  portfolio.positions[symbol] = existing + (side === "BUY" ? quantity : -quantity);

  const order = {
    time: new Date().toLocaleTimeString(),
    symbol,
    side,
    quantity,
    price: market.price,
  };

  portfolio.orders.push(order);
  tradeResult.textContent = `${side} order filled for ${quantity} ${symbol} @ ${formatCurrency(market.price)}.`;

  updateSummary();
  renderOrders();
});

renderWatchlist();
renderSymbolOptions();
updateSummary();
renderOrders();
