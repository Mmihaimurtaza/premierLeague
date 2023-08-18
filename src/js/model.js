import {async} from './regenerator-runtime';
import { API_URL, OPTIONS } from "./config";
import { getJSON} from './helpers';


export const state = {
     teams:[],
     matchweeks:38,
     matchweek:0,
     matches:[],
     standings:[]


}

export const loadTeams = async function (query){
    try{
        const data = await getJSON(`${API_URL}${query}`,OPTIONS);
         state.teams = data.teams.map(team => {
            return{
                name: team.name,
                shortName:team.shortName,
                crest:team.crest,
                website:team.website,
                squad: team.squad,
                coach: team.coach,
                stadium: team.venue

            }
         });
       
    }
    catch(err){
        
        throw err;
    }   

}

export const loadMatches = async function (query){
    try{
        const data = await getJSON(`${API_URL}${query}`,OPTIONS);
         state.matchweeks = data.matches.length/10;
         state.matches = data.matches.map(match =>{
            return{
                 homeTeam: match.homeTeam.tla,
                 awayTeam: match.awayTeam.tla,
                 homeTeamCrest: match.homeTeam.crest,
                 awayTeamCrest: match.awayTeam.crest,
                 date: new Date(match.utcDate),
                 homeScore: match.score.fullTime.home,
                 awayScore: match.score.fullTime.away,
                 
            }
         })
            
            
         
       
    }
    catch(err){
        
        throw err;
    }   
}

    export const loadStandings = async function (query){
        try{
            const data = await getJSON(`${API_URL}${query}`,OPTIONS);
            state.matchweek = data.season.currentMatchday;
            const stats = data.standings[0].table;
             state.standings = stats.map((place,index) =>{
            return{
                 position: ++index,
                 crest: place.team.crest,
                 name: place.team.name,
                 playedGames: place.playedGames,
                 won:  place.won,
                 draw: place.draw,
                 lost: place.lost,
                 goalsFor:place.goalsFor,
                 goalsAgainst: place.goalsAgainst,
                 goalDifference: place.goalDifference,
                 points: place.points
            }
         })
            
        }
        catch(err){
            
            throw err;
        }   
    }
        export const updateMatchweek = function(week){
            state.matchweek = week;
        }
    
    
    

