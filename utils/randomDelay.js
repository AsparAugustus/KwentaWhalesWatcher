// Function to introduce random delays
function randomDelay() {
    const minDelay = 1000; // 2 seconds (you can adjust this as needed)
    const maxDelay = 3000; // 5 seconds (you can adjust this as needed)
    return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  }

module.exports = randomDelay;