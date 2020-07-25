$(() => {
  $('#myInput').autocomplete({
    source: (request, response) => {
      $.ajax({
        url: 'api/countries',
        success: (data) => {
          const countries = data.map((x) => x.name)
          countries ? countries : null
          var re = $.ui.autocomplete.escapeRegex(request.term)
          var matcher = new RegExp('^' + re, 'i')
          var a = $.grep(countries, (item, index) => {
            return matcher.test(item)
          })
          response(a)
        },
      })
    },
  })
})
