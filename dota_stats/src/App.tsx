import { Fragment, useEffect, useState } from 'react'

//токен
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiNmRiYzMxMTQtMTVjOS00NDYyLTg3ZjMtZTc4YTYyMmM5MWNiIiwiU3RlYW1JZCI6IjIwNjA3NzM0NCIsIm5iZiI6MTcwMTI4NTkxMSwiZXhwIjoxNzMyODIxOTExLCJpYXQiOjE3MDEyODU5MTEsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.6x-O9YP655XBhN9xOL4CCQM7jwVLRVBlP6fuADmGy3k

// const myId64 = 76561198166343072
// const myId32 = (myId64>>32) (206077344)
import viteLogo from '/vite.svg'
import './App.css'
function LineRes(n: number): string {
  switch (n) {
    case 0:
      return "Че?"
    case 1:
      return "⬇️"
    case 3:
      return "⬆️"
    default:
      return "↗️"
  }
}
function roles(n: number): string {
  switch (n) {
    case 0:
      return "🏹"
    case 1:
      return "✨"
    case 2:
      return "♟️"
    case 3:
      return "🛡️"
    case 4:
      return "⚔️"
    default:
      return "-";
  }
}
function App() {

  const [id, setId] = useState<string>("206077344")

  async function getGamesById(id: string) {

    fetch(`https://docs.stratz.com/api/v1/Player/${id}/matches/?take=50`)
      .then(res => res.json())
      .then(res => { setResp(res); })
      .finally(() => { setCliked(!cliked) })

    fetch(`https://docs.stratz.com/api/v1/Player/${id}`)
      .then(res => res.json())
      .then(res => {
        setMatches(res.matchCount);
        setWr(res.winCount / res.matchCount);
        setAvatar(res.steamAccount.avatar)
        setName(res.steamAccount.name)
        console.log(res)
      })
      .finally(() => { })

  }

  interface Resp {
    id: number,
    players: {
      isVictory: boolean,
      imp: number,
      role: number,
      isRadiant: boolean,
      numKills: number,
      numAssists: number,
      numDeaths: number,
      lane: number
    }[]
    rank: number,

  }
  const [resp, setResp] = useState<Resp[]>([])
  const [cliked, setCliked] = useState(false)
  const [matches, setMatches] = useState(0)
  const [wr, setWr] = useState(0)
  const [avatar, setAvatar] = useState("")
  const [name, setName] = useState("")

  return (
    <main>
      <h3> Можно посмотреть статистику по прошлым играм </h3>

      <section id="id_input" className="container mx-auto bg-gray-800 m-8 rounded-xl border-neutral-500 border-2 ">
        <p className='p-3'>Введи steamID:</p>
        <input className='p-1 rounded-md bg-myBlack border-neutral-500 border-2 focus:border-myPurp focus:outline-none ' type="text" value={id} onChange={(e) => setId(e.target.value)} />
        <p className='p-3' >Введенный ID: {id} </p>

        <button className='m-2' onClick={() => getGamesById(id)}> {!resp ? "Че там по играм" : "Другой ID"} </button>
      </section>


      {resp.length>0 &&
        <section id="data" className='container'>

          <div className='flex justify-around mx-auto bg-gray-800 m-8 rounded-xl border-neutral-500 border-2'>

            <div className='m-4'>
              <img className="h-24 w-24" src={avatar} alt={name} />
              <p>{name}</p>
            </div>

            <div className='m-4 flex flex-col justify-center content-center'>
                  <p>Матчей: {matches}</p>
                <p>Винрейт: {(wr * 100).toFixed(2)}%</p>

            </div>

          </div>


          <table>
            <thead>
              <tr>
                <th>Вин?</th>
                <th>Роль</th>
                <th>IMP</th>

                <th> Линия </th>
                <th> Сторона </th>
                <th> У/С/П </th>
                <th> Ранг </th>

              </tr>
            </thead>
            <tbody>
              {
                resp.map((game) => {
                  return (
                    <Fragment key={game.id}>
                      <tr className='odd:bg-slate-600 even:bg-slate-700'>
                        <td> {game.players[0].isVictory ? "🟩" : "🟥"} </td>
                        <td> {roles(game.players[0].role)} </td>
                        <td> {game.players[0].imp} </td>

                        <td> {LineRes(game.players[0].lane)} </td>

                        <td> {game.players[0].isRadiant ? "🟩" : "🟥"} </td>
                        <td>
                          {game.players[0].numKills} / {game.players[0].numDeaths} / {game.players[0].numAssists}
                        </td>
                        <td> {game.rank} </td>

                      </tr>
                    </Fragment>
                  )
                })}
            </tbody>
          </table> </section>}
    </main>
  )
}

export default App
