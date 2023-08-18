import * as model from './model.js';
import { API_URL } from './config';
import TeamsView from '../views/teamsView.js';
import MatchesView from '../views/matchesView.js';
import StandingsView from '../views/standingsView.js';
import TableWeeksView from '../views/tableWeeksView.js';
//import './regenerator-runtime/runtime';



if(module.hot){
  module.hot.accept;
}


const controlTeamsResults = async function () {
    try{
        
      await model.loadTeams('teams');
      TeamsView.render(model.state.teams);
     
      
    }catch(err){
        console.log(err);
    }
}

const controlMatchesResults = async function () {
    try{
        
      await model.loadMatches('matches');
      MatchesView.render([model.state.matches, model.state.matchweek]);
     
      
    }catch(err){
        console.log(err);
    }
   }

   const controlStandingsResults = async function () {
    try{
        
      await model.loadStandings('standings');
      StandingsView.render(model.state.standings);
     
      
    }catch(err){
        console.log(err);
    }
   }

   const controlTableWeeks =async function(){
    try{

        //get the number of matchweeks
        await model.loadStandings('standings');

        //render the table according to that number
        TableWeeksView.render([model.state.matchweeks, model.state.matchweek]);
    }
    catch(err){
        console.log(err);
    }
   }

   const controlChangeActiveWeeks =async function(week){
    try{
        //update current active matchweek
        model.updateMatchweek(week);

        //render the matches that are in the current matchweek after click
        MatchesView.render([model.state.matches, model.state.matchweek]);
       
    }
    catch(err){
        console.log(err);
    }
   }


   TeamsView.addHandlerRender(controlTeamsResults);
   MatchesView.addHandlerRender(controlMatchesResults);
   StandingsView.addHandlerRender(controlStandingsResults);
   TableWeeksView.addHandlerRender(controlTableWeeks);
   TableWeeksView.toggleTableWeeks();
   TableWeeksView.changeActiveWeek(controlChangeActiveWeeks);
   
  
   
