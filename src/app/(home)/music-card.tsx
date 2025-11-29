import Card from '@/components/card'
import { useCenterStore } from '@/hooks/use-center'
import { styles as hiCardStyles } from './hi-card'
import { CARD_SPACING } from '@/consts'
import { styles as clockCardStyles } from './clock-card'
import { styles as calendarCardStyles } from './calendar-card'
import MusicSVG from '@/svgs/music.svg'
import PlaySVG from '@/svgs/play.svg'
import PauseSVG from '@/svgs/pause.svg'
import NextSVG from '@/svgs/next.svg'
import { useRef, useState, useEffect } from 'react'

export const styles = {
	width: 293,
	height: 66,
	offset: 120,
	order: 6
}

const MUSIC_LIST = [
	{ name: 'Daniel Powter - Free Loop', url: '/music/Daniel Powter - Free Loop.mp3' },
	{ name: '上海彩虹室内合唱团 - 彩虹', url: '/music/上海彩虹室内合唱团 - 彩虹.mp3' },
	{ name: '五月天拥抱', url: '/music/五月天拥抱.mp3' },
	{ name: '以冬 - 我的一个道姑朋友', url: '/music/以冬 - 我的一个道姑朋友.mp3' },
	{ name: '六哲 _ 贺敬轩 - 让全世界知道我爱你', url: '/music/六哲 _ 贺敬轩 - 让全世界知道我爱你.mp3' },
	{ name: '双笙 (陈元汐) - 长安忆', url: '/music/双笙 (陈元汐) - 长安忆.mp3' },
	{ name: '周杰伦 - 最伟大的作品', url: '/music/周杰伦 - 最伟大的作品.mp3' },
	{ name: '周杰伦 - 粉色海洋', url: '/music/周杰伦 - 粉色海洋.mp3' },
	{ name: '周杰伦 _ 陈奕迅 - 明明就+淘汰 (Live)', url: '/music/周杰伦 _ 陈奕迅 - 明明就+淘汰 (Live).mp3' },
	{ name: '周深 - 风吹过的晨曦', url: '/music/周深 - 风吹过的晨曦.mp3' },
	{ name: '孙燕姿 - 我怀念的', url: '/music/孙燕姿 - 我怀念的.mp3' },
	{ name: '张泽熙 - 那个女孩', url: '/music/张泽熙 - 那个女孩.mp3' },
	{ name: '张紫豪 - 可不可以', url: '/music/张紫豪 - 可不可以.mp3' },
	{ name: '房东的猫 - 云烟成雨', url: '/music/房东的猫 - 云烟成雨.mp3' },
	{ name: '李宇春 - 1987我不知会遇见你', url: '/music/李宇春 - 1987我不知会遇见你.mp3' },
	{ name: '林俊杰 - Too Bad', url: '/music/林俊杰 - Too Bad.flac' },
	{ name: '林俊杰 - 弹唱', url: '/music/林俊杰 - 弹唱.flac' },
	{ name: '筷子兄弟 - 老男孩', url: '/music/筷子兄弟 - 老男孩.mp3' },
	{ name: '邱霖BigL - 我的歌声里 (remix：T_back)', url: '/music/邱霖BigL - 我的歌声里 (remix：T_back).mp3' }
]

export default function MusicCard() {
	const center = useCenterStore()
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentMusic, setCurrentMusic] = useState(MUSIC_LIST[0])
	const audioRef = useRef<HTMLAudioElement | null>(null)

	useEffect(() => {
		audioRef.current = new Audio(currentMusic.url)
		audioRef.current.addEventListener('ended', handleNext)
		return () => {
			audioRef.current?.pause()
			audioRef.current?.removeEventListener('ended', handleNext)
		}
	}, [])

	const handleNext = () => {
		// Since we only have one song for now, just replay it or pick from list if more added
		let nextIndex = Math.floor(Math.random() * MUSIC_LIST.length)
		if (MUSIC_LIST.length > 1) {
			while (MUSIC_LIST[nextIndex].url === currentMusic.url) {
				nextIndex = Math.floor(Math.random() * MUSIC_LIST.length)
			}
		}
		const nextMusic = MUSIC_LIST[nextIndex]

		if (audioRef.current) {
			audioRef.current.src = nextMusic.url
			setCurrentMusic(nextMusic)
			if (isPlaying) audioRef.current.play()
		}
	}

	const togglePlay = () => {
		if (!audioRef.current) return

		if (isPlaying) {
			audioRef.current.pause()
		} else {
			audioRef.current.play()
		}
		setIsPlaying(!isPlaying)
	}

	return (
		<Card
			order={styles.order}
			width={styles.width}
			height={styles.height}
			x={center.x + CARD_SPACING + hiCardStyles.width / 2 - styles.offset}
			y={center.y - clockCardStyles.offset + CARD_SPACING + calendarCardStyles.height + CARD_SPACING}
			className='flex items-center gap-3'>
			<MusicSVG className='h-8 w-8' />

			<div className='flex-1 overflow-hidden'>
				<div className='text-secondary text-sm truncate'>{currentMusic.name}</div>

				<div className='mt-1 h-2 rounded-full bg-white/60 overflow-hidden'>
					<div className={`bg-linear h-full rounded-full ${isPlaying ? 'w-full animate-pulse' : 'w-1/2'}`} />
				</div>
			</div>

			<div className='flex items-center gap-2'>
				<button
					onClick={togglePlay}
					className='flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white hover:scale-105 transition-transform active:scale-95'>
					{isPlaying ? <PauseSVG className='text-brand ml-0.5 h-4 w-4' /> : <PlaySVG className='text-brand ml-1 h-4 w-4' />}
				</button>
				<button
					onClick={handleNext}
					className='flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/80 hover:scale-105 transition-transform active:scale-95'>
					<NextSVG className='text-brand h-4 w-4' />
				</button>
			</div>
		</Card>
	)
}
