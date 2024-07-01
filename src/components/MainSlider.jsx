import React from 'react'
import useIsMobile from '../hooks/isMobile'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/free-mode'
import MainSlide from './MainSlide'

const MainSlider = () => {
  const isMobile = useIsMobile('991px')
  const icons = [
    '/imgs/icons/afk-arena.png',
    '/imgs/icons/arche-age.jpg',
    '/imgs/icons/cs.png',
    '/imgs/icons/world-warcraft.png',
    '/imgs/icons/diablo.png',
    '/imgs/icons/genshin.png',
    '/imgs/icons/gta.png',
    '/imgs/icons/hogwarts.png',
    '/imgs/icons/image-36.png',
    '/imgs/icons/league-of-legends.png',
    '/imgs/icons/lineage.png',
    '/imgs/icons/minecraft.png',
    '/imgs/icons/mortal-combat.png',
    '/imgs/icons/need-for-speed.png',
    '/imgs/icons/sims.png',
    '/imgs/icons/stalker-2.png',
    '/imgs/icons/star-wars.png',
    '/imgs/icons/the-last-of-us.png',
    '/imgs/icons/war-thunder.png',
    '/imgs/icons/warface.png',
    '/imgs/icons/Warframe.png',
    '/imgs/icons/witcher.png',
    '/imgs/icons/World-of-Tanks.png',
    '/imgs/icons/world-warcraft.png',
  ];
  const shuffledIcons1 = [
    '/imgs/icons/gta.png',
    '/imgs/icons/Warframe.png',
    '/imgs/icons/league-of-legends.png',
    '/imgs/icons/witcher.png',
    '/imgs/icons/sims.png',
    '/imgs/icons/world-warcraft.png',
    '/imgs/icons/need-for-speed.png',
    '/imgs/icons/diablo.png',
    '/imgs/icons/stalker-2.png',
    '/imgs/icons/image-36.png',
    '/imgs/icons/minecraft.png',
    '/imgs/icons/star-wars.png',
    '/imgs/icons/afk-arena.png',
    '/imgs/icons/the-last-of-us.png',
    '/imgs/icons/warface.png',
    '/imgs/icons/hogwarts.png',
    '/imgs/icons/arche-age.jpg',
    '/imgs/icons/World-of-Tanks.png',
    '/imgs/icons/lineage.png',
    '/imgs/icons/mortal-combat.png',
    '/imgs/icons/cs.png',
    '/imgs/icons/genshin.png',
    '/imgs/icons/war-thunder.png',
  ];

  const shuffledIcons2 = [
    '/imgs/icons/lineage.png',
    '/imgs/icons/world-warcraft.png',
    '/imgs/icons/the-last-of-us.png',
    '/imgs/icons/Warframe.png',
    '/imgs/icons/sims.png',
    '/imgs/icons/warface.png',
    '/imgs/icons/cs.png',
    '/imgs/icons/mortal-combat.png',
    '/imgs/icons/hogwarts.png',
    '/imgs/icons/need-for-speed.png',
    '/imgs/icons/gta.png',
    '/imgs/icons/genshin.png',
    '/imgs/icons/image-36.png',
    '/imgs/icons/minecraft.png',
    '/imgs/icons/witcher.png',
    '/imgs/icons/diablo.png',
    '/imgs/icons/world-warcraft.png',
    '/imgs/icons/afk-arena.png',
    '/imgs/icons/stalker-2.png',
    '/imgs/icons/league-of-legends.png',
    '/imgs/icons/arche-age.jpg',
    '/imgs/icons/star-wars.png',
    '/imgs/icons/war-thunder.png',
    '/imgs/icons/World-of-Tanks.png',
  ];

  const shuffledIcons3 = [
    '/imgs/icons/World-of-Tanks.png',
    '/imgs/icons/witcher.png',
    '/imgs/icons/image-36.png',
    '/imgs/icons/cs.png',
    '/imgs/icons/minecraft.png',
    '/imgs/icons/the-last-of-us.png',
    '/imgs/icons/gta.png',
    '/imgs/icons/warface.png',
    '/imgs/icons/war-thunder.png',
    '/imgs/icons/league-of-legends.png',
    '/imgs/icons/world-warcraft.png',
    '/imgs/icons/mortal-combat.png',
    '/imgs/icons/star-wars.png',
    '/imgs/icons/genshin.png',
    '/imgs/icons/Warframe.png',
    '/imgs/icons/stalker-2.png',
    '/imgs/icons/hogwarts.png',
    '/imgs/icons/afk-arena.png',
    '/imgs/icons/arche-age.jpg',
    '/imgs/icons/diablo.png',
    '/imgs/icons/lineage.png',
    '/imgs/icons/need-for-speed.png',
    '/imgs/icons/sims.png',
  ];


  if (isMobile) {
    return (
      <MainSlide content={icons} speed={4000} direction={"horizontal"} />
    )
  } else return (
    <div className='item'>
      <MainSlide content={shuffledIcons1} speed={2000} direction={"vertical"} />
      <MainSlide content={shuffledIcons3} speed={2500} direction={"vertical"} />
      <MainSlide content={shuffledIcons2} speed={3000} direction={"vertical"} />
      <MainSlide content={icons} speed={3500} direction={"vertical"} />
    </div>
  )
}

export default MainSlider