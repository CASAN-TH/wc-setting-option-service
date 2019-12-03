'use strict';
// use model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SettingoptionSchema = new Schema({
    label: {
        type: String
    },
    description: {
        type: String
    },
    value: {
        type: String
    },
    default: {
        type: String,
        default: 'all'
    },
    tip: {
        type: String
    },
    placeholder: {
        type: String
    },
    type: {
        type: String,
        enum: ['text', 'email', 'number', 'color', 'password', 'textarea', 'select', 'multiselect', 'radio', 'image_width', 'checkbox']
    },
    options: {
        type: {
            all: {
                type: String
            },
            all_except: {
                type: String
            },
            specific: {
                type: String
            }
        }
    },
    group_id: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    },
    createby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    },
    updateby: {
        _id: {
            type: String
        },
        username: {
            type: String
        },
        displayname: {
            type: String
        }
    }
});

mongoose.model("Settingoption", SettingoptionSchema);