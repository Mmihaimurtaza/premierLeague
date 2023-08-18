import View from './view.js';

class TableWeeksView extends View {
    _parentElement = document.querySelector('.dropdown-content');
    
    
    _generateMarkup() {
            const matchweeks = this._data[0]; //nr of matchweeks
            const matchweek = this._data[1]; //current matchweek

            return  this._generateMarkupWeeksTable(matchweeks, matchweek);
          
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }

      _generateMarkupWeeksTable(matchweeks, matchweek){
        
        //generate week table view
        let html ='';
        for(let i=1; i<=matchweeks; i++){
            html +=` <p  class = "c${i} ${matchweek  === i?'active':''} " data-id="${i}"> week ${i}</p>`
        }
        
        return html;
        
    }

    //used for toggle the tableWeeks view when we click on the Matchweek li
    toggleTableWeeks(){
        const dropDown = this._parentElement;
        console.log(dropDown.parentNode);
        dropDown.parentNode.addEventListener('click', function(e){
                e.preventDefault();
                dropDown.classList.contains('isInvisible')?dropDown.classList.remove('isInvisible'):dropDown.classList.add('isInvisible');
        })
    }

    
    changeActiveWeek(handler){
        const dropDown = this._parentElement;
        dropDown.addEventListener('click', function(e){
            e.preventDefault();

            //get the number of matchweek
            const clickedMatchWeek= e.target.closest('p').dataset.id;

            //if is clicked set to active otherwise remove the active class from tableWeeksView elements
            for (const week of dropDown.children) {
                if(clickedMatchWeek === week.dataset.id){
                    week.classList.add('active');
                    
                }
                else{
                    week.classList.remove('active');
                }
            }
            //update model.state.matchweek with the number that we clicked on
            handler(Number(clickedMatchWeek));
        })

      

    }

}

export default new TableWeeksView();