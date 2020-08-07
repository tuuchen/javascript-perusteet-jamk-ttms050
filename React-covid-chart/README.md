# Harjoitustyö, Web-ohjelmointi TTMS0500 (Kesä 2020)

## Koronatilastot Reactilla, Bootstrapilla, Expressillä sekä Chart.js:llä.

07.08.2020

[Sovellus on testattavissa Herokussa.](https://covid-chart-demo.herokuapp.com/)

[Sovelluksen ZIP-paketti.](https://drive.google.com/file/d/1oDhvG7JDB3dpijuppk9xq7c1urjVGNU8/view?usp=sharing)

[Linkki esitykseen.](https://docs.google.com/forms/d/e/1FAIpQLScZH-eMuKLa_vOEdiwHzlsSpa1LX8so_byS99TOictimjwgFQ/viewform)

---

## Sovellus

Sovellus on toteutettu uudella Reactilla (16.8+), Bootstrapilla, Expressillä sekä Chart.js:llä. Frontendissä tehdään ajax kutsuja omaan express-backendin, jossa varsinaiset API-kutsut tapahtuvat, ja sovelluksen API-avain on piilotettu .env tiedostoon, sekä Herokun config variableksi.

---

## Etusivu

[![Etusivu](https://i.imgur.com/sXTDsvi.png)](https://i.imgur.com/sXTDsvi.png)

Etusivulla sovellus näyttää komponenttina Chart.js:n kaaviota hyödyntäen maailmanlaajuisen koronatilaston. Sivu näyttää kuolleisuuden (kuolleiden osuus tarttuneista), ja pylväskaavion avulla __tarttuneet__, __parantuneet__, __kriittisessä tilassa__ olevat sekä __kuolleet__.

Sivuston yläosassa olevien välilehtien kautta käyttäjällä on mahdollisuus vaihtaa maakohtaiseen hakuun.

---

## Maakohtaiset tilastot

[![Maakohtainen haku](https://i.imgur.com/ZFeCGni.png)](https://i.imgur.com/ZFeCGni.png)

Maat -välilehden kautta käyttäjä voi hakea maakohtaista dataa. Maakohtainen data renderöidään Chart.js:ää varten tehtyyn komponenttiin, jota käytetään uudelleen.

## Hakuehtojen automaattinen täydennys

[![Maakohtainen haku](https://i.imgur.com/7b7ofw7.png)](https://i.imgur.com/7b7ofw7.png)

---

## Sovelluksen rakenne

[![Etusivu](https://i.imgur.com/94RTqzo.png)](https://i.imgur.com/94RTqzo.png)

## Komponentit

App-komponentti sisältää sovelluksen tilan, kokoaa komponentit yhteen, ja sisältää kaikki tärkeimmät toiminnallisuudet myös propseina muille komponenteille välitettäväksi. Express huolehtii sovelluksen tarjoamisesta käyttäjälle, sekä API-kutsujen välittämisestä takaisin frontendiin. 

* Chart komponentti saa propsina kaavion, maan nimen, sekä kuolleisuuden, ja huolehtii näiden esittämisestä. 

``` 
const Chart = ({ chartContainer, countryName, mortality }) => {

  return (
    <div style={styleObject}>
      <div className="row mb-2">
        <div className="col">
          <h5 className="form-text text-muted text-center">{countryName}</h5>
        </div>
        <div className="col">
          <h6 className="form-text text-muted text-center">
            Mortality {mortality}
          </h6>
        </div>
      </div>
      <canvas ref={chartContainer} />
    </div>
  )
}
 ```

* ChartBanner komponentti saa propsina tekstiä, ja huolehtii esitetyn datan otsikoinnista. 

``` 
const ChartBanner = ({ text }) => {
  return <h1 className="text-center mb-4">{text}</h1>
}
 ```

* ChartForm komponentti esittää lomakkeen johon hakuehto syötetään, ja saa propsina funktion joka huolehtii haun toteutumisesta. 

``` 
const ChartForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <small className="form-text text-muted mb-1">
        Form will find all available countries for you
      </small>
      <div className="input-group">
        <input
          id="country-form"
          type="text"
          className="form-control"
          placeholder="Start typing.."
        />
        <div className="input-group-append mb-4">
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  )
}
 ```

 * ChartModal komponentti esittää käyttäjälle ilmoituksen, ja saa propsina otsikon, tekstikentän sisältöä, näkyvyysehdon (show), sekä funktion joka vastaa ilmoituksen sulkemisesta. 

``` 
const ChartModal = ({ title, body, show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
 ```

 * jQueryllä toteutettu autocomplete.js -plugin tarjoaa hakukenttään listan API-palvelussa olevista maista, ja maalistauksen Ajax-kutsu suoritetaan oman express backendin kautta.

``` 
const request = await $.get('api/countries')
const countries = request.map((x) => x.name)

  $('#country-form').autocomplete({
    source: (request, response) => {
      const re = $.ui.autocomplete.escapeRegex(request.term)
      const matcher = new RegExp('^' + re, 'i')
      response($.grep(countries, (item, index) => matcher.test(item)))
    },
  })
 ```

--- 

 ## Kartan alustaminen Reactilla

 __chartConfig.js__ sisältää objektina kaavioilta vaaditut määritykset, esimerkiksi kaavion tyypin, lähtöarvot sekä nimikyltit. Objektit exportataan muiden komponenttien käyttöön.

``` 
const countryChart = {
  type: 'bar',
  data: {
    labels: ['Confirmed', 'Recovered', 'Critical', 'Deaths'],
    datasets: [
      {
        label: '# of Infections',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
}

export { countryChart }
 ```

__App.js__ komponenttiin tuodaan karttamääritykset sisältävät objektit, ChartJs -olio, sekä Chart-komponentti.

``` 
import { countryChart } from './utils/chartConfig'
import Chartjs from 'chart.js'
import Chart from './components/Chart'
```

Tilaan tallennetaan karttakontainerin sisältö sekä instanssi, jotka ovat sovelluksen käynnistysvaiheessa tyhjänä.

``` 
const countryChartContainer = useRef(null)
const [countryChartInstance, setcountryChartInstance] = useState(null)
```

Kun sovellus käynnistetään, Reactin useEffectissä renderöidään karttainstanssi, joka kohdistetaan countryChartContainer -referenssillä Chart komponentissa olevaan canvakseen, ja joka saa parametrina karttamäärityksen sisältävän objektin.

``` 
  useEffect(() => {
    if (countryChartContainer && countryChartContainer.current) {
      const newChartInstance = new Chartjs(
        countryChartContainer.current,
        countryChart
      )
      setcountryChartInstance(newChartInstance)
    }
  }, [countryChartContainer])
```

Karttakomponentti saa siis propsina karttakontainerin, jonka avulla kartta renderöidään komponentin canvakseen.

``` 
  return (
    <div>
    <Chart chartContainer={countryChartContainer} />
    <div/>
  )
  ```

Chart komponentti sisältää canvaksen, sekä viitteen ref.

``` 
const Chart = ({ chartContainer }) => {

  return (
      <div>
      <canvas ref={chartContainer} />
    </div>
  )
}
```

---

 ## Karttatietojen päivitys, frontend

ChartForm -komponentti saa propsina handleSubmit funktion, jota kutsutaan kun lomake lähetetään. Lomake palauttaa input-kenttään kirjoitetun syötteen, tässä tapauksessa halutun maan nimen.

``` 
const ChartForm = ({ handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
        <input id="country-form" type="text" />
        <button type="submit">Search</button>
    </form>
  )
}
```

`handleSubmit` -funktio välittää lomakkeen arvon `getCountryData` -funktiolle.

``` 
  const handleSubmit = (e) => {
    e.preventDefault()
    getCountryData(e.target[0].value)
  }
```

 `getCountryData` -funktio lähettää axios-kirjaston avulla ajax-kutsun backendiin osoitteeseen `api/data/[maa]`, ja backendin palauttamasta vastauksesta muodostetaan olio, joka sisältää kaaviota varten halutun datan. Uusi olio annetaan parametrinä eteenpäin kartan piirtävään funktioon. Funktiossa on käytetty uudempaa async/await, sekä try/catch ohjelmointityyliä promisejen sijaan. Mikäli backend vastaa kutsuun virheellä, siirrytään catch -lohkoon, ja esitetään käyttäjälle ilmoitus hyödyntäen Bootsrapin modal-komponenttia. 

``` 
  const getCountryData = async (country) => {
    try {
      const result = await axios.get( `api/data/${country}` )

      const newChartData = {
        confirmed: result.data[0].confirmed,
        recovered: result.data[0].recovered,
        critical: result.data[0].critical,
        deaths: result.data[0].deaths,
      }
      // Lähetetään data funktiolle, joka päivittää kartan
      updateCountryChart(0, newChartData)
    } catch (err) {
      showChartModal( `No data found for "${country}"` )
    }
  }
  ```

Kartan päivityksestä vastaava funktio saa parametrina datan indeksin, sekä uuden datan. Halusin omassa sovelluksessani, että myös nimikylteissä näkyy kaavion arvot, joten muokkaan myös nimikylttejä vastaamaan uutta dataa. Objekti on kuitenkin muutettava taulukoksi ennen kuin data voidaan päivittää. Käytän ratkaisussani Object.keys().map -funktiota, joka hakee objektin arvot viitaten indeksiin, ja rakentaa niistä taulukon. Lopulta kaavio päivitetään funktiolla `countryChartInstance.update()`.

``` 
  const updateCountryChart = (datasetIndex, newData) => {
    const labels = [
      'Confirmed ' + newData.confirmed,
      'Recovered ' + newData.recovered,
      'Critical ' + newData.critical,
      'Deaths ' + newData.deaths,
    ]

    const arrayOfData = Object.keys(newData).map((i) => newData[i])
    countryChartInstance.data.datasets[datasetIndex].data = arrayOfData
    countryChartInstance.data.labels = labels
    countryChartInstance.update()
  }
  ```

---

 ## Karttatietojen päivitys, backend

 Ajax-kutsun saapuessa frontendistä express serverin osoitteeseen `/api/data/`, lukee funktio frontendistä tulevan reittiparametrin `:country` arvon. Express välittää reittiparametrin arvon funktiolle `getLatestCountryDataByName`, joka edelleen käsittelee ajax-kutsun API:n tarjoajalle, ja jää odottamaan vastausta. Mikäli vastauksen pituus ei ole nolla, välitetään data takaisin frontendin käsiteltäväksi, muutoin palautetaan HTTP virheilmoitus 400, Bad Request, ja frontendissä siirrytään catch -lohkoon. 

``` 
 app.get('/api/data/:country', async (req, res) => {
  const country = req.params.country
  const data = await getLatestCountryDataByName(country)
  data.length === 0 ? res.status(400).send() : res.send(data)
})
```

Funktio `getLatestCountryDataByName` lähettää axioksen avulla GET-kutsun API-palvelun tarjoajalle, käyttäen parametrina frontendistä tulevaa reittiparametriä, ja palauttaa vastauksen. 

``` 
const getLatestCountryDataByName = async (countryName) => {
  const response = await axios({
    method: 'GET',
    url: 'https://covid-19-data.p.rapidapi.com/country',
    headers: headers,
    params: {
      format: 'json',
      name: countryName,
    },
  })
  return response.data
}
```

Ajax -kutsun headeriin on annettu viittaus API-avaimeen, `process.env.API_KEY`, joka sijaitsee palvelimella. 

``` 
const headers = {
  'content-type': 'application/octet-stream',
  'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
  'x-rapidapi-key': process.env.API_KEY,
  useQueryString: true,
}
```






This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject` , you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject` . The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
