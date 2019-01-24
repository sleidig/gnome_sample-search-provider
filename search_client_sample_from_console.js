/*
 * Sample Search Provider
 * A sample and base project to integrate custom search providers in GNOME Shell.
 * This code provides a simple outline for a GNOME Extension that adds a new search into
 * the GNOME Shell search.
 *
 * Copyright (C) 2019
 *     Sebastian Leidig <sebastian.leidig@gmail.com
 *
 * This file is part of Sample Search Provider
 *
 * Sample Search Provider is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Sample Search Provider is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gnome-shell-extension-openweather.
 * If not, see <http://www.gnu.org/licenses/>.
  */

const GLib = imports.gi.GLib;
const Extension = imports.misc.extensionUtils.getCurrentExtension();



class ConsoleSearchClient {
    constructor() {
        
    }


    /**
     * Query search results and return them through a callback.
     * @param searchterm {string} text entered by the user for searching
     * @param callback {function(error, results)} return results asyncronously by calling this callback,
     *                 error {string} error message or null if no error
     *                 results {object[]} array of result items each defining the following attributes:
     *                         id {string}
     *                         name {string}
     *                         description {string}
     *                         url
     */
    get(searchterm, callback) {
        let resultData = GLib.spawn_command_line_sync('echo "' + searchterm + '"')[1].toString();
	resultData = resultData.replace(/\n$/g, ''); // remove newlines at end of result
        let rawResultsArray = [resultData]; // creating an array of results for this sample
        const results = this._parseResults(rawResultsArray);
        callback(null, results);
    }

    _parseResults(rawResultsArray) {
        let parsedResults = [];

        rawResultsArray.forEach((item, index) => {
            const rName = item;
            const rDescr = 'description of ' + item;
            const rUrl = 'http://' + item;

            let resultObject = {
                id: 'recoll_'+index,
                name: rName,
                description: rDescr,
                url: rUrl
            };
            parsedResults.push(resultObject);
        });

        return parsedResults;
    }



    destroy() {
        
    }
}



/**
 * Factory function called by extension.js to get an instance of a SearchClient.
 * @returns {SearchClient} instance of a SearchClient implementation providing the following methods:
 *             get(searchterm, callback)
 *             destroy()
 */
function getSearchClient() {
    return new ConsoleSearchClient();
}
