const presentationTeams = document.querySelector(".presentation ul");
const matchesDiv = document.querySelector(".matchWeek");
const tableStandingsDiv = document.querySelector(".standings table");
const matchweekSelectDropdownDiv = document.querySelector(".dropdown");
const dropdownContent = document.querySelector(".dropdown-content");
let matchWeek = 0;
let matchweeks = 38;
const teamLinks = {
    "Arsenal": "https://www.arsenal.com/?utm_source=premier-league-website&utm_campaign=website&utm_medium=link",
    "Aston Villa": "https://www.avfc.co.uk/",
    "Chelsea": "https://www.chelseafc.com/en",
    "Everton": "https://www.evertonfc.com/",
    "Fulham": "https://www.fulhamfc.com/",
    "Liverpool": "https://www.liverpoolfc.com/",
    "Man City": "https://www.mancity.com/",
    "Man United": "https://www.manutd.com/",
    "Newcastle": "https://www.nufc.co.uk/",
    "Tottenham": "https://www.tottenhamhotspur.com/",
    "Wolverhampton": "https://www.wolves.co.uk/",
    "Burnley": "https://www.burnleyfootballclub.com/",
    "Nottingham": "https://www.nottinghamforest.co.uk/",
    "Crystal Palace": "https://www.cpfc.co.uk/",
    "Sheffield Utd": "https://www.sufc.co.uk/",
    "Luton Town": "https://www.lutontown.co.uk/",
    "Brighton Hove": "https://www.brightonandhovealbion.com/",
    "Brentford": "https://www.brentfordfc.com/en",
    "West Ham": "https://www.whufc.com/",
    "Bournemouth": "https://www.afcb.co.uk/"
};
const url = "https://api.football-data.org/v4/competitions/PL/matches";
const url2 = "https://api.football-data.org/v4/competitions/PL/teams";
const url3 = "https://api.football-data.org/v4/competitions/PL/standings";
const options = {
    method: "GET",
    headers: {
        "X-Auth-Token": "343ecd9432f345fbaea2ab977cf2831e"
    }
};
async function getCurrentMatchWeek() {
    try {
        const response = await fetch(url3, options);
        const result = await response.json();
        return result.season.currentMatchday;
    } catch (error) {
        console.error(error);
    }
}
//insert new date for games
const changeDate = (previousDate, currentDate)=>{
    if (previousDate !== currentDate) {
        previousDate = currentDate;
        return true;
    }
    return false;
};
async function getMatches() {
    try {
        const response = await fetch(url, options);
        const result = await response.json();
        const matches = result.matches;
        matchweeks = matches.length / 10;
        const games = [];
        let previousDate = "";
        let currentDate = "";
        matches.forEach((match, index)=>{
            const date = new Date(match.utcDate);
            currentDate = "" + date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
            const homeTeam = match.homeTeam.tla;
            const awayTeam = match.awayTeam.tla;
            const homeTeamCrest = match.homeTeam.crest;
            const awayTeamCrest = match.awayTeam.crest;
            let score = "";
            if (match.score.fullTime.home != null) score += `${match.score.fullTime.home} - ${match.score.fullTime.away}`;
            else score += (date.getHours() < 10 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 10 ? "0" : "") + date.getMinutes();
            html = `${changeDate(previousDate, currentDate) ? `<div class="date"><h2>${currentDate}</h2></div>` : ""}<div class = "game"><p>${homeTeam}</p><img src="${homeTeamCrest}"> <span class="result">${score}</span> <img src="${awayTeamCrest}"><p>${awayTeam}</p></div> 
            <hr>   `;
            games.push(html);
            previousDate = currentDate;
        });
        return games;
    } catch (error) {
        console.error(error);
    }
}
//function to retrieve all the competition teams and asigned them websites
async function getTeams() {
    const response = await fetch(url2, options);
    const result = await response.json();
    const teams = result.teams;
    let newListFlag = "";
    teams.forEach((team)=>{
        const newFlag = team.crest;
        const name = team.shortName;
        newListFlag += `
        <li class="team"><a href ="${teamLinks[name]}" target = "_blank"><img src = "${newFlag}"></li></a>`;
    });
    return newListFlag;
}
async function getStandings() {
    try {
        const response = await fetch(url3, options);
        const result = await response.json();
        const standings = result.standings[0].table;
        let html1 = "";
        standings.forEach((place, index)=>{
            html1 += `<tr>
                <td>${++index}</td>
                <td class="bold" colspan ="1"><img src = "${place.team.crest}"></td>
                <td class="bold" colspan ="2">${place.team.name}</td>
                <td class="center">${place.playedGames}</td>
                <td class="center">${place.won}</td>
                <td class="center">${place.draw}</td>
                <td class="center">${place.lost}</td>
                <td class="center">${place.goalsFor}</td>
                <td class="center">${place.goalsAgainst}</td>
                <td class="center">${place.goalDifference}</td>
                <td class="center">${place.points}</td>
            </tr>`;
        });
        return html1;
    } catch (error) {
        console.error(error);
    }
}
const generateMatchweeks = (weeks)=>{
    let html1 = "";
    for(let i = 1; i <= weeks; i++)html1 += ` <p  class = "c${i} ${matchWeek === i ? "active" : ""} }" data-id="${i}"> week ${i}</p>`;
    return html1;
};
const premierLeagueListTeamsFlags = getTeams();
const standings = getStandings();
const premierLeagueGamesList = getMatches();
matchweekSelectDropdownDiv.addEventListener("click", function(e) {
    e.preventDefault();
    dropdownContent.classList.contains("isInvisible") ? dropdownContent.classList.remove("isInvisible") : dropdownContent.classList.add("isInvisible");
});
const init = ()=>{
    premierLeagueListTeamsFlags.then((resp)=>{
        presentationTeams.insertAdjacentHTML("beforeend", resp);
    });
    matchesDiv.innerHTML = matchesDiv.innerHTML = ` 
        <div class = "matchWeek-number"><img src="	https://www.premierleague.com/resources/rebrand/v7.126.3/i/elements/pl-main-logo.png
            " alt="no photo" />
            <h1>Matchweek ${matchWeek}</h1>
        </div>`;
    premierLeagueGamesList.then((games)=>games.slice(matchWeek * 10 - 10, matchWeek * 10).forEach((game)=>{
            matchesDiv.insertAdjacentHTML("beforeend", game);
        }));
    standings.then((resp)=>{
        tableStandingsDiv.insertAdjacentHTML("beforeend", resp);
    });
    dropdownContent.insertAdjacentHTML("beforeend", generateMatchweeks(matchweeks));
    dropdownContent.addEventListener("click", function(e) {
        e.preventDefault();
        matchWeek = e.target.closest("p").dataset.id;
        matchWeek = Number(matchWeek);
        const weeks = document.querySelectorAll(".dropdown-content p");
        console.log(matchWeek);
        weeks.forEach((week)=>{
            if (Number(matchWeek) == Number(week.dataset.id)) week.classList.add("active");
            else week.classList.remove("active");
        });
        matchesDiv.innerHTML = matchesDiv.innerHTML = ` 
        <div class = "matchWeek-number"><img src="	https://www.premierleague.com/resources/rebrand/v7.126.3/i/elements/pl-main-logo.png
            " alt="no photo" />
            <h1>Matchweek ${matchWeek}</h1>
        </div>`;
        premierLeagueGamesList.then((games)=>games.slice(matchWeek * 10 - 10, matchWeek * 10).forEach((game)=>{
                matchesDiv.insertAdjacentHTML("beforeend", game);
            }));
    });
};
getCurrentMatchWeek().then((resp)=>{
    matchWeek = resp;
    init();
});

//# sourceMappingURL=index.579125c3.js.map
