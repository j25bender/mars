$('#add-item-button').click(async () => {
  const itemToAdd = $('#item-to-pack').val()
  await fetch('/api/v1/items', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      itemToAdd
    })
  }
)
  $('#item-container').append(`<div class="item-card">
                                <h1>${itemToAdd}</h1>
                                <button class=${itemToAdd} onclick=deleteMe() >Delete</button>
                                <input class="checkBox" type="checkbox">
                               </div>`)
})

const deleteMe = () => {
  $(this).click((e) => {
    const deleteThis = '.' + e.target.className
    $(deleteThis).parent().remove()
  })
}
