import View from './view.js';

class StandingsView extends View {
    _parentElement = document.querySelector('.standings table');
  
    
    _generateMarkup() {
       
            return `
                <tr>
                    <th>Position</th>
                    <th colspan="3">Club</th>
                    <th class="center no-mobile">Played</th>
                    <th class="center no-mobile" >Won</th>
                    <th class="center no-mobile">Drawn</th>
                    <th class="center no-mobile">Lost</th>
                    <th class="center no-mobile">GF</th>
                    <th class="center no-mobile">GA</th>
                    <th class="center no-mobile">GD</th>
                    <th class="center">Points</th>
                </tr>
                ${this._data.map(this._generateMarkupRow).join('')}
        
            `;
          
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }

    _generateMarkupRow(row) {
        return `
            <tr>
                <td>${row.position}</td>
                <td class="bold  " colspan ="1"> <img src = "${row.crest}"></td>
           
                <td class="bold " colspan ="2">${row.name}</td>
                <td class="center no-mobile">${row.playedGames}</td>
                <td class="center no-mobile">${row.won}</td>
                <td class="center no-mobile">${row.draw}</td>
                <td class="center no-mobile">${row.lost}</td>
                <td class="center no-mobile">${row.goalsFor}</td>
                <td class="center no-mobile">${row.goalsAgainst}</td>
                <td class="center no-mobile">${row.goalDifference}</td>
                <td class="center bold mobile-grow">${row.points}</td>
            </tr>`;
           
    }
}

export default new StandingsView();