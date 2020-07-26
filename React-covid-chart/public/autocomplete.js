$(() => {
  let countries = null
  $('#myInput').autocomplete({
    source: async (request, response) => {
      if (!countries) {
        countries = await $.get('api/countries')
        countries = countries.map((x) => x.name)
        response(sortCountries(request, countries))
      } else {
        response(sortCountries(request, countries))
      }
    },
  })
  const sortCountries = (request, array) => {
    var re = $.ui.autocomplete.escapeRegex(request.term)
    var matcher = new RegExp('^' + re, 'i')
    return $.grep(array, (item, index) => matcher.test(item))
  }
})
