fetch('https://raw.githubusercontent.com/ItssUri/M7P5/refs/heads/main/menu.xml')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText,'text/xml');

        // Now you can work with the parsed XML document
        // console.log(xmlDoc);
        let group = xmlDoc.getElementsByTagName('Group');
        let mainDiv = document.getElementById('menu');
        
        for (let dishes of group) {
            let groupDiv = document.createElement('div');
            groupDiv.className = 'group';
            let groupName = dishes.getAttribute('name');
            console.log(groupName);
            let groupNameHTML = document.createElement('h2');
            groupNameHTML.innerHTML = groupName;
            groupDiv.appendChild(groupNameHTML);
            const groupElements = dishes.getElementsByTagName('Dish');
            for (let dish of groupElements) {
                let nameJP = dish.getElementsByTagName('NameJP')[0].textContent;
                let name = dish.getElementsByTagName('Name')[0].textContent;
                let desc = dish.getElementsByTagName('Description')[0].textContent;
                let price = dish.getElementsByTagName('Price')[0].textContent;
                let image = dish.getElementsByTagName('Image')[0].textContent;
                console.log(name,desc,price,image);
                
                let dishDiv = document.createElement('div');
                dishDiv.className ="dish";
                dishDiv.innerHTML = `<img src='https://raw.githubusercontent.com/ItssUri/M7P5/main/media/${image}' class="item-image"><p class="item-nameJP">${nameJP}</p><p class="item-name"><b>${name}</b></p><p class="item-desc">${desc}</p><p class="item-price">$${price}</p>`;
                groupDiv.appendChild(dishDiv);
            }
            mainDiv.appendChild(groupDiv);            
        }
    })
    .catch(error => {
        console.error(`There was a problem with the fetch operation:`, error);
    });