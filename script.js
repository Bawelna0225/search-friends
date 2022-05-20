const userCardTemplate = document.querySelector('#user-card-template'),
      userCardContainer = document.querySelector('.users-cards'),
      searchBar = document.querySelector('#search')

let users = []

searchBar.addEventListener('input', e => {
    const inputValue = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(inputValue) || user.email.toLowerCase().includes(inputValue)
        user.element.classList.toggle('hide', !isVisible)
    })
})


fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {
    users = data.map(user => {
          const card = userCardTemplate.content.cloneNode(true).children[0]
          const header = card.querySelector('.header')
          const body = card.querySelector('.body')

          header.innerHTML = user.name
          body.innerHTML = user.email

          userCardContainer.append(card)
          return {name: user.name, email: user.email, element: card}
      })
  })