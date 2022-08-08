import './App.css'

import { HiHeart, HiOutlineHeart } from 'react-icons/hi'
import { useEffect, useRef, useState } from 'react'

import { BsFileEarmarkMusicFill } from 'react-icons/bs'
import Player from './Player/Player'
import { songsdata } from './Player/audios'

const App = () => {
  const [songs, setSongs] = useState(songsdata)
  const [isplaying, setisplaying] = useState(false)
  const [currentSong, setCurrentSong] = useState(songsdata[0])

  const audioElem = useRef()

  useEffect(() => {
    if (isplaying) {
      audioElem.current.play()
    } else {
      audioElem.current.pause()
    }
  }, [isplaying])

  const onPlaying = () => {
    const duration = audioElem.current.duration
    const ct = audioElem.current.currentTime

    setCurrentSong({
      ...currentSong,
      progress: (ct / duration) * 100,
      length: duration,
    })
  }
  const [fav, setFav] = useState(false)
  const chooseSong = (e) => {
    console.log(e)
    const index = songs.findIndex((x) => x.title === e)
    console.log(index)
    setCurrentSong(songs[index])
    audioElem.current.currentTime = 0
  }

  return (
    <div className='audio-container'>
      <div className='header-title'>
        <span>ADELE 21 - ALBUM</span>
        <span onClick={() => setFav(!fav)}>
          {!fav ? <HiOutlineHeart size={19} /> : <HiHeart size={19} />}
        </span>
      </div>
      <div className='image-container'>
        <img src='/cover.png' alt='cover' />
      </div>
      <div className='song-list'>
        <ul>
          {songsdata.map((song) => {
            return (
              <li key={song.id} onClick={() => chooseSong(song.title)}>
                <div className='song-container'>
                  <div className='info-container'>
                    <div className='logo-container'>
                      <BsFileEarmarkMusicFill size={30} />
                    </div>
                    <div>
                      <p>{song.title}</p>
                      <p style={{ fontSize: '13px' }}>{song.artist}</p>
                    </div>
                  </div>
                  <div></div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
      <div className='audio-section'>
        <audio
          src={currentSong.url}
          ref={audioElem}
          onTimeUpdate={onPlaying}
          type='mp3'
        />
        <Player
          songs={songs}
          setSongs={setSongs}
          isplaying={isplaying}
          setisplaying={setisplaying}
          audioElem={audioElem}
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
        />
      </div>
    </div>
  )
}

export default App
