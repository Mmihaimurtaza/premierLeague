import View from './view.js';

class TeamsView extends View {
    _parentElement = document.querySelector('.presentation ul');
  
    
    _generateMarkup() {
      
            return `
                 <li class="sites">Club Sites <i class='bx bx-link-external'></i></li>
                ${this._data.map(this._generateMarkupTeam).join('')}
        
            `;
          
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }

    _generateMarkupTeam(team) {
        return `
        <li class="team"><a href ="${team.website}" target = "_blank"><img src = "${team.crest}"></li></a>`;
           
    }
}

export default new TeamsView();