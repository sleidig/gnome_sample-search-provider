*Evernote Search Provider* is a GNOME Shell Extension that allows you to search your Evernote notes from within the GNOME Shell (i.e. the default overlay in GNOME based linux systems).

## HowTO: Develop your own search provider
This code can also be used to built your own search provider extension for other services:

1. edit "metadata.json": change the relevant information. Note that your folder name must be the same as the `uuid` in your metadata.json


### Change settings schema
1. Update the settings schema in xml format in the subfolder "schemas"
2. run `glib-compile-schemas ./schemas` to compile a binary version of your settings

