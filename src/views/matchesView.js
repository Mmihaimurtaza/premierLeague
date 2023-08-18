import View from "./view";

class MatchesView extends View {
    _parentElement = document.querySelector('.matchWeek');
    _previousDate = null;
    _currentDate = null;
    _generateMarkup() {
           const matchWeek = this._data[1]; //current matchweek
           const matches = this._data[0];  //all the data that we handle in order to create matches view

           //return 10 games 
            return `
                
                ${matches.slice((matchWeek*10)-10, matchWeek*10).map(this._generateMarkupMatch.bind(this)).join('')}
        
            `;
          
    }

    addHandlerRender(handler) {
        ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
      }

    _generateMarkupMatch(match ) {
        
        //convert the date i a familiar format
        this._currentDate =  match.date.getDate()+'/'+ Number(match.date.getMonth() +1)+'/'+match.date.getFullYear();

        // see if the date is different from the one before
        const insertDate = this._isDifferentDate(this._previousDate, this._currentDate);

        //previous date become the current date for the next iteration
        this._previousDate = this._currentDate;

        return `
            ${insertDate?`<div class="date"><h2>${this._currentDate}</h2></div>`:''}<div class = "game"><p>${match.homeTeam}</p><img src="${match.homeTeamCrest}"> <span class="result">${match.homeScore != null?`${match.homeScore} - ${match.awayScore}`:`${(match.date.getHours()<10?'0':'') + match.date.getHours()+ ':'+ (match.date.getMinutes()<10?'0':'') + match.date.getMinutes()}`}</span> <img src="${match.awayTeamCrest}"><p>${match.awayTeam}</p></div> 
            <hr>   `;
           
    }

    //helper function used to see if the date of current match is different from the one before
    _isDifferentDate(previous, current){
        if(previous !== current){
            previous = current;
            return true;
        }
    }
}

export default new MatchesView();