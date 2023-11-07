import React from 'react';
import { Link } from 'react-router-dom';
import ServerSwitcher from './utils/ServerSwitcher';



const GameCard = ({ prop }) => {
  const gameItems =
    [
      {
        "title": "lineage 2",
        "desc": "Описание",
        "params": [
          { "id": 1, "title": "Предмет" },
          { "id": 2, "title": "Аккаунты" },
          { "id": 3, "title": "Голда" }
        ],
        "user": {
          "id": 1,
          "mickname": "test",
          "avatar": "avatar.webp"
        },
        "server": [
          {
            "id": 1,
            "title": "RU/EU"
          },
          {
            "id": 2,
            "title": "FREE"
          }
        ]
      },
      {
        "title": "afk",
        "desc": "Описание",
        "params": [
          { "id": 1, "title": "Предмет" },
          { "id": 2, "title": "Аккаунты" },
          { "id": 3, "title": "Голда" }
        ],
        "user": {
          "id": 1,
          "mickname": "test",
          "avatar": "avatar.webp"
        },
        "server": [
          {
            "id": 1,
            "title": "RU/EU"
          },
          {
            "id": 2,
            "title": "FREE"
          }
        ]
      },
      {
        "title": "barrage",
        "desc": "Описание",
        "params": [
          { "id": 1, "title": "Скины" },
          { "id": 2, "title": "Аккаунты" },
          { "id": 3, "title": "Голда" }
        ],
        "user": {
          "id": 1,
          "mickname": "test",
          "avatar": "avatar.webp"
        },
        "server": [
          {
            "id": 1,
            "title": "RU/EU"
          },
          {
            "id": 2,
            "title": "FREE"
          }
        ]
      },
      {
        "title": "lineage 2",
        "desc": "Описание",
        "params": [
          { "id": 1, "title": "Предмет" },
          { "id": 2, "title": "Аккаунты" },
          { "id": 3, "title": "Голда" }
        ],
        "user": {
          "id": 1,
          "mickname": "test",
          "avatar": "avatar.webp"
        },
        "server": [
          {
            "id": 1,
            "title": "RU/EU"
          },
          {
            "id": 2,
            "title": "FREE"
          }
        ]
      },
      {
        "title": "afk",
        "desc": "Описание",
        "params": [
          { "id": 1, "title": "Предмет" },
          { "id": 2, "title": "Аккаунты" },
          { "id": 3, "title": "Голда" }
        ],
        "user": {
          "id": 1,
          "mickname": "test",
          "avatar": "avatar.webp"
        },
        "server": [
          {
            "id": 1,
            "title": "RU/EU"
          },
          {
            "id": 2,
            "title": "FREE"
          }
        ]
      },
      {
        "title": "barrage",
        "desc": "Описание",
        "params": [
          { "id": 1, "title": "Скины" },
          { "id": 2, "title": "Аккаунты" },
          { "id": 3, "title": "Голда" }
        ],
        "user": {
          "id": 1,
          "mickname": "test",
          "avatar": "avatar.webp"
        },
        "server": [
          {
            "id": 1,
            "title": "RU/EU"
          },
          {
            "id": 2,
            "title": "FREE"
          }
        ]
      },
      {
        "title": "clineage 2",
        "desc": "Описание",
        "params": [
          { "id": 1, "title": "Предмет" },
          { "id": 2, "title": "Аккаунты" },
          { "id": 3, "title": "Голда" }
        ],
        "user": {
          "id": 1,
          "mickname": "test",
          "avatar": "avatar.webp"
        },
        "server": [
          {
            "id": 1,
            "title": "RU/EU"
          },
          {
            "id": 2,
            "title": "FREE"
          }
        ]
      },
      {
        "title": "afk",
        "desc": "Описание",
        "params": [
          { "id": 1, "title": "Предмет" },
          { "id": 2, "title": "Аккаунты" },
          { "id": 3, "title": "Голда" }
        ],
        "user": {
          "id": 1,
          "mickname": "test",
          "avatar": "avatar.webp"
        },
        "server": [
          {
            "id": 1,
            "title": "RU/EU"
          },
          {
            "id": 2,
            "title": "FREE"
          }
        ]
      },
      {
        "title": "barrage",
        "desc": "Описание",
        "params": [
          { "id": 1, "title": "Скины" },
          { "id": 2, "title": "Аккаунты" },
          { "id": 3, "title": "Голда" }
        ],
        "user": {
          "id": 1,
          "mickname": "test",
          "avatar": "avatar.webp"
        },
        "server": [
          {
            "id": 1,
            "title": "RU/EU"
          },
          {
            "id": 2,
            "title": "FREE"
          }
        ]
      }
    ]
  const filteredGames = gameItems.filter(game => game.title.toUpperCase().startsWith(prop));
  return filteredGames.map(el => (
    <div className="game-card">
      <Link to='/game'><img src="/imgs/archeage.jpg" alt="ArcheAge" className='img' /></Link>
      <div>
        <h4><Link to='/game'>{el.title}</Link></h4>
        <ServerSwitcher serversArr={el.server}
        />
        <ul className='categories'>
          {el.params.map((param) => (
            <li key={param.id}>{param.title}</li>
          ))}
        </ul>
      </div>
    </div>
  ));
};

export default GameCard;