const containerCards = document.querySelector('#main')
const searchContainer = document.querySelector('.input-container')
const searchAddItem = document.querySelector('.search-item-container')

let itemSearched = []


window.addEventListener('DOMContentLoaded', () => {
     showCards()
})

function showCards(){
     fetch('../data.json')
          .then((data) => data.json())
          .then((item) => {
               let displayCards = item.map((info) => {
                    let languages = info.languages.map((language) => {
                         return `
                              <section class=" language select">${language}</section>
                         `
                    }).join('')

                    let tools = info.tools.map((tool) => {
                         return `
                              <section class="tool select">${tool}</section>
                         `
                    }).join('')
                    
                    return `
                         <section class="card ${info.featured ? 'borda' : ''}">
                              <img src="${info.logo}" alt="" class="photo">
                              <section class="info">
                                   <section class="description">
                                        <section class="company">
                                             <p class="name">${info.company}</p>
                                             ${info.new ? '<p class="new">New!</p>' : ''}
                                             ${info.featured ? '<p class="featured">Featured</p>' : ''}
                                        </section>
                                        <section class="position">${info.position}</section>
                                             <section class="specification">
                                                  <ul>
                                                       <li class="posted-at">${info.postedAt}</li>
                                                       <li>•</li>
                                                       <li class="contract">${info.contract}</li>
                                                       <li>•</li>
                                                       <li class="location">${info.location}</li>
                                                  </ul>
                                             </section>
                                   </section>
                         
                                   <section class="tools">
                                        <section class="role select">${info.role}</section>
                                        <section class="level select">${info.level}</section>
                                        ${languages}
                                        ${tools}
                                   </section>
                              </section>
                         </section>
                    `
               }).join('')

               containerCards.innerHTML = displayCards
               select()
          })
          .catch((error) => console.log('Error: ' + error))
}

function select(){
     let itemToSearch = document.querySelectorAll('.select')
     itemToSearch.forEach((item) => {
            item.addEventListener('click', (e) => {
                  if(itemSearched.indexOf(e.currentTarget.textContent) === -1){
                        itemSearched.push(e.currentTarget.textContent)
                        let itemDisplay = itemSearched.map((itemBox) => {
                              return `
                              <section class="search-item">
                                    <p class="item-name">${itemBox}</p>
                                    <section class="remove-item">
                                          <img src="images/icon-remove.svg" alt="">
                                    </section>
                              </section>
                              `
                        }).join('')
            
                        testeInput()
            
                        searchAddItem.innerHTML = itemDisplay
                        console.log(itemSearched)
                        removeBtns()
                  }
            }) 
      })
      clear()
}


function clear(){
      const clearBtn = document.querySelector('#clear')
      clearBtn.addEventListener('click', () => {
            itemSearched = []
            testeInput()
      })
}


function removeBtns(){
     let removeBtn = document.querySelectorAll('.remove-item')
     removeBtn.forEach((btn) => {
          btn.addEventListener('click', (e) => {
            let parentElement = e.currentTarget.parentNode
            let childElement = parentElement.children[0].textContent
            let index = itemSearched.indexOf(childElement)

            itemSearched.splice(index, 1)
            parentElement.style.display = 'none'
            testeInput()
          })
     })
}

function testeInput(){                     
     if(itemSearched.length >= 1){
          searchContainer.style.display = 'flex'
     }
     else{
          searchContainer.style.display = 'none'
     }
}