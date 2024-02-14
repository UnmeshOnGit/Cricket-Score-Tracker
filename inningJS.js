

let bat_team = localStorage.getItem('bat_team');
let bowl_team = localStorage.getItem('bowl_team');
let toss_win = localStorage.getItem('toss_winner');
let choose = localStorage.getItem('bat_bowl');
let venue = localStorage.getItem('venue_select');
let maxOvers = localStorage.getItem('over_select');



let totalRuns = 0;
let totalWickets = 0;
let fours = 0;
let sixers = 0;
let currentOver = 0;
let currentBall = 0;
// const maxOvers = 0;
let final_score = 0;
let extras = 0;
let Deliveries = 0;
let runrate = 0;
let New_score = 0;
let player_run = 0;
let player_ball = 0;
let half_century = 0;
let century = 0;
let run_counter = 0;
let strike_rate = 0;
let projected_score = 0;


function match(){
    document.getElementById("team-1").innerHTML = bat_team;
    document.getElementById("team-2").innerHTML = bowl_team;
    
    document.getElementById("team").innerHTML = toss_win;
    document.getElementById("choose").innerHTML = choose;
    document.getElementById("venue").innerHTML = venue;
    
    document.getElementById("team-1-inning").innerHTML = bat_team;
    document.getElementById("team-2-inning").innerHTML = bowl_team;

    document.getElementById("run").textContent = `${bat_team} : ${player_run} (${player_ball})`;
    document.getElementById("run1").textContent = `${bowl_team} : ${player_run} (${player_ball})`;
}
    




//my javascript data till this end


function updateScore(run) {
    if (currentOver < maxOvers) {
        totalRuns += run;
        document.getElementById('score').textContent = `Score: ${totalRuns}/${totalWickets}`;
        if (run === 4) {
            fours++;
            document.getElementById('fours').textContent = fours;
        } else if (run === 6) {
            sixers++;
            document.getElementById('sixers').textContent = sixers;
        }

        currentBall++;

        if (currentBall === 6) {
            currentOver++;
            currentBall = 0;
        }

        updateOvers();
        updateRunRate();
        updatePlayerStatistics();
    }
}

function updateWicket() {
    if (currentOver < maxOvers && totalWickets < 10) {
        totalWickets++;
        document.getElementById('score').textContent = `Score: ${totalRuns}/${totalWickets}`;

        // Update fall of wicket chart
        const wicketList = document.getElementById('wicket-list');
        const listItem = document.createElement('h4');
        currentBall++;
        listItem.textContent = `${totalWickets} : ${totalRuns} runs (Over: ${currentOver}.${currentBall})`;
        wicketList.appendChild(listItem); 
        if (currentBall === 6) {
            currentOver++;
            currentBall = 0;
        }
        
        updateOvers();
        updateRunRate();
        {
            run_counter = totalRuns - New_score;
            New_score = totalRuns;
            document.getElementById('run').textContent = `${bat_team}: 0 (0) `;
            document.getElementById('strike-rate').textContent = `Strike Rate: 000`;
            player_run = 0;
            player_ball = 0;
            strike_rate = 0;

            if(run_counter > 49 && run_counter < 100){
                half_century++;
                document.getElementById('half').textContent = `Half Century: ${half_century}`;
            }
            else if(run_counter > 99 && run_counter < 149){
                century++;
                document.getElementById('century').textContent = `Century: ${century}`;
            }
        }
    }
}

function updateWide() {
    if (currentOver < maxOvers) {
        totalRuns++;
        final_score = totalRuns;
        document.getElementById('score').textContent = `Score: ${totalRuns}/${totalWickets}`;
        // Do not update overs for wide ball

        extras++;
        document.getElementById('Extras').textContent = extras;
        updateOvers();
        updateRunRate();
    }
}

function updateNoBall() {
    const extraRuns = prompt('Enter the number of runs scored in the no ball:');
    if (extraRuns && !isNaN(extraRuns)) {
        totalRuns += parseInt(extraRuns);
        totalRuns++;
        extras++;
        document.getElementById('Extras').textContent = extras;


        final_score = totalRuns;
        document.getElementById('score').textContent = `Score: ${totalRuns}/${totalWickets}`;
        // Do not update overs for no ball
        updateOvers();
        updateRunRate();
    } else {
        alert('Invalid input. Please enter a valid number of runs for the no ball.');
    }
}

function updateOverStatistics(overRun){
    const overList = document.getElementById('over-statistics');
    const overItem = document.createElement('td');
    overItem.textContent = `${overRun}`;
    overList.appendChild(overItem);
}
function updateOvers() {
    document.getElementById('overs').textContent = `Overs: ${currentOver}.${currentBall}`;
}

function updateRunRate(){
     deliveries = currentOver * 6 + currentBall;
     deliveries /= 6;
    runrate = (totalRuns / deliveries);
    document.getElementById('run-rate').textContent = `Current Run Rate: ${runrate.toFixed(2)}`;

    let Over_Remaining = ((maxOvers * 6) - (currentOver * 6 + currentBall))/6;
    projected_score = Over_Remaining * runrate + totalRuns;
    document.getElementById('projected-runs').textContent = `Projected Score: ${Math.round(projected_score)}`;
}


function updatePlayerStatistics(){
    player_run = totalRuns - New_score;;
    player_ball++;
    strike_rate = (player_run / player_ball) * 100;
    document.getElementById('run').textContent = `${bat_team} : ${player_run} (${player_ball}) `;
    document.getElementById('strike-rate').textContent = `Strike Rate: ${strike_rate.toFixed(2)}`;
}


function info(){
    let element = document.getElementById("info");
    element.classList.toggle("info-active");
}

function endOfInning() {
    // Additional logic can be added as needed
    final_score = totalRuns;
    alert('End of Inning! Final Score: ' + final_score);
    document.getElementById('target').textContent = `Target: ${final_score + 1}`;

    localStorage.setItem('final_score', final_score);
    info();
    scoreRemaining();
}

// function startNewInning() {

//     totalRuns = 0;
//     totalWickets = 0;
//     fours = 0;
//     sixers = 0;
//     currentOver = 0;
//     currentBall = 0;
//     final_score = 0;
//     runrate = 0;

//     document.getElementById('score').textContent = 'Score: 0/0';
//     document.getElementById('overs').textContent = 'Overs: 0.0';
//     document.getElementById('fours').textContent = '0';
//     document.getElementById('sixers').textContent = '0';
//     document.getElementById('wicket-list').innerHTML = '';
//     document.getElementById('run-rate').innerHTML = 'Current Run Rate: 00.00';
// }














// Inning 2 JS starts here

// function match() {
//     let team_1 = localStorage.getItem('team_1_name');
//     let team_2 = localStorage.getItem('team_2_name');
//     let toss_win = localStorage.getItem('toss_winner');
//     let choose = localStorage.getItem('bat_bowl');
//     let over = localStorage.getItem('over_select');
//     let venue = localStorage.getItem('venue_select');


//     document.getElementById("team-1").innerHTML = team_1;
//     document.getElementById("team-2").innerHTML = team_2;
//     document.getElementById("team").innerHTML = toss_win;
//     document.getElementById("choose").innerHTML = choose;
//     document.getElementById("venue").innerHTML = venue;
//     document.getElementById("team_1_name").innerHTML = team_1;
//     document.getElementById("team_2_name").innerHTML = team_2;

// }

//my javascript data till this end
let maxOvers1 = localStorage.getItem('over_select');
const box = document.querySelector(".firecracker");
const slide = document.querySelector(".score-remaining");

let totalRuns1 = 0;
let totalWickets1 = 0;
let fours1 = 0;
let sixers1 = 0;
let currentOver1 = 0;
let currentBall1 = 0;
//const maxOvers1 = 1;
let final_score1 = 0;
let extras1 = 0;
let deliveries1 = 0;
let runrate1 = 0;
let New_score1 = 0;
let player_run1 = 0;
let player_ball1 = 0;
let half_century1 = 0;
let century1 = 0;
let run_counter1 = 0;
let strike_rate1 = 0;
let projected_score1 = 0;

function updateScore1(run1) {
    if (currentOver1 < maxOvers1) {
        totalRuns1 += run1;
        document.getElementById('score1').textContent = `Score: ${totalRuns1}/${totalWickets1}`;

        if (run1 === 4) {
            fours1++;
            document.getElementById('fours1').textContent = fours1;
        } else if (run1 === 6) {
            sixers1++;
            document.getElementById('sixers1').textContent = sixers1;
        }

        currentBall1++;

        if (currentBall1 === 6) {
            currentOver1++;
            currentBall1 = 0;
        }

        updateOvers1();
        updateRunRate1();
        updateRequireRunRate();
        scoreRemaining()
        updatePlayerStatistics1();
    }
}

function updateWicket1() {
    if (currentOver1 < maxOvers1 && totalWickets1 < 10) {
        totalWickets1++;
        document.getElementById('score1').textContent = `Score: ${totalRuns1}/${totalWickets1}`;
        localStorage.setItem('Wicket-fell', totalWickets1);
        // Update fall of wicket chart
        const wicketList1 = document.getElementById('wicket-list1');
        const listItem1 = document.createElement('h4');
        currentBall1++;
        listItem1.textContent = `${totalWickets1}: ${totalRuns1} runs (Over: ${currentOver1}.${currentBall1})`;
        wicketList1.appendChild(listItem1);

        if (currentBall1 === 6) {
            currentOver1++;
            currentBall1 = 0;
        }

        updateOvers1();
        updateRunRate1();
        scoreRemaining()
        updateRequireRunRate();
        {
            run_counter1 = totalRuns1 - New_score1;
            New_score1 = totalRuns1;
            document.getElementById('run1').textContent = `${bowl_team}: 0 (0) `;
            document.getElementById('strike-rate1').textContent = `Strike Rate: 000`;
            player_run1 = 0;
            player_ball1 = 0;
            strike_rate1 = 0;

            if(run_counter1 > 49 && run_counter1 < 100){
                half_century1++;
                document.getElementById('half1').textContent = `Half Century: ${half_century1}`;
            }
            else if(run_counter1 > 99 && run_counter1 < 149){
                century1++;
                document.getElementById('century1').textContent = `Century: ${century1}`;
            }
        }
    }
}

function updateWide1() {
    if (currentOver1 < maxOvers1) {
        totalRuns1++;
        final_score1 = totalRuns1;
        document.getElementById('score1').textContent = `Score: ${totalRuns1}/${totalWickets1}`;

        extras1++;
        document.getElementById('Extras1').textContent = extras1;
        // Do not update overs for wide ball
        updateOvers1();
        updateRunRate1();
        scoreRemaining()
        updateRequireRunRate();
    }
}

function updateNoBall1() {
    const extraRuns1 = prompt('Enter the number of runs scored in the no ball:');
    if (extraRuns1 && !isNaN(extraRuns1)) {
        totalRuns1 += parseInt(extraRuns1);
        totalRuns1++;
        extras1++;
        document.getElementById('Extras1').textContent = extras1;

        final_score1 = totalRuns1;
        document.getElementById('score1').textContent = `Score: ${totalRuns1}/${totalWickets1}`;

        // Do not update overs for no ball
        updateOvers1();
        updateRunRate1();
        scoreRemaining()
        updateRequireRunRate();
    } else {
        alert('Invalid input. Please enter a valid number of runs for the no ball.');
    }
}

function updateOvers1() {
    document.getElementById('overs1').textContent = `Overs: ${currentOver1}.${currentBall1}`;
}

function updateRunRate1(){
    deliveries1 = currentOver1 * 6 + currentBall1;
    deliveries1 /= 6;
   runrate1 = (totalRuns1 / deliveries1);
   document.getElementById('run-rate1').textContent = `Current Run Rate: ${runrate1.toFixed(2)}`;



    let Over_Remaining1 = ((maxOvers1 * 6) - (currentOver1 * 6 + currentBall1))/6;
    projected_score1 = Over_Remaining1 * runrate1 + totalRuns1;
    document.getElementById('projected-runs1').textContent = `Projected Score: ${Math.round(projected_score1)}`;
}


function updateRequireRunRate(){
    let require_runrate = 0;
    let Required_runs = 0;
    let Over_Remaining = ((maxOvers1 * 6) - (currentOver1 * 6 + currentBall1))/6;
    let target = localStorage.getItem('final_score', final_score);
    Required_runs = (target - totalRuns1);
    require_runrate = parseInt(Required_runs / Over_Remaining);
    document.getElementById('require-run-rate').textContent = `RRR: ${require_runrate.toFixed(2)}`;
}

function scoreRemaining(){
    let target = localStorage.getItem('final_score', final_score);
    target++;
    let Required_runs1 = (target - totalRuns1);
    let ball_remaining = (maxOvers1 * 6) - (currentOver1 * 6 + currentBall1);
    document.getElementById('Score-remaining').textContent = `${bowl_team} Need ${Required_runs1} runs from ${ball_remaining} balls `;
}



function updatePlayerStatistics1(){
    player_run1 = totalRuns1 - New_score1;
    player_ball1++;
    strike_rate1 = (player_run1 / player_ball1) * 100;
    document.getElementById('run1').textContent = `${bowl_team}: ${player_run1} (${player_ball1}) `;
    document.getElementById('strike-rate1').textContent = `Strike Rate: ${strike_rate1.toFixed(2)}`;
}




function endOfInning1() {
    // Additional logic can be added as needed
    final_score1 = totalRuns1;
    alert('End of Inning! Final Score: ' + final_score1);


    let final_score = localStorage.getItem('final_score');
    let total_Wickets = localStorage.getItem('Wicket-fell');

    if (final_score < final_score1) {
            wicket_remaining = 10 - total_Wickets;
            document.getElementById('target').textContent = `${bowl_team} Has Won the match by ${wicket_remaining} wickets`; 
            box.classList.toggle("firecracker_active");
    } else if (final_score == final_score1){
        document.getElementById('target').textContent = `Match Has tied`;
    }else{
        let runs_remaining = final_score - final_score1;
        document.getElementById('target').textContent = `${bat_team} Has Won the match by ${runs_remaining} runs` ;
        box.classList.toggle("firecracker_active");
    }

    
    
    slide.classList.toggle("score-remaining_hide");
    document.getElementById('Score-remaining').textContent = ` `;

}

// $(function(){
//     $('.fire-cracker').on('click', function(){
//         $(this).toggleClass('firecracker_active')
//    });
// });


function startNewInning() {

    totalRuns = 0;
    totalWickets = 0;
    fours = 0;
    sixers = 0;
    currentOver = 0;
    currentBall = 0;
    final_score = 0;
    runrate = 0;

    document.getElementById('score').textContent = 'Score: 0/0';
    document.getElementById('overs').textContent = 'Overs: 0.0';
    document.getElementById('fours').textContent = '0';
    document.getElementById('sixers').textContent = '0';
    document.getElementById('wicket-list').innerHTML = '';
    document.getElementById('target').innerHTML = '';
    document.getElementById('run-rate').innerHTML = 'Current Run Rate: 00.00';


    totalRuns1 = 0;
    totalWickets1 = 0;
    fours1 = 0;
    sixers1 = 0;
    currentOver1 = 0;
    currentBall1 = 0;
    final_score1 = 0;
    runrate1 = 0;

    document.getElementById('score1').textContent = 'Score: 0/0';
    document.getElementById('overs1').textContent = 'Overs: 0.0';
    document.getElementById('fours1').textContent = '0';
    document.getElementById('sixers1').textContent = '0';
    document.getElementById('wicket-list1').innerHTML = '';
    document.getElementById('run-rate1').innerHTML = 'Current Run Rate: 00.00';
}

