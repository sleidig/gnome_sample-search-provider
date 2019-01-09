/*
 * Evernote Search Provider
 * Search your Evernote notes with GNOME Shell
 *
 * Copyright (C) 2019
 *     Sebastian Leidig <sebastian.leidig@gmail.com
 *
 * based on WordReference Search Provider by
 *     Lorenzo Carbonell <lorenzo.carbonell.cerezo@gmail.com>, https://www.atareao.es
 *
 * This file is part of Evernote Search Provider
 *
 * Evernote Search Provider is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * Evernote Search Provider is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with gnome-shell-extension-openweather.
 * If not, see <http://www.gnu.org/licenses/>.
  */

const Soup = imports.gi.Soup;
const Extension = imports.misc.extensionUtils.getCurrentExtension();
const Convenience = Extension.imports.convenience;



const PROTOCOL = 'https';
const BASE_URL = 'www.wordreference.com';
const USER_AGENT = 'GNOME Shell - WordReferenceSearchProvider - extension';
const HTTP_TIMEOUT = 10;



class SampleSearchClient {
    constructor() {
        this.protocol = PROTOCOL;
        this.base_url = BASE_URL;
        this._settings = Convenience.getSettings();
        this._settings.connect("changed", () => { /* update config for new settings if necessary */ });
    }

    get protocol() {
        return this._protocol;
    }

    set protocol(protocol) {
        this._protocol = protocol;
    }

    get base_url() {
        return this._base_url;
    }

    set base_url(url) {
        this._base_url = url;
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
        let query_url = this._buildQueryUrl(searchterm);
        let request = Soup.Message.new('GET', query_url);
        _get_soup_session().queue_message(request, (http_session, message) => {
            if(message.status_code !== Soup.KnownStatusCode.OK) {
                let error_message =
                    "SampleSearchClient:get(): Error code: %s".format(
                        message.status_code
                    );
                callback(error_message, null);
            } else {
                const results = this._parseResults(message.response_body.data);

                if(results.length > 0){
                    callback(null, results);
                    return;
                } else {
                    let error = "Nothing found";
                    callback(error, null);
                }
            }
        });
    }

    _buildQueryUrl(searchterm) {
        let dictionary = "definition";
        let word = searchterm.substring(2).trim();
        let url = '%s://%s/%s/%s'.format(
            this.protocol,
            this.base_url,
            dictionary,
            encodeURIComponent(word)
        );
        return url;
    }

    _parseResults(data) {
        let parsedResults = [];

        let sampleItem1 = {
            id: 'index_'+1,
            label: 'Sample 1',
            name: 'Sample 1',
            url: 'http://www.google.com',
            description: 'these details are just examples'
        };
        parsedResults.push(sampleItem1);

        let sampleItem2 = {
            id: 'index_'+2,
            label: 'Another One',
            name: 'Another One',
            url: 'http://www.google.com',
            description: 'who knows ...'
        };
        parsedResults.push(sampleItem2)


        return parsedResults;
    }



    destroy() {
        _get_soup_session().run_dispose();
        _SESSION = null;
    }
}

//TODO: should/could _SESSION be inside the SearchClient class?
let _SESSION = null;

function _get_soup_session() {
    if(_SESSION === null) {
        _SESSION = new Soup.SessionAsync();
        Soup.Session.prototype.add_feature.call(
            _SESSION,
            new Soup.ProxyResolverDefault()
        );
        _SESSION.user_agent = USER_AGENT;
        _SESSION.timeout = HTTP_TIMEOUT;
    }

    return _SESSION;
}



function getSearchClient() {
    return new SampleSearchClient();
}