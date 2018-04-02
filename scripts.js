$('#add-item-button').click(() => {
  const itemToAdd = $('#item-to-pack').val()
  $('#item-container').append(`<div class="item-card">
                                <h1>${itemToAdd}</h1>
                                <button class=${itemToAdd} onclick=hello() >Delete</button>
                                <input class="checkBox" type="checkbox">
                               </div>`)
})

const hello = () => {
  $(this).click((e) => {
    const deleteThis = '.' + e.target.className
    $(deleteThis).parent().remove()
  })
}
