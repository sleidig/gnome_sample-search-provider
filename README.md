*Evernote Search Provider* is a GNOME Shell Extension that allows you to search your Evernote notes from within the GNOME Shell (i.e. the default overlay in GNOME based linux systems).

## HowTO: Develop your own search provider
This code can also be used to built your own search provider extension for other services:

1. edit "metadata.json": change the relevant information. Note that your folder name must be the same as the `uuid` in your metadata.json
2. edit "extension.js": change the constants under `/** APP CONFIG **/` as needed:
- `APP_NAME`: name that is displayed for your app in the GNOME Shell
- `ICON_NAME`: filename (without filetype extension) of the icon in the "icons" subfolder of your extension
- `SEARCH_TERMS_FILTER`: [`(searchTerms: string[]) => boolean`] function to return true whenever your extension should provide search results based on the search terms entered. (Example: `SEARCH_TERMS_FILTER = (terms => { return (terms[0].substring(0, 2) === 'd:'`)
- `SEARCH_CLIENT`: Import of a script that provides a search api. Must implement a factory method `getSearchClient()`.

### Change settings schema
1. Update the settings schema in xml format in the subfolder "schemas"
2. run `glib-compile-schemas ./schemas` to compile a binary version of your settings

