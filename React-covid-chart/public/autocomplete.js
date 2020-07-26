$(() => {
  let countries = null
  $('#myInput').autocomplete({
    source: async (request, response) => {
      if (!countries) {
        countries = await $.get('api/countries')
        countries = countries.map((x) => x.name)
      }
      const re = $.ui.autocomplete.escapeRegex(request.term)
      const matcher = new RegExp('^' + re, 'i')
      response($.grep(countries, (item, index) => matcher.test(item)))
    },
  })
})
