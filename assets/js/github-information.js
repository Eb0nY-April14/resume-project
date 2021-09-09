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



function fetchGitHubInformation(event) {
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

        $.when( // when we've got a response from the GitHub API
            $.getJSON(`https://api.github.com/users/${username}`)
        ).then( // then run a function that takes the JSON response as its parameter
            function(response) {
                var userData = response;  // store the response in a variable called 'userData'
                $("#gh-user-data").html(userInformationHTML(userData)); // call the userInformationHTML() function that takes the userData as its parameter & display it in the div with an ID of 'gh-user-data'
                /* Sometimes, in real life, promises don't work as expected & so it is in JS too. To handle this in JS, we 
                need to pass in an error() function that will handle the error response. This function takes 'errorResponse'
                as its parameter this  */
            }, function(errorResponse) {
                /* What line 36 does is that it checks if no response is found i.e error status is 404 meaning 'not found' error */
                if (errorResponse.status === 404) { 
                    /* In response to the outcome of line 36, line 39 then selects the div with an ID of 'gh-user-data' & set its 
                    html to an error message that says user wasn't found using template literals. */
                    $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`); 
                } else {  // if the error generated is not 404 error, the else handles it on line 41 
                    console.log(errorResponse); // logs the entire error out to the console 
                    $("#gh-user-data").html( // We'll also set the HTML of the div with an ID of 'gh-user-data' to the JSON response that we got back from our error response variable using template literals
                        `<h2>Error: ${errorResponse.responseJSON.message}</h2>`);
                    //)
                }
            }
        )
}