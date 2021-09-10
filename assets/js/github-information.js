function userInformationHTML(user) {
    /* The code on line 10 will return the user's public display name. The "(@" before the <a> tag 
    on line 12 will appear before the user's login name. Also we have a link 'i.e href' on line 12 too 
    which is the link to the user's public profile on GitHub. The _blank target will make it open in 
    a new tab. The text in our <a> tag is just '${user.login}'. 
    The content about the user will be displayed in the div with the class of "gh-content".
    The user's avatar or an automatically generated one if the user didn't create one will be 
    displayed in the div with the class of "gh-avatar". Inside the <a> tag, we'll create an image 
    tag which will display the user's avatar. The image src is "${user.avatar_url}" & we'll give it 
    a width & height of 80px so it appears in a nice square. For the alt attribue, the user login name
    will be displayed if the avatar can't be retrieved. */
    /* On line 26, ${user.followers} will give a count of the number of people following our user. 
    ${user.following} will give a count of the number of people our user is following while 
    ${user.public_repos} will give us a count of the public repositories that this user has.  */
    return `    
        <h2>${user.name} 
            <span class="small-name">
                (@<a href="${user.html_url}" target="_blank">${user.login}</a>) 
            </span>
        </h2>
        <div class="gh-content">  
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}" />
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Repos: ${user.public_repos}</p>
        </div>`;
}

/* This function will display on the screen the repository data of our selected user that was returned earlier by JSON. 
The function takes 1 argument which is repos i.e the object returned from our GitHub API. */
function repoInformationHTML(repos) { // The 'repos' object is returned by GitHub as an array
    if (repos.length == 0) { // so we can use an array method of .length() on it (i.e 'repos' object) to see if it's equal to 0. 
        return `<div class="clearfix repo-list">No repos!</div>`; // if it's equal to 0, then it means that our array is empty & therefore no repositories for that user.
    }

    /* The code below will be carried out if (repos.length != 0 i.e our array is NOT empty so data is returned.
        Since data is returned & it's in form of an array, we'll iterate through it & get that information out.
        We'll create a variable called 'listItemsHTML' that will take the results of the map method that'll be 
        run against our repos array. The map() method works like a 'forEach()' but it returns an array with the 
        results of this function.  */
    var listItemsHTML = repos.map(function(repo) {
        /* Here, the contents of the array that we want to return are <li> i.e list items as seen below. The 
        href within the <a> tag of <li> tag takes us to the actual repository when clicked on & it opens in 
        new tab. The text that will be inside our <a> tag that will be displayed to the user is going to be 
        ${repo.name} i.e the name of the repository. */
        return `<li>    
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    /* We'll format the output here by creating a div & give it classes. Then, we'll create a <ul> that'll be 
    the parent for all the list items we created. Since the map() returns an array, we'll use the join() method 
    on that array & join everything with a new line i.e "\n". This stops us from iterating through the new array 
    once again. */
    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")}
                </ul>
            </div>`;
} 

function fetchGitHubInformation(event) {
    /* To get rid of the issue with our div with the ID of 'gh-repo-data'still displaying the repos 
    (i.e not been cleared) when there's an empty textbox i.e no input in the textbox, we'll use jQuery 
    to select the 2 IDs '#gh-user-data' & '#gh-repo-data' and set each of their html content to an empty 
    string. This will empty/clear the divs */
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");


    /* On line 4, the 'username' variable created below holds the username typed in by the user. We use jQuery 
    to select the text field with 'gh-username' ID & access the value in that text field. */ 
    var username = $("#gh-username").val();
    if (!username) {    // This if statement checks if username field is empty & executes line 6 below if it is.
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`); // It displays this html <h2> message to the user if empty.
        return;
    }

    /* if username field is NOT empty i.e text has been inputted into it, we'll set our HTML to display a loader gif image.
    The loader.gif file is an animated gif file that will keep repeating itself while data is being entered. */ 
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..." />  
        </div>`);

        /* Here, we'll start retrieving some information from the GitHub API using promises. In a real life promise,
        one thing is dependent on another thing finishing & is same in jQuery. We'll use the 'when()' & 'then()' 
        methods to create promises e.g when one thing is done, then do another thing. 
        In our code below, the promise used is explained thus:  
        When we've got a response from the GitHub API, then run a function that takes the JSON response as its 
        parameter, store it in a variable called 'userData' & display it in the div with an ID of 'gh-user-data' 
        on the html page for the user. */ 
        /* When doing 2 getJSON calls instead of 1, we need to have 2 responses come back in our first function 
        which we'll name firstResponse & secondResponse. Also, we need to create a 2nd variable called repoData. 
        When we do 2 calls at once, the when() method packs a response up into arrays & each one is the 1st 
        element of the array so we have to put the indexes in there for these responses. */
        $.when( // when we've got a response from the GitHub API
            $.getJSON(`https://api.github.com/users/${username}`),
            $.getJSON(`https://api.github.com/users/${username}/repos`) /* This will list the repositories for that individual user */
        ).then( // then run a function that takes the JSON response as its parameter
            function(firstResponse, secondResponse) {
                var userData = firstResponse[0];  // store the first response in a variable called 'userData'
                var repoData = secondResponse[0];  // store the second response in a variable called 'repoData'
                $("#gh-user-data").html(userInformationHTML(userData)); // call the userInformationHTML() function that takes the userData as its parameter & display it in the div with an ID of 'gh-user-data'
                $("#gh-repo-data").html(repoInformationHTML(repoData)); // call the repoInformationHTML() function that takes the repoData as its parameter & display it in the div with an ID of 'gh-repo-data'
                /* Sometimes, in real life, promises don't work as expected & so it is in JS too. To handle this in JS, we 
                need to pass in an error() function that will handle the error response. This function takes 'errorResponse'
                as its parameter this  */
            }, function(errorResponse) {
                /* What line 36 does is that it checks if no response is found i.e error status is 404 meaning 'not found' error */
                if (errorResponse.status === 404) { // if starts
                    /* In response to the outcome of line 36, line 39 then selects the div with an ID of 'gh-user-data' & set its 
                    html to an error message that says user wasn't found using template literals. */
                    $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`); 
                } else {  // if the error generated is not 404 error, the else handles it on line 41 
                    console.log(errorResponse); // logs the entire error out to the console 
                    $("#gh-user-data").html( // We'll also set the HTML of the div with an ID of 'gh-user-data' to the JSON response that we got back from our error response variable using template literals
                        `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                } 
            });
       // )
}

/* To have the octocat profile displaying when the page is loaded instead of having just an empty div, we'll use the
documentReady() function in jQuery & execute the fetchGitHubInformation() function when the DOM is fully loaded.  */
$(document).ready(fetchGitHubInformation);