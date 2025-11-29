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
	{ name: '拥抱 - 五月天', url: '/music/五月天拥抱.mp3' }
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
