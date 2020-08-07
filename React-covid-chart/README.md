# Harjoitustyö, Web-ohjelmointi TTMS0500 (Kesä 2020)

## Koronatilastot Reactilla, Bootstrapilla, Expressillä sekä Chart.js:llä.

07.08.2020

[Sovellus on testattavissa Herokussa.](https://covid-chart-demo.herokuapp.com/)

[Sovelluksen ZIP-paketti.](https://drive.google.com/file/d/1oDhvG7JDB3dpijuppk9xq7c1urjVGNU8/view?usp=sharing)

[Linkki esitykseen.](https://docs.google.com/forms/d/e/1FAIpQLScZH-eMuKLa_vOEdiwHzlsSpa1LX8so_byS99TOictimjwgFQ/viewform)

---

## Sovellus

Sovellus on toteutettu uudella Reactilla (16.8+), Bootstrapilla, Expressillä sekä Chart.js:llä. Frontendissä tehdään ajax kutsuja omaan express-backendin, jossa varsinaiset API-kutsut tapahtuvat, ja sovelluksen API-avain on piilotettu .env tiedostoon, sekä Herokun config variableksi.

### Rakenne

[![Etusivu](https://i.imgur.com/94RTqzo.png)](https://i.imgur.com/94RTqzo.png)

App-komponentti sisältää sovelluksen tilan, kokoaa komponentit yhteen, ja sisältää kaikki tärkeimmät toiminnallisuudet myös propseina muille komponenteille välitettäväksi. Express huolehtii sovelluksen tarjoamisesta käyttäjälle, sekä API-kutsujen välittämisestä takaisin frontendiin. 

* ### Chart komponentti saa propsina kaavion, maan nimen, sekä kuolleisuuden, ja huolehtii näiden esittämisestä. 

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

* ### ChartBanner komponentti saa propsina tekstiä, ja huolehtii esitetyn datan otsikoinnista. 

``` 
const ChartBanner = ({ text }) => {
  return <h1 className="text-center mb-4">{text}</h1>
}
 ```

* ### ChartForm komponentti esittää lomakkeen johon hakuehto syötetään, ja saa propsina funktion joka huolehtii haun toteutumisesta. 

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

Hakukentässä on 

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
