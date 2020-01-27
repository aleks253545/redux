import './main.scss';
import {
    createStore
} from 'redux';
import * as $ from '../node_modules/jquery/src/jquery';
const START = 'START'
const DELETE_USER = 'DELETE_USER'
const REFRESH = 'REFRESH'
let initialState = [];

function renderUser(items) {
    $('.friends_main').empty();
    items.map((item, index) => {
        $('.friends_main')
            .append($('<div>').addClass('friend')
                .append($('<img>').attr('src', `${item.avatar_url}`).addClass('friend_ava'))
                .append($('<div>').addClass('friend_main')
                    .append($('<h3>').addClass('friend_main_name').text(item.name))
                    .append($('<span>').addClass('friend_main_geo').append($('<i>').addClass('fa fa-map-marker')).append(item.location))
                    .append($('<span>').addClass('friend_main_login').text(`@${item.login}`)))
                .append($('<div>').addClass('friend_delete')
                    .append($('<i>').addClass('fa fa-angle-right friend_delete_arrow'))
                    .append($('<div>').addClass('friend_delete_trash').append($('<i>').addClass('fa fa-trash').attr('del-index', index)))
                ));
    });
}

let store = createStore(pageReducer);

function Downoload() {
    let page = Math.floor(Math.random() * (100 - 1)) + 1;
    return fetch(`https://api.github.com/user/${page}`)
        .then(item => item.json()).then(data => {
            if (data.message == "Not Found") {
                return Downoload();
            } else {
                return data;
            }
        })

}

function pageReducer(state = initialState, action) {
    switch (action.type) {
        case DELETE_USER: {
            state.splice(action.index, 1, action.newUser);
            console.log(state);
            renderUser(state);
            return state
            break;
        }
        case 'START': {
            renderUser(action.state);
            return action.state
        }
        case "RERENDER": {
            return state;
        }
    }
}
window.onload = function () {
    Promise.all([Downoload(), Downoload(), Downoload()]).then(results => {
        store.dispatch({
            type: "START",
            state: results
        });
    })
}

$(document).ready(function () {
    $('.friends_main').on('click', '.fa-trash', (event) => {
        Downoload().then(item => store.dispatch({
            type: DELETE_USER,
            index: event.target.getAttribute('del-index'),
            newUser: item
        }));
    })
    $('.friends_footer').on('click', '', (event) => {
        console.log(2);
        Promise.all([Downoload(), Downoload(), Downoload()]).then(results => {
            store.dispatch({
                type: "START",
                state: results
            });
        })
    })
});