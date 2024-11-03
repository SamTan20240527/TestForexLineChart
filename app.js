document.addEventListener('DOMContentLoaded', async () => {
  const baseCurrency = 'SGD';
  const targetCurrency = 'USD';

  async function fetchForexData() {
    try {
      // Fetch historical Forex data from Frankfurter API
      const response = await axios.get(`https://api.frankfurter.app/2023-10-01..?from=${baseCurrency}&to=${targetCurrency}`);
      return response.data.rates;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  function formatData(data) {
    // Format data for ApexCharts
    return Object.keys(data).map(date => ({
      x: new Date(date),
      y: data[date][targetCurrency],
    }));
  }

  async function renderChart() {
    const data = await fetchForexData();
    const formattedData = formatData(data);

    const options = {
      series: [{
        name: `${baseCurrency}/${targetCurrency} Rate`,
        data: formattedData,
      }],
      chart: {
        type: 'line',
        height: 350,
      },
      xaxis: {
        type: 'datetime',
      },
      title: {
        text: `${baseCurrency} to ${targetCurrency} Exchange Rate`,
        align: 'center',
      },
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();
  }

  renderChart();
});
