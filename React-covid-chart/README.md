# Harjoitustyö, Web-ohjelmointi TTMS0500 (Kesä 2020)

## Koronatilastot Reactilla sekä Chart.js:llä.

07.08.2020

[Sovellus on testattavissa Herokussa.](https://covid-chart-demo.herokuapp.com/)

[Sovelluksen ZIP-paketti.](https://drive.google.com/file/d/1oDhvG7JDB3dpijuppk9xq7c1urjVGNU8/view?usp=sharing)

[Linkki esitykseen.](https://docs.google.com/forms/d/e/1FAIpQLScZH-eMuKLa_vOEdiwHzlsSpa1LX8so_byS99TOictimjwgFQ/viewform)

---

## Sovellus

Sovellus on toteutettu ei-luokkapohjaisella Reactilla (16.8+), Bootstrapilla, Expressillä, Axioksella, sekä Chart.js:llä. Frontendissä tehdään ajax kutsuja omaan express-backendin, jossa varsinaiset API-kutsut tapahtuvat ja palautuvat frontendiin. 

Työ sai inspiraation harjoituksessa käytetyn Chart.js:n kautta, ja jäin pohtimaan miten yhdistää Chart.js uuteen, ei-luokkapohjaiseen Reactiin. Halusin käyttää sovelluksen datana API:a, josta saa numeraalista dataa kaavioden käyttöön, ja koronatilastojen hyödyntäminen vaikutti ajankohtaiselta. Sovelluksen datana on käytetty [COVID-19 data API:a.](https://rapidapi.com/Gramzivi/api/covid-19-data?endpoint=apiendpoint_35f69513-ea31-48fd-a97d-4e2c8165d0b3) 

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

[![Autocomplete](https://i.imgur.com/7b7ofw7.png)](https://i.imgur.com/7b7ofw7.png)

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

`getCountryData` -funktio lähettää axios-kirjaston avulla ajax-kutsun backendiin osoitteeseen `api/data/[maa]` , ja backendin palauttamasta vastauksesta muodostetaan olio, joka sisältää kaaviota varten halutun datan. Uusi olio annetaan parametrinä eteenpäin kartan piirtävään funktioon. Funktiossa on käytetty uudempaa async/await, sekä try/catch ohjelmointityyliä promisejen sijaan. Mikäli backend vastaa kutsuun virheellä, siirrytään catch -lohkoon, ja esitetään käyttäjälle ilmoitus hyödyntäen Bootsrapin modal-komponenttia. 

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

Kartan päivityksestä vastaava funktio saa parametrina datan indeksin, sekä uuden datan. Halusin omassa sovelluksessani, että myös nimikylteissä näkyy kaavion arvot, joten muokkaan myös nimikylttejä vastaamaan uutta dataa. Objekti on kuitenkin muutettava taulukoksi ennen kuin data voidaan päivittää. Käytän ratkaisussani Object.keys().map -funktiota, joka hakee objektin arvot viitaten indeksiin, ja rakentaa niistä taulukon. Lopulta kaavio päivitetään funktiolla `countryChartInstance.update()` .

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

 Ajax-kutsun saapuessa frontendistä express serverin osoitteeseen `/api/data/` , lukee funktio frontendistä tulevan reittiparametrin `:country` arvon. Express välittää reittiparametrin arvon funktiolle `getLatestCountryDataByName` , joka edelleen käsittelee ajax-kutsun API:n tarjoajalle, ja jää odottamaan vastausta. Mikäli vastauksen pituus ei ole nolla, välitetään data takaisin frontendin käsiteltäväksi, muutoin palautetaan HTTP virheilmoitus 400, Bad Request, ja frontendissä siirrytään catch -lohkoon. 

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

Ajax -kutsun headeriin on annettu viittaus API-avaimeen, `process.env.API_KEY` , joka sijaitsee palvelimella. 

``` 
const headers = {
  'content-type': 'application/octet-stream',
  'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
  'x-rapidapi-key': process.env.API_KEY,
  useQueryString: true,
}
```

---

 ## Sovelluksen tyylit

Sovellus on toteutettu responsiivista tyylikirjastoa, [Bootstrapia, ](https://getbootstrap.com/) sekä [Bootstrap for React](https://react-bootstrap.github.io/getting-started/introduction/) -hyödyntäen, ja skaalautuu erikokoisille näytöille.

React Boostrapin asennus käy kätevimmin npm:n avulla `npm install react-bootstrap bootstrap` , jolloin sovelluksen käyttöön tulee Bootsrapin valmiita komponentteja. 

App -komponentti on rakennettu Reactin Boostrapilla. Bootstrapin komponentit tuodaan haluttuun komponenttiin import-lauseella, kuten muutkin komponetit. 

``` 
import Container from 'react-bootstrap/Container'
import Jumbotron from 'react-bootstrap/Jumbotron'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

  return (
    <Container>
      <Tabs defaultActiveKey="world" >
        <Tab eventKey="world" title="World">
          <Jumbotron>
                // Tähän omia komponentteja ensimmäiselle välilehdelle
          </Jumbotron>
        </Tab>
        <Tab eventKey="countries" title="Countries">
          <Jumbotron>
                // Tähän omia komponentteja toiselle välilehdelle
          </Jumbotron>
        </Tab>
      </Tabs>
    </Container>
  )
  ```

Ylläoleva koodi havainnollisettuna alempana. Omat komponentit ovat kääritty Container -komponenttiin, jonka sisällä on Tabs sekä Tab -komponentit. Näiden sisällä on käytetty Jumbotron -komponenttia, joka käärii sen sisälle tulevat komponentit harmaaseen Jumbotron -taustaan. 

[![Autocomplete](https://i.imgur.com/71COGGD.png)](https://i.imgur.com/71COGGD.png)

Bootstrapia voi käyttää myös perinteiseen HTML-tyyliin, lisäämäällä index.html `<head>` -tagiin Bootstrapin tyylit, sekä Bootstrapin vaatiman jQueryn. 

``` 
<!-- Bootstrap CSS -->
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css..." >

<!-- jQuery first, then Popper.js, then Bootstrap JS -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js..."></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js..."></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js..."></script>

```

Tällöin Bootstrapia kirjoitetaan suoraan `<div>` -elementtien tyyleihin, eikä Bootsrapin komponentteja tarvitse importtailla.  

Esimerkki Chart -komponentista, jossa Bootstrapia on käytetty on suoraan div elementeissä. Esimerkissä `row mb-2`, `col`, sekä `form-text text-muted text-center` ovat Bootsrapin valmiita tyylejä: 

```
const Chart = ({ chartContainer, countryName, mortality }) => {

  return (
    <div>
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
Huomionarvoista on se, ettei Reactin tyyleissä tule käyttää määritelmää `class`, vaan `className`. 

Lisää Bootstrapin tyylikirjastosta voi lukea [Bootstrapin omasta dokumentaatiosta.](https://getbootstrap.com/docs/4.5/getting-started/introduction/)




---

## Käytettävissä olevat skriptit

Huom! Projekti vaatii API-kutsuja varten toimivan API-avaimen, jonka [saa täältä.](https://rapidapi.com/Gramzivi/api/covid-19-data?endpoint=apiendpoint_35f69513-ea31-48fd-a97d-4e2c8165d0b3)

API-avain syötetään server.js -tiedostoon headers -objektiin.

```
const headers = {
  'content-type': 'application/octet-stream',
  'x-rapidapi-host': 'covid-19-data.p.rapidapi.com',
  'x-rapidapi-key': *TÄHÄN SINUN API-AVAIN*
  useQueryString: true,
}
```


### Projektin käynnistys:

### `npm install`

Asentaa vaaditut modulit.

### `npm run dev`

Käynnistää Nodemonin avulla express serverin API -kutsuja varten.

### `npm run serve`

Käynnistää sovelluksen frontendin osoitteessa [http://localhost:3000](http://localhost:3000)

### `npm run build`

Kasaa projektin julkaisua varten.

---
## Yhteenveto, ajankäyttö, itsearviointi

Kaavioiden yhdistäminen ei-luokkapohjaiseen Reactiin, sekä kaavioiden tilanhallinta oli aluksi haastavaa ja vaati opettelua. Työssä piti soveltaa osaamista ja ongelmanratkaisua, sillä käytin React-versiota, jota ei kurssilla opetettu. Olen kuitenkin tyytyväinen lopputulokseen sekä pienimuotoisen express serverin hyödyntämiseen API-kutsuja varten. 

Pyrin sivuston ulkoasussa painottamaan erityisesti siistiin ja neutraaliin ilmeeseen. Reactin modulaarisuuden vuoksi työtä on helppo jatkaa eteenpäin esimerkiksi lisäämäällä kolmas välilehti, jossa voi käyttää toisenlaisia kaavioita pylväskaavioiden sijaan, tai lisäämällä komponentteja sekä niiden toiminnallisuuksia. Myös backendin funktiot ja reitit voi edelleen pilkkoa omiksi moduuleiksi, ja lisätä joukkoon muutama testi.

Käytin työhön loppudokumentaatio mukaan lukien noin 30-tuntia. Annan itselleni ja työlle arvosanaksi 4, sillä sovelsin työssä myös kurssin ulkopuolisia tekniikoita. Viitosen arvosana varten laajentaisin sovellusta, ja mahdollistaisin käyttäjälle valintoja erilaisten kaavoiden valintaan, esimerkiksi kaavion tyyppien vaihteluun. Viitosen arvosanaa varten rakentaisin mahdollisesti myös täysin oman backendin hyödyntäen MongoDB:tä.
