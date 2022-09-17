let filterList = document.getElementsByClassName('filter'); //Filter classes 
for (let ind = 0; ind < filterList.length; ind++) {
    const windowElement = filterList[ind];
    //Defince variables
        let controller = document.getElementById(`${windowElement.id}-controller`);
        let filterMap = new Map(); //Category Map
        let filter = new Map(); //Active Filters
        let filterCategories = [] //Categories for filter query
        //Create maps and arrays to work with
        for (let i = 0; i <  document.getElementsByClassName(`${windowElement.id}-elem`).length; i++) {
            let classes = document.getElementsByClassName(`${windowElement.id}-elem`)[i].className;
            classes.split('%').forEach(element => {
                if (element.includes(windowElement.id+'-elem')) return;
                let category = element.split('=')[0];
                let content = element.split('=')[1];
                filter.set(category)
                if (!filterMap.get(category)) {filterMap.set(category, [category]);filterCategories.push(category);}
                let array = filterMap.get(category);  
                array.push(content);
                filterMap.delete(category);
                filterMap.set(category, array)
            });
        }
        filterMap.forEach(element => {
            //Create category elements for filter controller
            let titleChild = document.createElement('h4');
            titleChild.innerText = element[0][0].toUpperCase() + element[0].slice(1, element[0].length); //first letter uppercase
            controller.appendChild(titleChild);
            var buttons = new Map() //Prevent doubles;
            element.forEach(elem => {
                if (element[0] != elem) {
                    if (buttons.get(elem)) return; 
                    buttons.set(elem, element[0]) //Check for duplicate elements
                    let child = document.createElement('button') //Filter button
                    for (let i = 0; i < 5; i++) {elem = elem.replace('$20', ' ')}
                    if (elem.split('-')[1]) child.innerText = elem.split('-')[0][0].toUpperCase() + elem.split('-')[0].slice(1, elem.split('-')[0].length) +'-'+ elem.split('-')[1][0].toUpperCase() + elem.split('-')[1].slice(1, elem.split('-')[1].length)
                    else child.innerText = elem[0].toUpperCase() + elem.slice(1, elem.length);
                    child.id = `${windowElement.id}-controller-${elem}`
                    controller.appendChild(child)
                    child.addEventListener('click', e => { //Filter button click
                        console.time('Elements filtered in')
                        //Reset filter
                        document.getElementById(`${windowElement.id}-nothing-found`).style.display = 'none'
                        for (let i = 0; i < document.getElementsByClassName(`${windowElement.id}-cat-head`).length; i++) {
                            const element = document.getElementsByClassName(`${windowElement.id}-cat-head`)[i];
                            element.style.display = 'block';
                        }
                        if (filter.get(element[0]) == elem) { //Active element clicked twice
                            filter.set(element[0], null) //Set new Filter
                            child.classList.remove('filter-active')
                        } else { //Reset all other elements
                            if (document.getElementById(`${windowElement.id}-controller-${filter.get(element[0])}`)) document.getElementById(`${windowElement.id}-controller-${filter.get(element[0])}`).classList.remove('filter-active')
                            filter.set(element[0], elem) //Set new Filter
                            child.classList.add('filter-active')
                        }
                        let classFilter = ''
                        filterCategories.forEach(filterName => { //Create Filter query
                            if (filter.get(filterName))classFilter = classFilter + `%${filterName}=${filter.get(filterName)}`
                        }) 
                        let active = document.getElementsByClassName(`${windowElement.id}-elem`).length; //get all active elements
                        let inactive = 0;
                        for (let i = 0; i <  document.getElementsByClassName(`${windowElement.id}-elem`).length; i++) { //Show all elements the filter applies to
                            document.getElementsByClassName(`${windowElement.id}-elem`)[i].style.display = 'none';
                            let classes = document.getElementsByClassName(`${windowElement.id}-elem`)[i].className;
                            if (classes.includes(classFilter)) document.getElementsByClassName(`${windowElement.id}-elem`)[i].style.display = 'block';
                            else inactive++;
                        }
                        if (active === inactive) { //if no active elements -> Show not found text
                            document.getElementById(`${windowElement.id}-nothing-found`).style.display = 'block'
                            for (let i = 0; i < document.getElementsByClassName(`${windowElement.id}-cat-head`).length; i++) {
                                const element = document.getElementsByClassName(`${windowElement.id}-cat-head`)[i];
                                element.style.display = 'none';
                            }
                        }
                        console.timeEnd('Elements filtered in')
                    });
                }
            })
        })
}

