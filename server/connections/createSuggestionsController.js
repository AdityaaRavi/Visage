const createSuggestionsHelper = async (numSuggestions, userId, res, mysqlConnection) => {
    //const userId = req.query.userId;
    // step 1: Get all the details of the user
    // step 2: get a list of all of the user's connection suggestions to ensure that
    //        we don't suggest someone that the user has already connected with or rejected
    // step 3: get a list of everyone who has at least one matching interest with the user
    // step 4: filter out the people who have already been suggested to the user
    // step 5: sort the list of people by the number of matching interests
    // step 6: add the top "numSuggestions" number people to the suggested connections table
    // step 7: return the newly suggested connections to the user

    try{
        mysqlConnection.query("use visage_app;", (err) => {if (err) throw err;});
        // step 1
        mysqlConnection.query(`SELECT * FROM user_info WHERE userId = ${userId};`, (err, result) => {
            if (err) throw err;
            let orgs = [result[0].org1, result[0].org2, result[0].org3, result[0].org4];
            let schools = [result[0].school1, result[0].school2, result[0].school3];
            let career = [result[0].career1, result[0].career2, result[0].career3];
            let fun = [result[0].fun1, result[0].fun2, result[0].fun3];
            let combinedInterests = orgs.concat(schools, career, fun, orgs);
            // convert all interests to lowercase
            combinedInterests = combinedInterests.map((interest) => interest == null ? null : interest.toLowerCase());

            // step 2
            mysqlConnection.query(`SELECT * FROM suggested_connections WHERE (lower_userID=? OR higher_userID=?);`, [userId, userId], (err, previouslySuggested) => {
                if (err) throw err;
                // console.log("SEE_______previously suggested: " + previouslySuggested);
                previouslySuggested = previouslySuggested.map((suggestion) => suggestion.lower_userID == userId ? suggestion.higher_userID : suggestion.lower_userID);
                // Error handling -- if there are no connections, add a dummy connection so that the query doesn't fail
                if (previouslySuggested.length == 0) previouslySuggested.push(-1);

                // step 3
                // `SELECT * FROM user_info WHERE (org1=? OR org2=? OR org3=? OR org4=? OR school1=? OR school2=? OR school3=? OR career1=? OR career2=? OR career3=? OR fun1=? OR fun2=? OR fun3=?) AND userId != ?;`, [...combinedInterests, userId], (err, possibleSuggestions) => {
                mysqlConnection.query(`SELECT * FROM user_info WHERE userId != ?;`, [userId], (err, possibleSuggestions) => {
                    if (err) throw err;
                    
                    let unfilteredSuggestions = possibleSuggestions.map((result) => {return {
                        id: result.userId,
                        name: result.name,
                        combinedInterests: orgs.concat([result.school1, result.school2, result.school3], 
                                                       [result.career1, result.career2, result.career3], 
                                                       [result.fun1, result.fun2, result.fun3],
                                                       [result.org1, result.org2, result.org3, result.org4])
                                                .map((interest) => interest == null ? null : interest.toLowerCase())
                        }});
                    
                    // step 4
                    //console.log("SEE_______previously suggested: " + previouslySuggested);
                    let filteredSuggestions = unfilteredSuggestions.filter((suggestion) => !previouslySuggested.includes(suggestion.id));
                    
                    // step 5.1
                    // create a map of the number of matching interests for each suggestion
                    filteredSuggestions = filteredSuggestions.map((suggestion) => {return {
                        id: suggestion.id,
                        name: suggestion.name,
                        // of the non-null combined interests, how many are in the combined interests of the user?
                        numMatchingInterests: suggestion.combinedInterests.filter((interest) => combinedInterests.includes(interest) && interest != null).length
                    }});
                    // step 5.2
                    // sort the list of suggestions by the number of matching interests in descending order
                    filteredSuggestions.sort((a, b) => b.numMatchingInterests - a.numMatchingInterests);
                    // step 6.1
                    // take only the top "numSuggestions" number of suggestions
                    filteredSuggestions = filteredSuggestions.slice(0, numSuggestions > filteredSuggestions.length ? filteredSuggestions.length : numSuggestions);
                    // step 6.2 - add the suggestions to the suggested_connections table
                    filteredSuggestions.forEach((suggestion) => {
                        // create a unique connection ID
                        mysqlConnection.query('SELECT connection_ID FROM suggested_connections;', (err, lis) => {
                            if (err) throw err;
                            // Makes sure connection_ID is unique. This does employ a full table scan though, which is not ideal at scale. This shouldn't cause any problems in this application though.
                            let connectionId = Math.floor(Math.random() * 2147483647);
                            while(lis.includes(connectionId)) connectionId = Math.floor(Math.random() * 2147483647);
                            // console.log("SEE_______connectionId: " + connectionId);
                            // add the connection to the suggested_connections table
                            let lower_userID = userId < suggestion.id ? userId : suggestion.id;
                            let higher_userID = userId > suggestion.id ? userId : suggestion.id;

                            mysqlConnection.query(`INSERT INTO suggested_connections (connection_ID, lower_userID, higher_userID) VALUES (?, ?, ?);`, [connectionId, lower_userID, higher_userID], (err, result) => {
                                if (err) throw err;
                                // console.log("SEE_______added connection: " + connectionId);
                            });
                        });
                    });
                    // step 7
                    //res.json(filteredSuggestions);
                });
            });
        });
    } catch (err) {
        console.log(err);
        res.json(err);
    }
    
};

export default createSuggestionsHelper;
