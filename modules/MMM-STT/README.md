# MMM-STT
Speech-To-Text Module for MagicMirror<sup>2</sup>

## Dependencies
  * An installation of [MagicMirror<sup>2</sup>](https://github.com/MichMich/MagicMirror)
  * npm
  * Watson developer cloud

## Installation
 1. Clone this repo into `~/MagicMirror/modules` directory.
 2. Configure your `~/MagicMirror/config/config.js`:

    ```
    {
        module: 'MMM-STT',
        position: 'top_right',
        config: {
            ...
        }
    }
    ```
 3. Run command `npm install` in `~/MagicMirror/modules/MMM-STT` directory.
 4. Run command `sudo apt-get install watson-developer-cloud`.

## Config Options
| **Option** | **Default** | **Description** |
| --- | --- | --- |
| `debug` | `false` | Display speech to text. |
| `text` | `'MMM-SST'` | Text to display in debug mode, while there's no speech to text |

## For Developers
The idea is to call the corresponding module when a key word is spotted from  MMM-STT module.
