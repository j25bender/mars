const pageLoad = () => {
  getItems()
}

$(document).ready( pageLoad )

$('#add-item-button').click( async () => {
  const itemToAdd = $('#item-to-pack').val()
    await fetch('/api/v1/items', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: itemToAdd,
        packed: false
      })
    })
  
  getItems()
  $('#item-to-pack').val('')
})

const getItems = async () => {
  const initialfetch = await fetch('/api/v1/items')
  const items = await initialfetch.json()
  $('.item-card').remove()  
  items.forEach(item => appendItemCard(item))
}

const appendItemCard = (item) => {
  const checked = item.packed === 'true' ? 'checked' : ''
  
  $('#item-container').append(`<div class="item-card">
  <h2>${item.name}</h2>
  <button class=${item.id} onclick=deleteItem() >Delete</button>
  <input class=${item.id} id=${item.packed} type="checkbox" onchange=updateCheck(${item.packed}) ${checked} >
 </div>`)
}

const updateCheck = (packed) => {
  $(this).change(async (e) => {
    const itemId = e.target.className
    await fetch('/api/v1/items', {
      method: 'PATCH',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: itemId,
        packed: packed
      })
    })
  })
}

const deleteItem = () => {
  $(this).click(async (e) => {
    const deleteThis = '.' + e.target.className
    $(deleteThis).parent().remove()
    await fetch(`/api/v1/items/${e.target.className}`, {
      method: 'DELETE',
      headers: {'Content-Type': 'application/json'}
    })
  })
}
