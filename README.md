<h1>Ubeswap Destiny Hackathon - Limit Order Page UI Improvement</h1>
<h3>About Me</h3>
<p>Hello. This is the first hackathon I have entered. I love to develop and use cryptocurrency! This respository will be archived once the hackathon has ended.</p>
<p><h3>Description of Hackathon</h3>
  <p><em>Any text surronded in [] is NOT part of the description. I have inserted it for futher clarifications!</em></p>
<strong>Prize Title</strong><br>
Launch a new Limit Order page for Ubeswap<br><br>

<strong>Prize Bounty</strong><br>
100,000 UBE<br>

<strong>Challenge Description</strong><br>
Improve the current Limit Order page UI by including a visual chart that shows the price history between the two assets selected (similar to what other DEXes do example)<br>
The chart should be ultra-fast to load and look great on mobile devices
It’s probably best to read data from the Ubeswap subgraph, but it’s builder’s choice here<br>
What else would improve the limit order page functionality and usability?<br><br>
<strong>Submission Requirements</strong><br>
Links to implementation repositories (github, gitlab, etc). Include in that repository:<br>
<ul><li>Project description <strong>[README.md]</strong></li><li>Links to live website, if applicable (recommended) <strong>[Click <a href="https://henrygagnier.github.io/hackathon/">Here</a>]</strong></li><li>Documentation which describes creative ideas to improve functionality and usability of limit or page. <strong>[README.md]</strong></li></ul><br>
<strong>Judging Criteria</strong><br>
Completeness of project.<br>
Loading speed of the charts. <strong>[Read <a href='#speed'>Here</a>]</strong><br>
Good UI in mobile devices. <strong>[Read <a href='#mobile-comp'>Here</a>]</strong><br>
Additional features to improve limit order page functionality and usability.<br>
Quality of project (code, design).<br><br>
<strong>Winner Announcement Date</strong><br>
Dec 12, 2022/midnight UTC<br></p>
<h2>Changes + Features</h2>
<ul>
  <li>Buy/Sell Button Slider</li>
  <li><a href='#chart'>Price Chart</a></li>
  <li><a href='#mobile-comp'>Mobile Compatibility</a></li>
</ul>
<h2>Buy/Sell Button Slider</h2>
<p>This feature is very self-explanitory. I have added a slider between the buy at sell button to increase the moderity of the page.</p>
<h2 id='chart'>Chart</h2>
<p>This is a chart that compares the prices of the two assets. I have used the module <code>react-google-charts</code> to implement charts.</p>
<h3>How does the charts work?</h3>
<h4>Gathering Data</h4>
<p>The charts use the Ubeswap Subgraph to pull data and get historical data using tokenDayDatas.</p>
<code>{
      tokenDayDatas(where:{date: UNIX ,token: TOKEN}) {
        priceUSD
        date
      }
    }</code><br>
<p id='speed'>All the data is gathered with maximum efficiency by running hundreds of GraphQL 
 requests at the same time and then using the javascript <code>sort()</code> function after which executes immediantly.</p>
 <h4>Handling Nulls</h4>
 <p>I have experimented with many methods for this but eventually found out I could set a param in Google Charts. This fills up nulls.</p>
<code>const options = {
  interpolateNulls: true
};</code>
<h4>Chart Onload</h4>
<p>A loading screen can be implemented to the chart by being called here.</p>
<code>chartEvents={[
            {
              eventName: "ready",
              callback: () => {console.log('The chart has finished loading.')}
            }</code>
<h2 id='mobile-comp'>Mobile Compatibility</h2>
<p>The main section of the websites is built within a div which uses 100% width and a <code>max-width</code> varible set. This varible can be adjusted to preference of you.</p>
<code>.maincontent {
  max-width: 500px; //other amounts are okay too :)
}</code>
<h2>Donate</h2>
<p><strong>CELO</strong></p>
<p>0x46451175070A75CfF85209A333368149DA85551b</p>
<h3>Thank You.</h3>
<p>Thank you! I had lots of fun working on this hackathon, and look to collaborate on other hackathons and gitcoin.co hackathons in  the future.</p>
