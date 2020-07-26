$(() => {
  const data = { countries: null }
  $('#country-form').autocomplete({
    source: async (request, response) => {
      if (!data.countries) {
        data.countries = await $.get('api/countries')
        data.countries = data.countries.map((x) => x.name)
      }
      const re = $.ui.autocomplete.escapeRegex(request.term)
      const matcher = new RegExp('^' + re, 'i')
      response($.grep(data.countries, (item, index) => matcher.test(item)))
    },
  })
})
